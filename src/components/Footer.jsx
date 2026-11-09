"use client";

import { useState } from "react";
import Link from "next/link";
import NewsletterForm from "@/components/newsletter-form";
import { STUDIO_CATEGORIES } from "@/lib/categories";

export default function Footer() {
  const [openQuickNav, setOpenQuickNav] = useState(false);
  const [openCategories, setOpenCategories] = useState(false);

  return (
    <footer className="border-t border-pink-200 bg-pink-50 text-pink-950">
      {/* Main Footer */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-10 sm:grid-cols-2 sm:px-6 sm:py-14 lg:grid-cols-4 lg:gap-12">

        {/* Brand Section */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xl font-bold tracking-tight"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 text-xl text-white shadow-sm">
              ◉
            </span>
            StudioSpace
          </Link>

          <p className="mt-4 max-w-sm text-sm leading-7 text-pink-800">
            Discover inspiring studios and find the perfect creative space
            for your next big idea. Your creativity deserves the right space.
          </p>

          {/* Social Links */}
          <div className="mt-6">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-pink-700">
              Follow Us
            </h3>

            <div className="flex items-center gap-3">
              <Link
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="StudioSpace on X"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-pink-200 bg-white text-lg font-bold transition hover:border-pink-600 hover:bg-pink-600 hover:text-white"
              >
                𝕏
              </Link>

              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="StudioSpace on Instagram"
                className="flex h-9 items-center justify-center rounded-full border border-pink-200 bg-white px-3 text-xs font-medium transition hover:border-pink-600 hover:bg-pink-600 hover:text-white"
              >
                Instagram
              </Link>

              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="StudioSpace on LinkedIn"
                className="flex h-9 items-center justify-center rounded-full border border-pink-200 bg-white px-3 text-xs font-medium transition hover:border-pink-600 hover:bg-pink-600 hover:text-white"
              >
                LinkedIn
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div>
          <h3 className="hidden text-sm font-bold tracking-wide text-pink-950 sm:block">
            Quick Navigation
          </h3>

          <button
            type="button"
            onClick={() => setOpenQuickNav((prev) => !prev)}
            aria-expanded={openQuickNav}
            aria-controls="footer-quick-navigation"
            className="flex w-full items-center justify-between text-sm font-bold tracking-wide text-pink-950 sm:hidden"
          >
            Quick Navigation
            <svg
              className={`h-4 w-4 transition-transform ${
                openQuickNav ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div
            id="footer-quick-navigation"
            className={`mt-5 text-sm text-pink-800 ${
              openQuickNav
                ? "flex flex-col gap-3"
                : "hidden sm:flex sm:flex-col sm:gap-3"
            }`}
          >
            <Link href="/" className="transition hover:translate-x-1 hover:text-pink-600">
              Home
            </Link>

            <Link href="/studios" className="transition hover:translate-x-1 hover:text-pink-600">
              Explore Studios
            </Link>

            <Link href="/#howitworks" className="transition hover:translate-x-1 hover:text-pink-600">
              How It Works
            </Link>

            <Link href="/#about" className="transition hover:translate-x-1 hover:text-pink-600">
              About Us
            </Link>

            <p>Contact</p>
          </div>
        </div>

        {/* Popular Categories */}
        <div>
          <h3 className="hidden text-sm font-bold tracking-wide text-pink-950 sm:block">
            Popular Categories
          </h3>

          <button
            type="button"
            onClick={() => setOpenCategories((prev) => !prev)}
            aria-expanded={openCategories}
            aria-controls="footer-popular-categories"
            className="flex w-full items-center justify-between text-sm font-bold tracking-wide text-pink-950 sm:hidden"
          >
            Popular Categories
            <svg
              className={`h-4 w-4 transition-transform ${
                openCategories ? "rotate-180" : "rotate-0"
              }`}
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <div
            id="footer-popular-categories"
            className={`mt-5 text-sm text-pink-800 ${
              openCategories
                ? "flex flex-col gap-3"
                : "hidden sm:flex sm:flex-col sm:gap-3"
            }`}
          >
            {STUDIO_CATEGORIES.map((category) => (
              <Link
                key={category.value}
                href={`/studios?category=${encodeURIComponent(category.value)}`}
                className="transition hover:translate-x-1 hover:text-pink-600"
              >
                {category.value}
              </Link>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-sm font-bold tracking-wide text-pink-950">
            Stay in the Loop
          </h3>

          <p className="mt-5 text-sm text-pink-800">
            Join the StudioSpace newsletter for new spaces and creator news.
          </p>

          <NewsletterForm />
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-pink-200 bg-pink-100/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left">
          <p className="text-xs text-pink-800">
            © 2026 StudioSpace. All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-pink-800">
            <Link href="/terms" className="transition hover:text-pink-600">
              Terms & Conditions
            </Link>

            <Link href="/privacy" className="transition hover:text-pink-600">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}