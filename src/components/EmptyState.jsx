import Link from "next/link";

export default function EmptyState({
  icon = "🎬",
  title,
  description,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel,
}) {
  return (
    <div className="rounded-2xl border border-pink-100 bg-white px-4 py-10 text-center shadow-sm sm:py-14">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pink-50 text-2xl text-pink-500 sm:h-16 sm:w-16 sm:text-3xl">
        {icon}
      </div>

      <h2 className="mt-4 text-base font-semibold text-gray-800 sm:text-lg">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-gray-500 sm:text-sm">
          {description}
        </p>
      )}

      {(actionHref || secondaryHref) && (
        <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3">
          {actionHref && (
            <Link
              href={actionHref}
              className="inline-block rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-pink-700 sm:text-sm"
            >
              {actionLabel}
            </Link>
          )}

          {secondaryHref && (
            <Link
              href={secondaryHref}
              className="inline-block rounded-lg border border-pink-200 bg-white px-4 py-2 text-xs font-semibold text-pink-700 transition hover:bg-pink-50 sm:text-sm"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
