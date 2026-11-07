import Link from "next/link";
import { STUDIO_CATEGORIES } from "@/lib/categories";

export default function StudioCategories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-16">
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <span className="inline-flex w-fit items-center gap-2 rounded-full bg-pink-50 px-3 py-1 text-[11px] font-semibold text-pink-600 ring-1 ring-pink-100 sm:text-xs">
          <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />
          Explore Categories
        </span>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Browse by Studio Categories
        </h2>

        <p className="max-w-xl text-sm leading-relaxed text-gray-500 sm:text-base">
          Find the perfect creative space for your next project.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-6">
        {STUDIO_CATEGORIES.map((category) => (
          <Link
            key={category.value}
            href={`/studios?category=${encodeURIComponent(category.value)}`}
            className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-pink-100 bg-gradient-to-b from-white to-pink-50/40 px-3 py-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-pink-300 hover:shadow-xl hover:shadow-pink-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2 sm:rounded-3xl sm:py-8 dark:border-pink-900/40 dark:from-[#241820] dark:to-[#1b1118]"
          >
            {/* top accent line */}
            <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-pink-400 to-rose-500 transition-transform duration-300 group-hover:scale-x-100" />

            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-sm ring-1 ring-pink-100 transition-all duration-300 group-hover:rotate-3 group-hover:scale-110 group-hover:bg-pink-500 group-hover:shadow-md group-hover:ring-pink-500 sm:h-[72px] sm:w-[72px] sm:text-3xl dark:bg-[#2e1d28] dark:ring-pink-900/40 dark:group-hover:bg-pink-600 dark:group-hover:ring-pink-600">
              {category.icon}
            </span>

            <h3 className="mt-4 text-sm font-semibold text-gray-800 transition-colors group-hover:text-pink-600 sm:text-base dark:text-pink-50 dark:group-hover:text-pink-300">
              {category.value}
            </h3>

            <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-pink-500 sm:text-xs dark:text-pink-300">
              Explore
              <svg
                className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}