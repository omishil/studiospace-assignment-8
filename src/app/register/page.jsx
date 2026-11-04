
"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!/[A-Z]/.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(password)) {
      setPasswordError("Password must contain at least one lowercase letter.");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    setPasswordError("");

    // Registration logic will be added later.
    console.log("Password is valid!");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#fff8fb] px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-pink-100 bg-white p-5 shadow-lg sm:p-8">

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Create an Account
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Join StudioSpace and explore creative spaces.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              className="w-full rounded-lg border border-pink-200 px-3 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-lg border border-pink-200 px-3 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Photo URL
            </label>
            <input
              type="url"
              required
              placeholder="Enter your photo URL"
              className="w-full rounded-lg border border-pink-200 px-3 py-3 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError("");
                }}
                placeholder="Create a password"
                className="w-full rounded-lg border border-pink-200 px-3 py-3 pr-16 text-sm outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-pink-600 hover:text-pink-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              Password must contain:
            </p>

            <ul className="mt-1 space-y-1 text-xs text-gray-500">
              <li>• At least 6 characters</li>
              <li>• One uppercase letter (A-Z)</li>
              <li>• One lowercase letter (a-z)</li>
            </ul>

            {passwordError && (
              <p className="mt-2 text-xs font-medium text-red-600">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-pink-600 py-3 text-sm font-semibold text-white transition hover:bg-pink-700"
          >
            Register
          </button>
        </form>

        <button
          type="button"
          className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-200 bg-white py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
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

        <p className="mt-6 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/Login"
            className="font-semibold text-pink-600 hover:text-pink-800"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
