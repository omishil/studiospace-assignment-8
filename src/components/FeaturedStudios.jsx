"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import EmptyState from "@/components/EmptyState";
import StudioSkeleton from "@/components/StudioSkeleton";
import WishlistButton from "@/components/wishlist-button";

export default function FeaturedStudios() {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadFeaturedStudios = async () => {
      try {
        const response = await fetch(`${API_URL}/featured-studios`);

        if (!response.ok) {
          throw new Error("Could not load featured studios");
        }

        const data = await response.json();
        if (active) setStudios(Array.isArray(data) ? data : []);
      } catch (loadError) {
        if (active) {
          setError(loadError.message || "Could not load featured studios");
          toast.error(loadError.message || "Could not load featured studios.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadFeaturedStudios();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <StudioSkeleton key={item} />
        ))}
      </div>
    );
  }

  if (error || studios.length === 0) {
    return (
      <EmptyState
        icon="🎬"
        title={error ? "Could not load featured studios" : "No studios featured yet"}
        description={
          error
            ? "Please refresh the page or browse all studios instead."
            : "New and top-rated spaces will appear here as hosts list them."
        }
        actionHref="/studios"
        actionLabel="Browse All Studios"
        secondaryHref="/add-studio"
        secondaryLabel="List Your Studio"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
      {studios.map((studio) => (
        <article
          key={studio._id}
          className="flex h-full flex-col overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md sm:rounded-2xl"
        >
          <div className="relative h-40 w-full sm:h-48">
            <Image
              src={studio.image || studio.images?.[0] || "/file.svg"}
              alt={studio.title || "Studio"}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />

            <span className="absolute left-2 top-2 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold text-pink-700 shadow-sm backdrop-blur sm:left-3 sm:top-3 sm:text-xs">
              {studio.category || "Studio"}
            </span>

            <WishlistButton
              studioId={studio._id}
              className="absolute right-2 top-2 z-10 sm:right-3 sm:top-3"
            />
          </div>

          <div className="flex flex-1 flex-col p-3 sm:p-5">
            <div className="flex items-start justify-between gap-2">
              <h3 className="line-clamp-1 text-base font-bold text-gray-900 sm:text-lg">
                {studio.title || "Untitled Studio"}
              </h3>

              <span className="flex shrink-0 items-center gap-1 rounded-full bg-pink-50 px-2 py-1 text-[10px] font-semibold text-pink-700 sm:text-xs">
                <span className="text-yellow-500">★</span>
                {studio.rating ?? "New"}
              </span>
            </div>

            <p className="mt-2 text-xs text-gray-500 sm:text-sm">
              📍 {studio.location || "Location not specified"}
            </p>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              👥 Up to {studio.maxCapacity ?? "—"} people
            </p>

            <p className="mt-3 text-base font-bold text-pink-600 sm:text-lg">
              ${studio.hourlyRate ?? "—"}
              <span className="text-xs font-normal text-gray-500 sm:text-sm">
                {" "}/ hr
              </span>
            </p>

            <Link
              href={`/studios/${studio._id}`}
              className="mt-auto block w-full rounded-lg bg-pink-600 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-pink-700 sm:mt-5 sm:text-sm"
            >
              View Details →
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
