import Input from "@/common/Input/input";
import Button from "@/common/Button";
import Link from "next/link";

const Login = () => {
  return (
    <>
      <form className="space-y-3" action="#" method="POST">
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900 mb-2"
        >
          Email
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          required
          placeholder="Email"
        />
        <div className="flex items-center justify-between mb-2">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
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
        <Button type="submit" label="Sign in" customClassName="purple mt-4" />
      </form>
    </>
  );
};

export default Login;
