
"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import StudioSkeleton from "@/components/StudioSkeleton";
import EmptyState from "@/components/EmptyState";
import WishlistButton from "@/components/wishlist-button";
import { STUDIO_CATEGORY_VALUES } from "@/lib/categories";

const categories = ["All", ...STUDIO_CATEGORY_VALUES];

export default function Studios({ limit }) {
  return (
    <Suspense
      fallback={
        <div className="grid grid-cols-1 gap-3 px-4 py-6 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-3 lg:px-8">
          {[1, 2, 3, 4, 5, 6]
            .slice(0, limit || 6)
            .map((item) => (
              <StudioSkeleton key={item} />
            ))}
        </div>
      }
    >
      <StudiosContent limit={limit} />
    </Suspense>
  );
}

function StudiosContent({ limit }) {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") || "All";

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/studios`);

        if (!res.ok) {
          throw new Error("Failed to fetch studios");
        }

        const data = await res.json();
        setStudios(data);
      } catch (error) {
        console.error("Failed to fetch studios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudios();
  }, []);

  // Filter studios by selected category
  const filteredStudios =
    selectedCategory === "All"
      ? studios
      : studios.filter(
          (studio) =>
            studio.category?.toLowerCase() ===
            selectedCategory.toLowerCase()
        );

  // Sort by rating only when limit is provided (homepage)
  const visibleStudios = limit
    ? [...filteredStudios]
        .sort(
          (a, b) =>
            (Number(b.rating) || 0) - (Number(a.rating) || 0)
        )
        .slice(0, limit)
    : filteredStudios;

  return (
    <>
      {/* Category Filters - Only on Studios Page */}
      {!limit && (
        <div className="flex flex-wrap gap-2 px-4 pt-5 sm:gap-3 sm:px-6 sm:pt-7 lg:px-8">
          {categories.map((category) => (
            <Link
              key={category}
              href={
                category === "All"
                  ? "/studios"
                  : `/studios?category=${encodeURIComponent(category)}`
              }
              className={`rounded-full border px-3 py-2 text-xs font-medium transition sm:px-5 sm:py-2.5 sm:text-sm ${
                selectedCategory === category
                  ? "border-pink-600 bg-pink-600 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-pink-500 hover:text-pink-600"
              }`}
            >
              {category}
            </Link>
          ))}
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 gap-3 px-4 py-6 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-3 lg:px-8">
          {[1, 2, 3, 4, 5, 6]
            .slice(0, limit || 6)
            .map((item) => (
              <StudioSkeleton key={item} />
            ))}
        </div>
      ) : visibleStudios.length === 0 ? (
        <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <EmptyState
            icon="🎬"
            title={
              selectedCategory === "All"
                ? "No studios listed yet"
                : `No studios in ${selectedCategory}`
            }
            description={
              selectedCategory === "All"
                ? "Be the first to share your creative space with the community."
                : "Try another category, or browse every studio on StudioSpace."
            }
            actionHref={selectedCategory === "All" ? "/add-studio" : "/studios"}
            actionLabel={
              selectedCategory === "All" ? "Add your studio" : "View all studios"
            }
            secondaryHref="/add-studio"
            secondaryLabel="List your studio"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 px-4 py-6 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-3 lg:px-8">
          {visibleStudios.map((studio) => (
            <div
              key={studio._id}
              className="flex h-full flex-col overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition hover:shadow-md sm:rounded-2xl"
            >
              <div className="relative h-36 w-full sm:h-48">
                <Image
                  src={studio.image}
                  alt={studio.title}
                  fill
                  unoptimized
                  className="object-cover"
                />

                <WishlistButton
                  studioId={studio._id}
                  className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3"
                />
              </div>

              <div className="flex flex-1 flex-col p-3 sm:p-5">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                  {studio.title}
                </h2>

                <p className="mt-1 text-xs text-pink-600 sm:text-sm">
                  {studio.category}
                </p>

                <div className="mt-2 flex items-center gap-1 text-xs sm:text-sm">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold text-gray-800">
                    {studio.rating ?? "No rating"}
                  </span>
                  {studio.rating != null && (
                    <span className="text-gray-400">/ 5</span>
                  )}
                </div>

                <div className="mt-3 space-y-1.5 text-xs text-gray-600 sm:mt-4 sm:space-y-2 sm:text-sm">
                  <p>📍 {studio.location}</p>
                  <p>👥 Capacity: {studio.maxCapacity}</p>
                  <p>💰 ${studio.hourlyRate} / hour</p>
                  <p>Deposit: ${studio.securityDeposit}</p>
                </div>

                <p className="mt-3 line-clamp-3 text-xs text-gray-500 sm:mt-4 sm:text-sm">
                  {studio.overview || "No description available."}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                  {studio.amenities?.map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-full bg-pink-50 px-2 py-1 text-[10px] text-pink-600 sm:px-3 sm:text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4">
                  <Link
                    href={`/studios/${studio._id}`}
                    className="block w-full rounded-lg bg-pink-600 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-pink-700 sm:text-sm"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
