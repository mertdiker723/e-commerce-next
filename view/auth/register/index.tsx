"use client";

// Libraries
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

// Action
import { registerUser } from "@/services/auth.services";

// Common
import Button from "@/common/Button";
import Input from "@/common/Input/input";
import { resetWasLoggedOut } from "@/lib/redux/slices/userSlice";

const Register = () => {
    const [state, formAction, isPending] = useActionState(registerUser, {
        error: "",
        success: false,
    });

    // Redux
    const dispatch = useDispatch();

    const router = useRouter();

    const { error, success } = state;

    useEffect(() => {
        if (success) {
            router.push("/");
            dispatch(resetWasLoggedOut());
        }
    }, [success, router, dispatch]);

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
                <Input type="email" id="email" name="email" placeholder="Email" />
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 mb-2">
                    Password
                </label>
                <Input type="password" id="password" name="password" placeholder="Password" />
                <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900 mb-2">
                    Repassword
                </label>
                <Input type="password" id="Repassword" name="repassword" placeholder="Repassword" />
                <Button
                    type="submit"
                    label="Register"
                    customClassName="button__item purple mt-4"
                    isPending={isPending}
                />
            </form>
        </>
    );
};

export default Register;
