import Link from "next/link";

// Core
import { FORGOTPASSWORD, LOGIN, REGISTER } from "@/core/routeConstants";
import { AuthPath } from "@/core/routeConstants/types";

const routingMap: Record<AuthPath, { text: string; linkText: string; href: string }> = {
    [LOGIN]: {
        text: "Not a member?",
        linkText: "Register Now",
        href: REGISTER,
    },
    [REGISTER]: {
        text: "Already a member?",
        linkText: "Go To Login",
        href: LOGIN,
    },
    [FORGOTPASSWORD]: {
        text: "Remember your password?",
        linkText: "Go To Login",
        href: LOGIN,
    },
};

const FooterRouting = ({ pathname }: { pathname: string }) => {
    const route = routingMap[pathname as AuthPath];

    if (!route) return null;
    return (
        <div className="mt-7 text-center text-sm/6 text-gray-500">
            {route.text}{" "}
            <Link
                href={route.href}
                className="font-semibold text-indigo-600 hover:text-indigo-500 underline-offset-4 hover:underline"
            >
                {route.linkText}
            </Link>
        </div>
    );
};

export default FooterRouting;
