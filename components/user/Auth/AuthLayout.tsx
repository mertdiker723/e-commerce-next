import Image from "next/image";

// Components
import FooterRouting from "./FooterRouting";

// Core
import { LOGIN, FORGOTPASSWORD, REGISTER } from "@/core/routeConstants";
import { AuthPath } from "@/core/routeConstants/types";

// Styles || Assets
import logo from "@/public/logo/logo.svg";

const authRouteMessages: Record<AuthPath, string> = {
    [LOGIN]: "Sign in to your account",
    [REGISTER]: "Create an account",
    [FORGOTPASSWORD]: "Reset your password",
};

const AuthLayout = ({ children, pathname }: { children: React.ReactNode; pathname: string }) => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Image
                    className="mx-auto h-10 w-auto"
                    src={logo}
                    alt="e-commerce logo"
                    width={40}
                    height={40}
                    priority
                />
                <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                    {authRouteMessages[pathname as AuthPath] || "Welcome!"}
                </h2>
            </div>
            <div className="w-full px-10 mt-3 sm:mx-auto sm:max-w-sm">{children}</div>
            <FooterRouting pathname={pathname} />
        </div>
    );
};

export default AuthLayout;
