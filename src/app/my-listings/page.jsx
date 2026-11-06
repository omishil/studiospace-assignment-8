
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // Fetch user's studio listings
  useEffect(() => {
    const fetchMyListings = async () => {
      if (isPending) return;

      if (!session?.user?.email) {
        setStudios([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const email = encodeURIComponent(session.user.email);

        const response = await fetch(
          `http://localhost:5000/my-listings/${email}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch your listings");
        }

        const data = await response.json();
        setStudios(data);
      } catch (error) {
        console.error(error);
        setError("Could not load your studio listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchMyListings();
  }, [session, isPending]);

  // Delete studio
  const handleDelete = async (id) => {
    try {
      setDeletingId(id);
      setError("");

      const { data, error: tokenError } = await authClient.token();
      const token = data?.token;

      if (tokenError || !token) {
        throw new Error("Authentication failed. Please log in again.");
      }

      const email = encodeURIComponent(session.user.email);

      const response = await fetch(
        `http://localhost:5000/studios/${id}?email=${email}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete studio.");
      }

      setStudios((currentStudios) =>
        currentStudios.filter((studio) => studio._id !== id)
      );

      router.refresh();
    } catch (error) {
      console.error(error);
      setError(error.message || "Something went wrong while deleting the studio.");
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-3">
        <p className="text-xs text-gray-500 sm:text-sm">
          Loading your listings...
        </p>
      </div>
    );
  }

  // Logged-out state
  if (!session?.user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-3">
        <div className="w-full max-w-md rounded-xl border border-pink-100 bg-white p-5 text-center shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-gray-800 sm:text-xl">
            Please log in
          </h2>

          <p className="mt-2 text-xs text-gray-500 sm:text-sm">
            Log in to view your studio listings.
          </p>

          <Link
            href="/login"
            className="mt-5 inline-block rounded-lg bg-pink-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-pink-700 sm:text-sm"
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

        {/* Page heading */}
        <div className="mb-6 sm:mb-8">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-pink-600 sm:text-xs md:text-sm">
            Host Dashboard
          </p>

          <h1 className="mt-1.5 text-xl font-bold text-gray-900 sm:mt-2 sm:text-2xl md:text-3xl">
            My Studio Listings
          </h1>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm md:text-base">
            View and manage all the studios you have listed on StudioSpace.
          </p>
        </div>

        {/* Listing count */}
        <div className="mb-5 rounded-xl border border-pink-100 bg-white p-3 shadow-sm sm:mb-7 sm:p-5">
          <p className="text-xs text-gray-500 sm:text-sm">
            Total Listed Studios
          </p>

          <p className="mt-1 text-xl font-bold text-pink-600 sm:text-2xl">
            {studios.length}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 sm:p-4 sm:text-sm">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!error && studios.length === 0 && (
          <div className="rounded-xl border border-pink-100 bg-white px-4 py-10 text-center shadow-sm sm:py-14">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-pink-50 text-xl text-pink-500 sm:h-14 sm:w-14 sm:text-2xl">
              +
            </div>

            <h2 className="mt-4 text-base font-semibold text-gray-800 sm:text-lg">
              No studio listings yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-xs leading-relaxed text-gray-500 sm:text-sm">
              Your studios will appear here after you list them.
            </p>

            <Link
              href="/add-studio"
              className="mt-5 inline-block rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-pink-700 sm:text-sm"
            >
              Add a Studio
            </Link>
          </div>
        )}

        {/* Studio cards */}
        {studios.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

            {studios.map((studio) => (
              <article
                key={studio._id}
                className="overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition hover:shadow-md sm:rounded-2xl"
              >
                {/* Studio image */}
                <Link
                  href={`/studios/${studio._id}`}
                  className="group relative block aspect-[16/9] overflow-hidden bg-pink-50"
                >
                  {studio.image || studio.images?.[0] ? (
                    <Image
                      src={studio.image || studio.images[0]}
                      alt={studio.name || studio.title || "Studio"}
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

                {/* Studio information */}
                <div className="p-3 sm:p-4 md:p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link
                        href={`/studios/${studio._id}`}
                        className="line-clamp-1 text-sm font-semibold text-gray-800 transition hover:text-pink-600 sm:text-base"
                      >
                        {studio.name || studio.title || "Untitled Studio"}
                      </Link>

                      <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                        {studio.category || "N/A"}
                      </p>
                    </div>

                    <span className="shrink-0 rounded-lg bg-pink-50 px-2 py-1 text-[10px] font-semibold text-pink-600 sm:text-xs">
                      Listed
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mt-3 border-t border-gray-100 pt-3">
                    <p className="text-[10px] text-gray-500 sm:text-xs">
                      Hourly Rate
                    </p>

                    <p className="mt-0.5 text-base font-bold text-gray-900 sm:text-lg">
                      ${studio.price || studio.hourlyRate || "N/A"}
                      <span className="text-[10px] font-normal text-gray-500 sm:text-xs">
                        {" "}/ hour
                      </span>
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href={`/studios/edit/${studio._id}`}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-center text-xs font-semibold text-blue-600 transition hover:bg-blue-100 sm:py-2.5 sm:text-sm"
                    >
                      Update
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(studio._id)}
                      disabled={deletingId === studio._id}
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2.5 sm:text-sm"
                    >
                      {deletingId === studio._id ? "Deleting..." : "Delete"}
                    </button>
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
