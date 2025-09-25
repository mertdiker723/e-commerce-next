"use client";

import { useActionState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

// Components
import Input from "@/common/Input/input";
import Button from "@/common/Button";

// Services & Redux
import { getUser, loginUser } from "@/services/auth.services";
import { setUser, resetWasLoggedOut } from "@/lib/redux/slices/userSlice";

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
    const { error, success, user } = state;

    useEffect(() => {
        (async () => {
            const { success, user } = await getUser();
            if (success && user) {
                dispatch(setUser(user));
                dispatch(resetWasLoggedOut());
                router.push("/");
            }
        })();
    }, [success, user, dispatch, router]);

    return (
        <form className="space-y-3" action={formAction}>
            {error && (
                <div className="w-full">
                    <p className="text-sm text-red-700 break-words">{error}</p>
                </div>
            )}

            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 mb-2">
                    Email
                </label>
                <Input type="email" id="email" name="email" required placeholder="Email" />
            </div>

            <div>
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
                <Input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Password"
                />
            </div>

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
