"use server";

import { cookies } from "next/headers";

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
    const setCookieHeader = response.headers.get("set-cookie");
    if (!setCookieHeader) return;

    const cookieStore = await cookies();

    setCookieHeader.split(",").forEach((cookie) => {
        const parts = cookie.trim().split(";");
        const [nameValue] = parts;
        const [name, value] = nameValue.split("=");

        if (name === "token" && value === "") {
            cookieStore.delete("token");
            return;
        }

        if (!name || !value) return;

        const options: {
            httpOnly: boolean;
            secure: boolean;
            sameSite: "strict" | "lax" | "none";
            path: string;
            maxAge: number;
        } = {
            httpOnly: true, // default values
            secure: process.env.NODE_ENV === "production", // default values
            sameSite: "lax", // default values
            path: "/", // default values
            maxAge: 60 * 60 * 2, // default values
        };

        parts.slice(1).forEach((part) => {
            const [key, val] = part.trim().split("=");

            const lowerKey = key.toLowerCase();

            switch (lowerKey) {
                case "httponly":
                    options.httpOnly = val ? val.toLowerCase() === "true" : true;
                    break;

                case "secure":
                    options.secure = val ? val.toLowerCase() === "true" : true;
                    break;

                case "samesite":
                    if (val) {
                        const sameSiteValue = val.toLowerCase();
                        if (
                            sameSiteValue === "strict" ||
                            sameSiteValue === "lax" ||
                            sameSiteValue === "none"
                        ) {
                            options.sameSite = sameSiteValue;
                        }
                    }
                    break;

                case "path":
                    if (val) {
                        options.path = val;
                    }
                    break;

                case "max-age":
                    if (val) {
                        const parsedMaxAge = parseInt(val);
                        if (!isNaN(parsedMaxAge)) {
                            options.maxAge = parsedMaxAge;
                        }
                    }
                    break;

                default:
                    break;
            }
        });

        cookieStore.set(name.trim(), value.trim(), options);
    });
};
