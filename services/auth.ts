export const loginUser = async (
    _prevState: { error: string; success: boolean; user?: unknown },
    formData: FormData
) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "All fields required!", success: false, user: null };
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
        return {
            error: data.message || "Login failed!",
            success: false,
            user: null,
        };
    }

    return {
        error: "",
        success: true,
        user: data?.user,
    };
};

export const registerUser = async (userData: { email: string; password: string; name: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || "Registration failed!");
    }

    return data;
};

export const logoutUser = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Logout failed!");
    }

    return true;
};
