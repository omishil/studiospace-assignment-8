import StudioSkeleton from "@/components/StudioSkeleton";

export default function MyListingsLoading() {
  return (
    <main className="min-h-screen bg-[#fff8fb] px-3 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 space-y-3 sm:mb-8">
          <div className="h-3 w-28 animate-pulse rounded bg-pink-100" />
          <div className="h-8 w-56 animate-pulse rounded-lg bg-pink-100" />
          <div className="h-3 w-72 animate-pulse rounded bg-pink-50" />
        </div>

        <div className="mb-5 h-20 animate-pulse rounded-xl border border-pink-100 bg-white shadow-sm sm:mb-7" />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <StudioSkeleton key={item} />
          ))}
        </div>
      </div>
    </main>
  );
}
