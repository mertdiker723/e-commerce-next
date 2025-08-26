"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

// Components
import UserNavbar from "@/components/user/Navbar";

// Libs
import { RootState } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/slices/userSlice";

// Core
import { FORGOTPASSWORD, LOGIN, REGISTER } from "@/core/routeConstants";

const unShownPaths = [LOGIN, REGISTER, FORGOTPASSWORD];

const NavbarWrapper = () => {
    const dispatch = useDispatch();
    const { user, wasLoggedOut } = useSelector((state: RootState) => state.auth);
    const pathname = usePathname();

    useEffect(() => {
        (async () => {
            if (unShownPaths.includes(pathname)) return;
            if (!user && !wasLoggedOut) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/getUser`, {
                        credentials: "include",
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (res.ok) {
                        const data = await res.json();
                        dispatch(setUser(data.user));
                    }
                } catch (error) {
                    console.error("Fetch error:", error);
                }
            }
        })();
    }, [user, dispatch, pathname, wasLoggedOut]);

    const shouldHideNavbar = !user || unShownPaths.includes(pathname);

    if (shouldHideNavbar) return null;

    return <UserNavbar />
};

export default NavbarWrapper;
