import "server-only";

import { NextResponse } from "next/server";
import { jwtVerify, SignJWT } from "jose";

const secretKey = process.env.SESSION_SECRET as string;
const encodedKey = new TextEncoder().encode(secretKey);

type EncryptPayloadType = {
    id: string;
    email: string;
};

export const encrypt = async (payload: EncryptPayloadType) => {
    const jwt = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("2h")
        .sign(encodedKey);

    return jwt;
};

export const decrypt = async (session: string | undefined = "") => {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.log(error);
    }
};

export const setCookie = (
    response: NextResponse,
    name: string,
    value: string,
    options: {
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "strict" | "lax" | "none";
        path?: string;
        maxAge?: number;
    } = {}
) => {
    response.cookies.set(name, value, {
        httpOnly: options.httpOnly ?? true,
        secure: options.secure ?? process.env.NODE_ENV === "production",
        sameSite: options.sameSite ?? "lax",
        path: options.path ?? "/",
        maxAge: options.maxAge ?? 60 * 60 * 2,
    });
};
