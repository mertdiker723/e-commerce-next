"use client";

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePathname, useRouter } from "next/navigation";

// Components
import UserNavbar from "@/common/Navbar";

// Libs
import { RootState } from "@/lib/redux/store";
import { logout, setUser } from "@/lib/redux/slices/userSlice";

// Core
import { FORGOTPASSWORD, LOGIN, REGISTER } from "@/core/routeConstants";

// Services
import { getUser, logoutUser } from "@/services/auth.services";
import toast from "react-hot-toast";

const unShownPaths = [LOGIN, REGISTER, FORGOTPASSWORD];

const NavbarWrapper = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();

    const { user, wasLoggedOut } = useSelector((state: RootState) => state.auth);

    const userHandle = useCallback(async () => {
        const { success, user: userResult, error } = await getUser();

        if (success && userResult) {
            dispatch(setUser(userResult));
            return;
        }

        if (error) {
            toast.error(error);
            await logoutUser();

            dispatch(logout());
            router.push(LOGIN);
        }
    }, [dispatch, router]);

    useEffect(() => {
        (async () => {
            if (unShownPaths.includes(pathname)) return;

            if (!user && !wasLoggedOut) {
                await userHandle();
            }
        })();
    }, [user, pathname, wasLoggedOut, router, userHandle, dispatch]);

    const shouldHideNavbar = !user || unShownPaths.includes(pathname);

    if (shouldHideNavbar) return null;

    return <UserNavbar />;
};

export default NavbarWrapper;
