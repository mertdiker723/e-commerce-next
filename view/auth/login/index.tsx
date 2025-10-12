"use client";

import { useActionState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

// Components
import Input from "@/common/Input/input";
import Button from "@/common/Button";

// Services & Redux
import { loginUser } from "@/services/auth.services";
import { resetWasLoggedOut } from "@/lib/redux/slices/userSlice";

// Types
import type { LoginState } from "@/utils/tokenUtils";

const initialState: LoginState = {
    error: "",
    success: false,
    user: null,
};

const Login = () => {
    const [state, formAction, isPending] = useActionState(loginUser, initialState);
    const dispatch = useDispatch();
    const router = useRouter();
    const { error, success, user: userState } = state;

    const successLoginHandle = useCallback(async () => {
        dispatch(resetWasLoggedOut());
        router.push("/");
    }, [dispatch, router]);

    const errorLoginHandle = useCallback(
        (errorMessage: string) => {
            if (!isPending) {
                toast.error(errorMessage);
            }
        },
        [isPending]
    );

    useEffect(() => {
        (async () => {
            if (success && userState) {
                await successLoginHandle();
                return;
            }

            if (error) {
                errorLoginHandle(error);
            }
        })();
    }, [success, error, userState, successLoginHandle, errorLoginHandle]);

    return (
        <form className="space-y-3" action={formAction}>
            <Input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email"
                label="Email"
            />

            <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                    Password
                </label>
                <Link
                    href="/forgotPassword"
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                >
                    Forgot password?
                </Link>
            </div>
            <Input type="password" id="password" name="password" required placeholder="Password" />

            <Button
                type="submit"
                label="Sign in"
                customClassName="button__item purple mt-4"
                isPending={isPending}
            />
        </form>
    );
};

export default Login;
