"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmed = email.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setEmail("");

    toast.success("You're subscribed! Watch your inbox for studio updates.");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded-lg border border-pink-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
        />

        <button
          type="submit"
          className="shrink-0 rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
        >
          Subscribe
        </button>
      </div>

      <p className="mt-2 text-xs leading-5 text-pink-700">
        Monthly studio openings, hosting tips, and creator stories. No spam.
      </p>
    </form>
  );
}
