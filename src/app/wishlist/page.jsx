"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useSession } from "@/lib/auth-client";
import { API_URL } from "@/lib/api";
import BrandedLoader from "@/components/BrandedLoader";
import EmptyState from "@/components/EmptyState";
import StudioSkeleton from "@/components/StudioSkeleton";
import WishlistButton from "@/components/wishlist-button";

export default function WishlistPage() {
  const { data: session, isPending } = useSession();
  const email = session?.user?.email;

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending || !email) return;

    let active = true;

    const loadWishlist = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${API_URL}/wishlist?email=${encodeURIComponent(email)}`
        );

        if (!response.ok) {
          throw new Error("Could not load your wishlist");
        }

        const data = await response.json();
        if (active) setStudios(Array.isArray(data) ? data : []);
      } catch (error) {
        if (active) {
          toast.error(error.message || "Could not load your wishlist.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadWishlist();

    return () => {
      active = false;
    };
  }, [email, isPending]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#fff8fb]">
        <BrandedLoader label="Loading your wishlist..." />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-pink-100 bg-white p-6 text-center shadow-sm">
          <h1 className="text-lg font-bold text-gray-900">Please log in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to view the studios you saved.
          </p>
          <Link
            href="/Login?callbackUrl=%2Fwishlist"
            className="mt-5 inline-block rounded-lg bg-pink-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
          >
            Log In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] px-3 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-pink-600 sm:text-xs md:text-sm">
            Your Collection
          </p>

          <h1 className="mt-1.5 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl md:text-3xl">
            Saved Studios
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm md:text-base">
            Studios you bookmarked for later. Only you can see this list.
          </p>
        </div>

        <div className="mb-5 rounded-xl border border-pink-100 bg-white p-3 shadow-sm sm:mb-7 sm:p-5">
          <p className="text-xs text-gray-500 sm:text-sm">Saved Studios</p>
          <p className="mt-1 text-xl font-bold text-pink-600 sm:text-2xl">
            {studios.length}
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <StudioSkeleton key={item} />
            ))}
          </div>
        ) : studios.length === 0 ? (
          <EmptyState
            icon="🔖"
            title="Your wishlist is empty"
            description="Bookmark studios you love and they will appear here for easy access later."
            actionHref="/studios"
            actionLabel="Browse Studios"
          />
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="relative flex h-full flex-col overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition hover:shadow-md sm:rounded-2xl"
              >
                <Link
                  href={`/studios/${studio._id}`}
                  className="group relative block aspect-[16/9] overflow-hidden bg-pink-50"
                >
                  {studio.image || studio.images?.[0] ? (
                    <Image
                      src={studio.image || studio.images[0]}
                      alt={studio.title || "Studio"}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-pink-500 sm:text-sm">
                      No Image Available
                    </div>
                  )}
                </Link>

                <WishlistButton
                  studioId={studio._id}
                  className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3"
                  onToggle={(studioId, nowSaved) => {
                    if (!nowSaved) {
                      setStudios((previous) =>
                        previous.filter(
                          (item) => String(item._id) !== String(studioId)
                        )
                      );
                    }
                  }}
                />

                <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/studios/${studio._id}`}
                        className="line-clamp-1 text-sm font-semibold text-gray-800 transition hover:text-pink-600 sm:text-base"
                      >
                        {studio.title || "Untitled Studio"}
                      </Link>

                      <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                        {studio.category || "N/A"}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg bg-pink-50 px-2 py-1 text-[10px] font-semibold text-pink-600 sm:text-xs">
                      Saved
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-1 text-xs sm:text-sm">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-800">
                      {studio.rating ?? "No rating"}
                    </span>
                    {studio.rating != null && (
                      <span className="text-gray-400">/ 5</span>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                    📍 {studio.location}
                  </p>

                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <p className="text-[10px] text-gray-500 sm:text-xs">
                      Hourly Rate
                    </p>
                    <p className="mt-0.5 text-base font-bold text-gray-900 sm:text-lg">
                      ${studio.hourlyRate ?? "N/A"}
                      <span className="text-[10px] font-normal text-gray-500 sm:text-xs">
                        {" "}/ hour
                      </span>
                    </p>
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
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
