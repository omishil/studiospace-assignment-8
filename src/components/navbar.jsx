
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#howitworks", label: "How It Works" },
  { href: "/#about", label: "About Us" },
];

const accountLinks = [
  { href: "/profile", label: "My Profile" },
  { href: "/add-studio", label: "Add New Studio" },
  { href: "/my-listings", label: "My Studio Listings" },
  { href: "/my-bookings", label: "My Bookings" },
  { href: "/saved-wishlists", label: "Saved Wishlists" },
];

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#fff8fb]";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = useSession();

  const isLoggedIn = !!session?.user;

  const isActive = (href) =>
    href === "/"
      ? pathname === "/"
      : !href.includes("#") && pathname.startsWith(href);

  const linkClass = (href) =>
    `rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${focusRing} ${
      isActive(href)
        ? "bg-pink-100 text-pink-700"
        : "text-gray-600 hover:bg-pink-50 hover:text-pink-700"
    }`;

  const handleLogout = async () => {
    await signOut();

    setMenuOpen(false);
    setUserMenuOpen(false);

    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 border-b-2 border-pink-100 bg-[#fff8fb]/85 backdrop-blur-md">
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

        {/* Desktop authentication */}
        <div className="hidden items-center gap-2 md:flex">
          {isPending ? (
            <span className="text-sm text-gray-400">Loading...</span>
          ) : isLoggedIn ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen((open) => !open)}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-pink-50 ${focusRing}`}
              >
                {session.user.image && (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full border-2 border-pink-200 object-cover"
                  />
                )}

                <span className="max-w-32 truncate">
                  {session.user.name || "My Account"}
                </span>

                <span>▾</span>
              </button>

              {/* Desktop account dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 rounded-xl border border-pink-100 bg-white p-2 shadow-lg">
                  {accountLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setUserMenuOpen(false)}
                      className="block rounded-lg px-3 py-2.5 text-sm text-gray-700 transition hover:bg-pink-50 hover:text-pink-700"
                    >
                      {link.label}
                    </Link>
                  ))}

                  <div className="my-1 border-t border-gray-100" />

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/Login"
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
            </>
          )}
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
                className={`${linkClass(link.href)} py-3 text-sm sm:text-base`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 border-t border-pink-100 pt-4">
            {isPending ? (
              <p className="text-center text-sm text-gray-400">
                Loading...
              </p>
            ) : isLoggedIn ? (
              <div className="space-y-2">

                {/* Mobile user information */}
                <div className="flex items-center gap-3 rounded-lg bg-pink-50 p-3">
                  {session.user.image && (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="h-9 w-9 rounded-full border-2 border-pink-200 object-cover"
                    />
                  )}

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {session.user.name || "My Account"}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {session.user.email}
                    </p>
                  </div>
                </div>

                {/* Mobile account links */}
                {accountLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-pink-50 hover:text-pink-700"
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-pink-100 pt-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full rounded-lg bg-red-50 px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/Login"
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
            )}
          </div>
        </div>
      )}
    </header>
  );
}
