
"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const loginData = Object.fromEntries(formData.entries());


};
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#fff8fb] px-4 py-10 sm:py-14">
      <div className="w-full max-w-md rounded-2xl border border-pink-100 bg-white p-5 shadow-lg shadow-pink-100/50 sm:p-8">

        {/* Heading */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-600 text-2xl text-white shadow-md shadow-pink-200">
            ◉
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back!
          </h1>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Log in to your StudioSpace account
          </p>
        </div>

        {/* Login Form */}
        <form className="space-y-4 "
        onSubmit={handleSubmit}>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm"
            >
              Email Address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-pink-200 bg-pink-50/30 px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-xs font-semibold text-gray-700 sm:text-sm"
            >
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                placeholder="Enter your password"
                className="w-full rounded-lg border border-pink-200 bg-pink-50/30 px-3 py-3 pr-16 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-pink-600 transition hover:text-pink-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-xs font-medium text-pink-600 transition hover:text-pink-800 sm:text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-lg bg-pink-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 active:scale-[0.99]"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className="h-5 w-5"
          >
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.76 7.18l7.73 6C44.42 37.99 46.98 31.8 46.98 24.55Z" />
            <path fill="#FBBC05" d="M10.53 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.13.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.56 10.78l7.97-6.19Z" />
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.73-6c-2.15 1.45-4.92 2.3-8.18 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 43.62 14.62 48 24 48Z" />
          </svg>

          Continue with Google
        </button>

        {/* Register Link */}
        <p className="mt-7 text-center text-xs text-gray-500 sm:text-sm">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="font-semibold text-pink-600 transition hover:text-pink-800"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
