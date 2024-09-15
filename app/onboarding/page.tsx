import React from "react";
import { Logo } from "@/components/icons";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";

export default function OnBoardingPage() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 gap-12">
      <div className="flex flex-col items-center justify-center sm:mx-auto sm:w-full">
        <Logo className="w-64 h-64 p-5" height={100} width={250} />
        <br />
        <h2 className="mt-16 text-center text-4xl font-light leading-9 tracking-tight text-gray-900">
          Sign in to start innovating...
        </h2>
        <br />
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full max-w-md w-full">
        <form action="#" className="space-y-8 flex flex-col" method="POST">
          <div className="flex flex-col justify-start items-start w-full">
            <label
              className="block text-lg font-medium leading-6 text-gray-900 mb-2"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="w-full">
              <Input
                required
                autoComplete="email"
                className="w-full"
                id="email"
                name="email"
                type="email"
                size="lg"
              />
              <br />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start w-full">
            <div className="flex items-center justify-between w-full mb-2">
              <label
                className="block text-lg font-medium leading-6 text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <div className="text-lg text-right">
                <Link
                  className="font-light"
                  color="warning"
                  underline="hover"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="w-full">
              <Input
                required
                autoComplete="current-password"
                className="w-full"
                id="password"
                name="password"
                type="password"
                size="lg"
              />
              <br />
            </div>
          </div>
          <div>
            <Button
              color="primary"
              className="w-full"
              variant="ghost"
              type="submit"
              size="lg"
            >
              Sign in
            </Button>
          </div>
        </form>
        <p className="mt-12 text-center text-lg text-gray-500">
          Not a member?{" "}
          <Link color="warning" underline="hover" href="/sign-up">
            Sign Up Now
          </Link>
        </p>
      </div>
    </div>
  );
}
