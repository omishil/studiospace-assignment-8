"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import StudioSkeleton from "@/components/StudioSkeleton";
import Link from "next/link";
export default function Studios({ limit }) {
  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudios = async () => {
      try {
        const res = await fetch("http://localhost:5000/studios");
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

  const visibleStudios = limit ? studios.slice(0, limit) : studios;

  return (
    <>
      {loading ? (
        <div className="grid grid-cols-1 gap-3 px-4 py-6 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-3 lg:px-8">
          {[1, 2, 3, 4, 5, 6]
            .slice(0, limit || 6)
            .map((item) => (
              <StudioSkeleton key={item} />
            ))}
        </div>
      ) : visibleStudios.length === 0 ? (
        <p className="px-4 py-6 text-sm text-gray-500">
          No studios found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 px-4 py-6 sm:grid-cols-2 sm:gap-5 sm:px-6 sm:py-8 lg:grid-cols-3 lg:px-8">
          {visibleStudios.map((studio) => (
            <Link
  href={`/studios/${studio._id}`}
  key={studio._id}
  className="block overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition hover:shadow-md sm:rounded-2xl"
>
              {/* Studio Image */}
              <div className="relative h-36 w-full sm:h-48">
                <Image
                  src={studio.image}
                  alt={studio.title}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>

              <div className="p-3 sm:p-5">
                <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                  {studio.title}
                </h2>

                <p className="mt-1 text-xs text-pink-600 sm:text-sm">
                  {studio.category}
                </p>

                {/* Rating */}
                <div className="mt-2 flex items-center gap-1 text-xs sm:text-sm">
                  <span className="text-yellow-500">★</span>
                  <span className="font-semibold text-gray-800">
                    {studio.rating}
                  </span>
                  <span className="text-gray-400">/ 5</span>
                </div>

                {/* Studio Information */}
                <div className="mt-3 space-y-1.5 text-xs text-gray-600 sm:mt-4 sm:space-y-2 sm:text-sm">
                  <p>📍 {studio.location}</p>
                  <p>👥 Capacity: {studio.maxCapacity}</p>
                  <p>💰 ${studio.hourlyRate} / hour</p>
                  <p>Deposit: ${studio.securityDeposit}</p>
                </div>

                {/* Overview */}
                <p className="mt-3 line-clamp-3 text-xs text-gray-500 sm:mt-4 sm:text-sm">
                  {studio.overview}
                </p>

                {/* Amenities */}
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
              </div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}