export default function StudioDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <div className="h-4 w-32 animate-pulse rounded bg-pink-100" />

        <div className="mt-4 h-56 w-full animate-pulse rounded-2xl bg-pink-100 sm:h-80" />

        <div className="mt-6 space-y-3">
          <div className="h-3 w-24 animate-pulse rounded bg-pink-100" />
          <div className="h-8 w-2/3 animate-pulse rounded-lg bg-pink-100" />

          <div className="flex gap-4">
            <div className="h-4 w-28 animate-pulse rounded bg-pink-100" />
            <div className="h-4 w-20 animate-pulse rounded bg-pink-100" />
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <div className="space-y-4 rounded-2xl border border-pink-100 bg-white p-4 sm:p-6 md:col-span-2">
            <div className="h-5 w-40 animate-pulse rounded bg-pink-100" />
            <div className="h-3 w-full animate-pulse rounded bg-pink-50" />
            <div className="h-3 w-11/12 animate-pulse rounded bg-pink-50" />
            <div className="h-3 w-4/5 animate-pulse rounded bg-pink-50" />

            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="h-20 animate-pulse rounded-xl bg-pink-50" />
              <div className="h-20 animate-pulse rounded-xl bg-pink-50" />
            </div>
          </div>

          <div className="h-fit space-y-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="h-3 w-24 animate-pulse rounded bg-pink-100" />
            <div className="h-8 w-32 animate-pulse rounded bg-pink-100" />
            <div className="h-px w-full bg-pink-50" />
            <div className="h-4 w-full animate-pulse rounded bg-pink-50" />
            <div className="mt-4 h-12 w-full animate-pulse rounded-xl bg-pink-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
