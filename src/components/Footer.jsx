import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-pink-200 bg-pink-100 text-pink-950">
  <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3">
    {/* Brand */}
    <div>
      <Link href="/" className="flex items-center gap-2 text-xl font-bold">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-pink-400">
          ◉
        </span>
        StudioSpace
      </Link>

      <p className="mt-4 max-w-xs text-sm leading-6 text-pink-800">
        Discover inspiring studios and find the perfect creative space for your
        next project.
      </p>

      <p className="mt-6 text-xs text-pink-700">
        © 2026 StudioSpace. All rights reserved.
      </p>

      <div className="mt-2 flex gap-4 text-xs">
        <Link href="/terms" className="hover:text-pink-600">
          Terms
        </Link>
        <Link href="/privacy" className="hover:text-pink-600">
          Privacy
        </Link>
      </div>

      <div className="mt-6 flex gap-4">
        <Link
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
          aria-label="StudioSpace on X"
          className="text-lg font-bold hover:text-pink-600"
        >
          𝕏
        </Link>

        <Link
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm hover:text-pink-600"
        >
          Instagram
        </Link>

        <Link
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm hover:text-pink-600"
        >
          LinkedIn
        </Link>
      </div>
    </div>

    {/* Quick navigation */}
    <div>
      <h3 className="font-semibold">Quick Navigation</h3>

      <div className="mt-4 flex flex-col gap-3 text-sm text-pink-800">
        <Link href="/" className="hover:text-pink-600">
          Home
        </Link>
        <Link href="/studios" className="hover:text-pink-600">
          Explore Studios
        </Link>
        <Link href="#how-it-works" className="hover:text-pink-600">
          How It Works
        </Link>
        <Link href="#about" className="hover:text-pink-600">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-pink-600">
          Contact
        </Link>
      </div>
    </div>

    {/* Categories */}
    <div>
      <h3 className="font-semibold">Popular Categories</h3>

      <div className="mt-4 flex flex-col gap-3 text-sm text-pink-800">
        <Link href="/studios/photography" className="hover:text-pink-600">
          Photography Studios
        </Link>
        <Link href="/studios/music" className="hover:text-pink-600">
          Music Studios
        </Link>
        <Link href="/studios/film" className="hover:text-pink-600">
          Film Studios
        </Link>
        <Link href="/studios/art" className="hover:text-pink-600">
          Art Studios
        </Link>
        <Link href="/studios/podcast" className="hover:text-pink-600">
          Podcast Studios
        </Link>
      </div>
    </div>
  </div>
</footer>
  );
}