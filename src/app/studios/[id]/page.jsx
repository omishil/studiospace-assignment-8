import Link from "next/link";
import EditDialog from "../../../components/EditDialog";
import StudioImageSlider from "../../../components/StudioImageSlider";

export default async function StudioDetailsPage({ params }) {
  const { id } = await params;

  const res = await fetch(`http://localhost:5000/studios/${id}`);
  const studio = await res.json();

  // Support both new multiple images and older single-image records
  const images = studio.images?.length
    ? studio.images
    : studio.image
      ? [studio.image]
      : [];

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/studios"
          className="text-sm font-medium text-pink-600 hover:text-pink-700"
        >
          ← Back to Studios
        </Link>

        {/* Studio Image Slider */}
        <StudioImageSlider images={images} title={studio.title} />

        {/* Studio Header */}
        <div className="mt-6">
          <p className="text-sm font-medium text-pink-600">
            {studio.category}
          </p>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-4xl">
              {studio.title}
            </h1>

            {/* Edit Button */}
            <EditDialog studio={studio} studioId={id} />
          </div>

          <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-600">
            <p>📍 {studio.location}</p>
            <p>
              ⭐ {studio.rating ?? "No rating"}
              {studio.rating != null && " / 5"}
            </p>
          </div>
        </div>

        {/* Details */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <section className="rounded-2xl border border-pink-100 bg-white p-4 sm:p-6 md:col-span-2">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              About This Studio
            </h2>

            <p className="mt-3 whitespace-pre-line text-sm leading-7 text-gray-600">
              {studio.overview || "No description available."}
            </p>

            <h2 className="mt-7 text-lg font-bold text-gray-900">
              Studio Information
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-pink-50 p-3">
                <p className="text-xs text-gray-500">
                  Maximum Capacity
                </p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {studio.maxCapacity} people
                </p>
              </div>

              <div className="rounded-xl bg-pink-50 p-3">
                <p className="text-xs text-gray-500">Category</p>
                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {studio.category}
                </p>
              </div>
            </div>

            {studio.address && (
              <div className="mt-5">
                <h3 className="text-sm font-semibold text-gray-900">
                  Full Address
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {studio.address}
                </p>
              </div>
            )}
          </section>

          {/* Pricing */}
          <aside className="h-fit rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:p-6">
            <p className="text-sm text-gray-500">Rental Price</p>

            <p className="mt-1 text-2xl font-bold text-pink-600">
              ${studio.hourlyRate}
              <span className="text-sm font-normal text-gray-500">
                {" "}/ hour
              </span>
            </p>

            <div className="my-5 border-t border-pink-100" />

            <div className="flex justify-between gap-2 text-sm">
              <span className="text-gray-500">Security Deposit</span>
              <span className="font-semibold text-gray-900">
                ${studio.securityDeposit}
              </span>
            </div>

            <button
              disabled
              className="mt-6 w-full rounded-xl bg-pink-700 px-4 py-3 text-sm font-semibold text-white"
            >
              Book Workshop Now
            </button>
          </aside>
        </div>

        {/* Amenities */}
        <section className="mt-6 rounded-2xl border border-pink-100 bg-white p-4 sm:p-6">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            Studio Amenities
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {studio.amenities?.map((amenity) => (
              <span
                key={amenity}
                className="rounded-full bg-pink-50 px-3 py-2 text-xs text-pink-700 sm:text-sm"
              >
                ✓ {amenity}
              </span>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}