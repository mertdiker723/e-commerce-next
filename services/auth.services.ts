"use server";

import { cookies } from "next/headers";
import { setCookiesFromResponse, type LoginState } from "@/utils/tokenUtils";

export const getUser = async (): Promise<LoginState> => {
    try {
        const baseUrl = process.env.BACKEND_URL;
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();

        const res = await fetch(`${baseUrl}/user/getUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                ...(allCookies && { Cookie: allCookies }),
            },
        });

        const data = await res.json();

        if (res.ok) {
            return {
                error: "",
                success: true,
                user: data?.user,
            };
        }

        if (res.status === 401 || res.status === 403) {
            await logoutUser();
            return {
                error: data.message || "Authentication failed",
                success: false,
                user: null,
            };
        }

        return {
            error: data.message || "Failed to get user",
            success: false,
            user: null,
        };
    } catch (error) {
        return {
            error: error instanceof Error ? error.message : "Network error occurred",
            success: false,
            user: null,
        };
    }
};

export const loginUser = async (
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return {
            error: "All fields required!",
            success: false,
            user: null,
        };
    }

    try {
        const baseUrl = process.env.BACKEND_URL;
        const response = await fetch(`${baseUrl}/user/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                error: data.message || "Login failed!",
                success: false,
                user: null,
            };
        }

        await setCookiesFromResponse(response);

        return {
            error: "",
            success: true,
            user: data?.user,
        };
    } catch (err) {
        return {
            error: err instanceof Error ? err.message : "Network error occurred",
            success: false,
            user: null,
        };
    }
};

export const registerUser = async (
    _prevState: LoginState,
    formData: FormData
): Promise<LoginState> => {
    try {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const repassword = formData.get("repassword") as string;

        if (!email || !password || !repassword) {
            return {
                error: "All fields required!",
                success: false,
                user: null,
            };
        }

        if (password !== repassword) {
            return {
                error: "Passwords do not match!",
                success: false,
                user: null,
            };
        }

        const baseUrl = process.env.BACKEND_URL;
        const response = await fetch(`${baseUrl}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            return {
                error: data.message || "Registration failed!",
                success: false,
                user: null,
            };
        }

        await setCookiesFromResponse(response);

        return {
            success: true,
            error: "",
            user: data?.user,
        };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : "Registration failed!",
            user: null,
        };
    }
};

export const logoutUser = async (): Promise<{ success: boolean; error: string }> => {
    try {
        const baseUrl = process.env.BACKEND_URL;
        const cookieStore = await cookies();
        const allCookies = cookieStore.toString();


        const res = await fetch(`${baseUrl}/user/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...(allCookies && { Cookie: allCookies }),
            },
        });



        if (!res.ok) {
            const data = await res.json();
            const message = String(data?.message || "Logout failed!");
            return {
                error: message,
                success: false,
            };
        }

        await setCookiesFromResponse(res);

        return {
            success: true,
            error: "",
        };
    } catch (err) {
        console.log("err", err);   
        return {
            success: false,
            error: err instanceof Error ? err.message : "Logout failed!",
        };
    }
};
