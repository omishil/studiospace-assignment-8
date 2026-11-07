export default function BookingsLoading() {
  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 space-y-3 sm:mb-8">
          <div className="h-8 w-44 animate-pulse rounded-lg bg-pink-100" />
          <div className="h-3 w-64 animate-pulse rounded bg-pink-50" />
        </div>

        <div className="mb-5 h-20 animate-pulse rounded-xl border border-pink-100 bg-white sm:mb-6" />

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
          {[1, 2].map((card) => (
            <div
              key={card}
              className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="h-5 w-40 animate-pulse rounded bg-pink-100" />
                  <div className="h-3 w-28 animate-pulse rounded bg-pink-50" />
                </div>
                <div className="h-6 w-20 animate-pulse rounded-full bg-pink-50" />
              </div>

              <div className="my-4 h-px w-full bg-pink-50" />

              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((field) => (
                  <div key={field} className="space-y-2">
                    <div className="h-3 w-20 animate-pulse rounded bg-pink-50" />
                    <div className="h-4 w-24 animate-pulse rounded bg-pink-100" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
