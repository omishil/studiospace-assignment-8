import { Loader2Icon } from "lucide-react";

export function BrandedSpinner({ className = "size-4" }) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={`animate-spin ${className}`}
    />
  );
}

export default function BrandedLoader({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 px-4">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-pink-200/50" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-600 text-white shadow-md shadow-pink-200">
          <BrandedSpinner className="size-5" />
        </span>
      </div>

      <p className="text-xs font-medium text-gray-500 sm:text-sm">{label}</p>
    </div>
  );
}
