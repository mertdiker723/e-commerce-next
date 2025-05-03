import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Models
import User from "@/models/api/user";

// Connection
import dbConnection from "@/lib/mongodb";
import { decrypt, encrypt, setCookie } from "@/lib/token";

export const GET = async (req: NextRequest) => {
    await dbConnection();

    try {
        const token = req.cookies.get("token")?.value;
        if (!token) {
            return NextResponse.json(
                { message: "Token not found" },
                { status: 401 }
            );
        }
        const payload = await decrypt(token);
        
        if (!payload) {
            return NextResponse.json(
                { message: "Invalid token" },
                { status: 401 }
            );
        }

        const user = await User.findById(payload.id).select("-password");

        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    await dbConnection();
    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json(
            { message: "Please fill in all fields" },
            { status: 400 }
        );
    }

    try {
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Password comparison
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return NextResponse.json(
                { message: "Invalid password" },
                { status: 401 }
            );
        }

        // Token Creation
        const token = await encrypt({
            id: user._id.toString(),
            email: user.email,
            type: user.type,
        });

        const response = NextResponse.json(
            {
                message: "Login successful",
                user: { email: user.email, id: user._id, type: user.type },
            },
            { status: 200 }
        );

        setCookie(response, "token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 2, // 2 saat
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
};
