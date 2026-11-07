export default function EditStudioLoading() {
  return (
    <main className="min-h-screen bg-[#fff8fb] px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl space-y-5 sm:space-y-6">
        <div className="space-y-3">
          <div className="h-3 w-36 animate-pulse rounded bg-pink-100" />
          <div className="h-4 w-28 animate-pulse rounded bg-pink-100" />
          <div className="h-9 w-64 animate-pulse rounded-lg bg-pink-100" />
        </div>

        {[1, 2, 3].map((card) => (
          <div
            key={card}
            className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
          >
            <div className="h-5 w-44 animate-pulse rounded bg-pink-100" />
            <div className="mt-2 h-3 w-56 animate-pulse rounded bg-pink-50" />

            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="h-11 animate-pulse rounded-lg bg-pink-50" />
              <div className="h-11 animate-pulse rounded-lg bg-pink-50" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
