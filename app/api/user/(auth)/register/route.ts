import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Models
import User from "@/models/api/user";

// Db connection
import dbConnection from "@/lib/mongodb";
import { encrypt, setCookie } from "@/lib/token";

export const POST = async (req: NextRequest) => {
    await dbConnection();

    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json(
                { message: "Please fill in all fields" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await User.create({
            email,
            password: hashedPassword,
        });
        
        // Token Creation
        const token = await encrypt({
            id: data?._id.toString(),
            email: data?.email,
        });

        const response = NextResponse.json(
            { message: "The user created successfully.", data },
            { status: 201 }
        );

        setCookie(response, "token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 2,
        });

        return response;
    } catch (error) {
        if ((error as { code?: number }).code === 11000) {
            return NextResponse.json(
                {
                    message: "This email is already registered.",
                },
                { status: 409 }
            );
        }
        return NextResponse.json({ message: error }, { status: 500 });
    }
};
