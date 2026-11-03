"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const linkClass = (link) =>
    `rounded-md border px-3 py-2 text-sm font-medium transition ${
      activeLink === link
        ? "border-pink-400 bg-pink-50 text-pink-700"
        : "border-transparent text-pink-900 hover:border-pink-300 hover:text-pink-600"
    }`;

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-pink-200 bg-pink-100 text-pink-950">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <Link
          href="/"
          onClick={() => handleLinkClick("/")}
          className="flex items-center gap-2 text-xl font-bold"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-400 text-lg text-pink-950">
            ◉
          </span>
          StudioSpace
        </Link>

        {/* Desktop navigation */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/"
            onClick={() => handleLinkClick("/")}
            className={linkClass("/")}
          >
            Home
          </Link>

          <Link
            href="/studios"
            onClick={() => handleLinkClick("/studios")}
            className={linkClass("/studios")}
          >
            Explore Studios
          </Link>

          <Link
            href="#how-it-works"
            onClick={() => handleLinkClick("#how-it-works")}
            className={linkClass("#how-it-works")}
          >
            How It Works
          </Link>

          <Link
            href="#about"
            onClick={() => handleLinkClick("#about")}
            className={linkClass("#about")}
          >
            About Us
          </Link>
        </div>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            type="button"
            className="rounded-md border border-pink-400 px-4 py-2 text-sm font-medium text-pink-900 transition hover:bg-pink-200"
          >
            Sign In
          </button>

          <button
            type="button"
            className="rounded-md bg-pink-400 px-4 py-2 text-sm font-semibold text-pink-950 transition hover:bg-pink-300"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-md p-2 text-pink-900 transition hover:bg-pink-200 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile navigation */}
      {menuOpen && (
        <div className="border-t border-pink-200 px-4 pb-4 md:hidden">
          <div className="flex flex-col gap-2 pt-3">
            <Link
              href="/"
              onClick={() => handleLinkClick("/")}
              className={linkClass("/")}
            >
              Home
            </Link>

            <Link
              href="/studios"
              onClick={() => handleLinkClick("/studios")}
              className={linkClass("/studios")}
            >
              Explore Studios
            </Link>

            <Link
              href="#how-it-works"
              onClick={() => handleLinkClick("#how-it-works")}
              className={linkClass("#how-it-works")}
            >
              How It Works
            </Link>

            <Link
              href="#about"
              onClick={() => handleLinkClick("#about")}
              className={linkClass("#about")}
            >
              About Us
            </Link>
          </div>

          {/* Mobile buttons */}
          <div className="mt-3 flex gap-2 border-t border-pink-200 pt-3">
            <button
              type="button"
              className="flex-1 rounded-md border border-pink-400 px-3 py-2 text-sm font-medium text-pink-900 transition hover:bg-pink-200"
            >
              Sign In
            </button>

            <button
              type="button"
              className="flex-1 rounded-md bg-pink-400 px-3 py-2 text-sm font-semibold text-pink-950 transition hover:bg-pink-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </header>
  );
}