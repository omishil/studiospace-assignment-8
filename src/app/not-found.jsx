import Link from "next/link";
import StudioIllustration from "@/components/StudioIllustration";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8fb] px-4 py-12 sm:px-8">
      <div className="w-full max-w-lg rounded-3xl border border-pink-100 bg-white px-5 py-10 text-center shadow-sm sm:px-10 sm:py-14">
        <StudioIllustration className="mx-auto w-full max-w-xs" />

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
          Error 404
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          This scene is out of frame
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-gray-500 sm:text-sm">
          We couldn&apos;t find the page you were looking for. It may have been
          moved, renamed, or never existed.
        </p>

        <Link
          href="/"
          className="mt-7 inline-block rounded-xl bg-pink-600 px-6 py-3 text-xs font-semibold text-white shadow-md shadow-pink-200 transition hover:bg-pink-700 sm:text-sm"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
}
