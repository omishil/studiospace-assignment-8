import Link from "next/link";
import StudioIllustration from "@/components/StudioIllustration";

export default function StudioNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8fb] px-4 py-12 sm:px-8">
      <div className="w-full max-w-lg rounded-3xl border border-pink-100 bg-white px-5 py-10 text-center shadow-sm sm:px-10 sm:py-14">
        <StudioIllustration className="mx-auto w-full max-w-xs" />

        <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
          Studio not found
        </p>

        <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          This studio has left the set
        </h1>

        <p className="mx-auto mt-3 max-w-sm text-xs leading-relaxed text-gray-500 sm:text-sm">
          The studio you&apos;re looking for doesn&apos;t exist or may have been
          removed by its host.
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          <Link
            href="/studios"
            className="inline-block rounded-xl bg-pink-600 px-6 py-3 text-xs font-semibold text-white shadow-md shadow-pink-200 transition hover:bg-pink-700 sm:text-sm"
          >
            Back to Studios
          </Link>

          <Link
            href="/"
            className="inline-block rounded-xl border border-pink-200 bg-white px-6 py-3 text-xs font-semibold text-pink-700 transition hover:bg-pink-50 sm:text-sm"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
