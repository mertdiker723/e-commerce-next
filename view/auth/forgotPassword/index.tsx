"use client";

// Common
import Button from "@/common/Button";
import Input from "@/common/Input/input";

const ForgotPassword = () => {
    return (
        <>
            <form className="space-y-3" action="#" method="POST">
                <Input
                    type="email"
                    label="Email"
                    id="email"
                    name="email"
                    required
                    placeholder="Email"
                />
                <Button type="submit" label="Send" customClassName="button__item purple mt-4" />
            </form>
        </>
    );
};

export default ForgotPassword;
