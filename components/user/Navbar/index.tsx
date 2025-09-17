"use client";

import { useActionState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Actions

import Button from "@/common/Button";

// Lib
import { logout } from "@/lib/redux/slices/userSlice";
import { logoutUser } from "@/services/auth.services";
import { LOGIN } from "@/core/routeConstants";

const UserNavbar = () => {
    const [state, formAction, isPending] = useActionState(logoutUser, {
        error: "",
        success: false,
    });

    // Redux
    const dispatch = useDispatch();

    // Router
    const router = useRouter();
    const pathname = usePathname();

    // State
    const { success } = state;

    const isActive = (path: string) => pathname === path;

    const getLinkClassName = (path: string) => {
        const baseClasses = "rounded-md px-3 py-2 text-sm font-medium";
        return isActive(path)
            ? `${baseClasses} bg-gray-900 text-white`
            : `${baseClasses} text-gray-300 hover:bg-gray-700 hover:text-white`;
    };

    useEffect(() => {
        if (success) {
            dispatch(logout());
            router.push(LOGIN);
        }
    }, [success, dispatch, router]);

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Image
                                className="h-8 w-auto"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                                width={32}
                                height={32}
                                priority
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <Link href="/" className={getLinkClassName("/")}>
                                    Home
                                </Link>
                                <Link href="/product" className={getLinkClassName("/product")}>
                                    Product
                                </Link>
                            </div>
                        </div>
                        <div className="ml-auto flex items-center pr-2">
                            <Link href="/favorites" className={getLinkClassName("/favorites")}>
                                My Favorites
                            </Link>
                            <form action={formAction}>
                                <Button
                                    type="submit"
                                    label="Logout"
                                    customClassName="rounded-md cursor-pointer px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                    isPending={isPending}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNavbar;
