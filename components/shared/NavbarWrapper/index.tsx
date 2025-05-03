"use client";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";

// Components
import AdminNavbar from "@/components/admin/Navbar";
import UserNavbar from "@/components/user/Navbar";

// Lib
import { RootState } from "@/lib/redux/store";
import { ADMIN } from "@/lib/userTypes";
import { useEffect } from "react";
import { setUser } from "@/lib/redux/slices/userSlice";

// Core
import { FORGOTPASSWORD, LOGIN, REGISTER } from "@/core/routeConstants";

const unShownPaths = [LOGIN, REGISTER, FORGOTPASSWORD];

const NavbarWrapper = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user);
    const pathname = usePathname();

    useEffect(() => {
        (async () => {
            if (unShownPaths.includes(pathname)) return;
            if (!user) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/login`, {
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
    }, [user, dispatch, pathname]);

    const shouldHideNavbar = !user || unShownPaths.includes(pathname);

    if (shouldHideNavbar) return null;

    return user.type === ADMIN ? <AdminNavbar /> : <UserNavbar />;
};

export default NavbarWrapper;
