import StudioSkeleton from "@/components/StudioSkeleton";

export default function StudiosLoading() {
  return (
    <div className="min-h-screen bg-[#fff8fb]">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="h-8 w-40 animate-pulse rounded-lg bg-pink-100" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-6 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-3 lg:px-8">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <StudioSkeleton key={item} />
        ))}
      </div>
    </div>
  );
}
