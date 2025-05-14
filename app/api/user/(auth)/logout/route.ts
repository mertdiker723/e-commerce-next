import { setCookie } from "@/lib/token";
import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        const response = NextResponse.json({ message: "Logout successful" }, { status: 200 });

        setCookie(response, "token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0,
        });
        return response;
    } catch (error) {
        return NextResponse.json({ message: error }, { status: 500 });
    }
};
