"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/about", label: "About Us" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8fb]";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const linkClass = (href) =>
    `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${focusRing} ${
      isActive(href)
        ? "bg-pink-100 text-pink-700"
        : "text-gray-600 hover:bg-pink-50 hover:text-pink-700"
    }`;

  return (
    <header className="sticky top-0 z-50  bg-[#fff8fb]/85 backdrop-blur-md border-b-2 border-pink-100">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`flex items-center gap-2.5 rounded-lg ${focusRing}`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-600 text-white shadow-sm shadow-pink-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
          </span>

          <span className="text-lg font-bold tracking-tight text-gray-900">
            StudioSpace
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={linkClass(link.href)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-2 md:flex">
          <Link
            href="/login"
            className={`rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-pink-50 hover:text-pink-700 ${focusRing}`}
          >
            Login
          </Link>

          <Link
            href="/register"
            className={`rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-pink-200 transition-colors hover:bg-pink-700 ${focusRing}`}
          >
            Register
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className={`flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition-colors hover:bg-pink-50 md:hidden ${focusRing}`}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="border-t border-pink-100 bg-[#fff8fb] px-4 pb-5 pt-3 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`${linkClass(link.href)} py-3 text-base`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-pink-100 pt-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg border border-pink-200 bg-white px-3 py-2.5 text-center text-sm font-semibold text-gray-700 transition-colors hover:bg-pink-50 ${focusRing}`}
            >
              Login
            </Link>

            <Link
              href="/register"
              onClick={() => setMenuOpen(false)}
              className={`rounded-lg bg-pink-600 px-3 py-2.5 text-center text-sm font-semibold text-white shadow-sm shadow-pink-200 transition-colors hover:bg-pink-700 ${focusRing}`}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}