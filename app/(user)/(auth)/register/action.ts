export const submitRegister = async (
    _prevState: { error: string; success: boolean; user?: unknown },
    formData: FormData
) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const repassword = formData.get("repassword") as string;

    if (!email || !password || !repassword) {
        return { error: "All fields required!", success: false };
    }

    if (repassword !== password) {
        return { error: "Password doesn't match!", success: false };
    }

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/user/register`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    );
    const data = await res.json();

    if (!res.ok) {
        const data = await res.json();
        const message = String(data?.message || "Login failed!");
        return {
            error: message,
            success: false,
            user: null,
        };
    }
  
    return { error: "", success: true, user: data?.data };
};
