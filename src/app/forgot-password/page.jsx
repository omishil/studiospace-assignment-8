
import React from "react";
import Link from "next/link";

const ForgotPassPage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#fff8fb] px-4 py-10 sm:py-14">
      <div className="w-full max-w-md rounded-2xl border border-pink-100 bg-white p-5 shadow-lg shadow-pink-100/50 sm:p-8">

        {/* Heading */}
        <div className="mb-7 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pink-600 text-2xl text-white shadow-md shadow-pink-200">
            🔒
          </div>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Forgot Password?
          </h1>

          <p className="mt-2 text-xs leading-relaxed text-gray-500 sm:text-sm">
            Don't worry! Enter your email address and we'll help you reset your password.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
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
              placeholder="Enter your registered email"
              className="w-full rounded-lg border border-pink-200 bg-pink-50/30 px-3 py-3 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-pink-600 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 active:scale-[0.99]"
          >
            Reset Password
          </button>
        </form>

        {/* Back to Login */}
        <p className="mt-7 text-center text-xs text-gray-500 sm:text-sm">
          Remember your password?{" "}
          <Link
            href="/Login"
            className="font-semibold text-pink-600 transition hover:text-pink-800"
          >
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default ForgotPassPage;
