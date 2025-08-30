"use server";

import { cookies } from "next/headers";
import { parse } from "cookie";

// Types
export interface User {
    id: string;
    email: string;
    type: string;
    name?: string;
}

export interface LoginState {
    error: string;
    success: boolean;
    user?: User | null;
}

export const setCookiesFromResponse = async (response: Response): Promise<void> => {
    const cookieStore = await cookies();

    const setCookieHeaders = response.headers.getSetCookie?.() || [
        response.headers.get("set-cookie"),
    ];

    if (setCookieHeaders.length === 0) return;

    setCookieHeaders.forEach((cookieHeader) => {
        if (!cookieHeader) return;

        const { name, value, options } = parseSetCookie(cookieHeader);

        if (!name) return;

        if (name === "token" && value === "") {
            cookieStore.delete("token");
            return;
        }

        cookieStore.set(name, value, options);
    });
};

const parseSetCookie = (setCookieString: string) => {
    const parts = setCookieString.split(";");
    const [nameValue, ...attributeParts] = parts;

    const parsed = parse(nameValue.trim());

    const [name, value] = Object.entries(parsed)[0] || [undefined, undefined];

    const options: {
        httpOnly?: boolean;
        secure?: boolean;
        sameSite?: "strict" | "lax" | "none";
        path?: string;
        maxAge?: number;
        expires?: Date;
    } = {};

    attributeParts.forEach((attribute) => {
        const trimmed = attribute.trim();
        const lowerCase = trimmed.toLowerCase();

        if (lowerCase === "httponly") {
            options.httpOnly = true;
        } else if (lowerCase === "secure") {
            options.secure = true;
        } else if (trimmed.includes("=")) {
            const [key, ...valueParts] = trimmed.split("=");
            const val = valueParts.join("=");
            const lowerKey = key.toLowerCase();

            switch (lowerKey) {
                case "samesite":
                    const sameSite = val.toLowerCase();
                    if (["strict", "lax", "none"].includes(sameSite)) {
                        options.sameSite = sameSite as "strict" | "lax" | "none";
                    }
                    break;
                case "path":
                    options.path = val;
                    break;
                case "max-age":
                    const maxAge = parseInt(val, 10);
                    if (!isNaN(maxAge)) options.maxAge = maxAge;
                    break;
                case "expires":
                    const expires = new Date(val);
                    if (!isNaN(expires.getTime())) options.expires = expires;
                    break;
            }
        }
    });

    return { name, value: value || "", options };
};
