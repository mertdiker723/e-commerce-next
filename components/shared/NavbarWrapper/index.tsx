"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

// Components
import UserNavbar from "@/components/user/Navbar";

// Libs
import { RootState } from "@/lib/redux/store";
import { logout, resetWasLoggedOut, setUser } from "@/lib/redux/slices/userSlice";

// Core
import { FORGOTPASSWORD, LOGIN, REGISTER } from "@/core/routeConstants";

// Services
import { getUser } from "@/services/auth.services";

// Helpers

const unShownPaths = [LOGIN, REGISTER, FORGOTPASSWORD];

const NavbarWrapper = () => {
    const dispatch = useDispatch();
    const { user, wasLoggedOut } = useSelector((state: RootState) => state.auth);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            if (unShownPaths.includes(pathname)) return;
            if (!user && !wasLoggedOut) {
                try {
                    const result = await getUser();

                    if (result.success && result.user) {
                        dispatch(setUser(result.user));
                        return;
                    }

                    // user apisi fail veridiğinde ne yapmalıyız? 
                    dispatch(resetWasLoggedOut());
                    dispatch(logout());
                    router.push(LOGIN);
                } catch {
                    console.log("getUser error");
                }
            }
        })();
    }, [user, dispatch, pathname, wasLoggedOut, router]);

    const shouldHideNavbar = !user || unShownPaths.includes(pathname);

    if (shouldHideNavbar) return null;

    return <UserNavbar />;
};

export default NavbarWrapper;
