export const submitLogout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
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

    return { error: "", success: true };
};
