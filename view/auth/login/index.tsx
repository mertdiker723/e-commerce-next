"use client";

// Libraries
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import Link from "next/link";

// Common
import Input from "@/common/Input/input";
import Button from "@/common/Button";

// Lib
import { ADMIN } from "@/lib/userTypes";

// Action
import { loginUser } from "@/services/auth";
import { setUser, resetWasLoggedOut } from "@/lib/redux/slices/userSlice";

const Login = () => {
    const [state, formAction, isPending] = useActionState(loginUser, {
        error: "",
        success: false,
        user: null,
    });

    // Redux
    const dispatch = useDispatch();

    const router = useRouter();

    const { error, success, user } = state;

    useEffect(() => {
        if (success && user) {
            dispatch(setUser(user));
            if (user.type === ADMIN) {
                router.push("/admin/home");
                return;
            }
            router.push("/");
            dispatch(resetWasLoggedOut());
        }
    }, [success, router, user, dispatch]);

    return (
        <>
            <form className="space-y-3" action={formAction}>
                {error && (
                    <div className="w-full">
                        <p className="text-sm text-red-700 break-words">{error}</p>
                    </div>
                )}
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 mb-2">
                    Email
                </label>
                <Input type="email" id="email" name="email" required placeholder="Email" />
                <div className="flex items-center justify-between mb-2">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                        Password
                    </label>
                    <div className="text-sm">
                        <Link
                            href="/forgotPassword"
                            className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>
                <Input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Password"
                />
                <Button
                    type="submit"
                    label="Sign in"
                    customClassName="purple mt-4"
                    isPending={isPending}
                />
            </form>
        </>
    );
};

export default Login;
