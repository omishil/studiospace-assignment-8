export default function StudioSkeleton() {
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-pink-100 bg-white sm:rounded-2xl">
        <div className="h-36 animate-pulse bg-gray-200 sm:h-48" />

        <div className="space-y-3 p-3 sm:p-5">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
          <div className="h-3 w-full animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </>
  );
}