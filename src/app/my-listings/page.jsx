
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "@/lib/auth-client";

export default function MyListingsPage() {
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  // Loading state
  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500 sm:text-base">
          Loading your listings...
        </p>
      </div>
    );
  }

  // Logged-out state
  if (!session?.user) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Please log in
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Log in to view your studio listings.
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-pink-600 sm:text-sm">
            Host Dashboard
          </p>

          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            My Studio Listings
          </h1>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            View all the studios you have listed on StudioSpace.
          </p>
        </div>

        {/* Listing count */}
        <div className="mb-5 rounded-xl border border-pink-100 bg-white p-4 shadow-sm sm:mb-6 sm:p-5">
          <p className="text-sm text-gray-500">
            Total Listed Studios
          </p>

          <p className="mt-1 text-2xl font-bold text-pink-600">
            {studios.length}
          </p>
        </div>

        {/* Error message */}
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Empty state */}
        {!error && studios.length === 0 && (
          <div className="rounded-xl border border-pink-100 bg-white px-4 py-12 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800">
              No studio listings yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your studios will appear here after you list them.
            </p>
          </div>
        )}

        {/* Studio table */}
        {studios.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-pink-100 bg-white shadow-sm">
            <table className="w-full min-w-[650px] text-left">

              {/* Table heading */}
              <thead className="bg-pink-50 text-xs uppercase text-gray-600 sm:text-sm">
                <tr>
                  <th className="px-4 py-4">
                    Studio Details
                  </th>

                  <th className="px-4 py-4 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Studio data */}
              <tbody className="divide-y divide-gray-100">
                {studios.map((studio) => (
                  <tr
                    key={studio._id}
                    className="transition hover:bg-pink-50/40"
                  >

                    {/* Studio information */}
                   
<td className="px-4 py-4">
  <a
    href={`/studios/${studio._id}`}
    className="group flex items-center gap-3"
  >
    {studio.image || studio.images?.[0] ? (
      <Image
        src={studio.image || studio.images[0]}
        alt={studio.name || "Studio"}
        width={56}
        height={56}
        className="h-12 w-12 rounded-lg object-cover transition group-hover:opacity-80 sm:h-14 sm:w-14"
      />
    ) : (
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 text-xs text-pink-600">
        No Image
      </div>
    )}

    <div>
      <p className="text-sm font-semibold text-gray-800 transition group-hover:text-pink-600 sm:text-base">
        {studio.name || studio.title || "Untitled Studio"}
      </p>

      <p className="mt-1 text-xs text-gray-500 sm:text-sm">
        {studio.category || "N/A"} • $
        {studio.price || studio.hourlyRate || "N/A"}/hr
      </p>

      <p className="mt-1 text-xs text-pink-600">
        View studio details →
      </p>
    </div>
  </a>
</td>

                    {/* Action buttons */}
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-2">

                        <button
                          type="button"
                          className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-100 sm:text-sm"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 sm:text-sm"
                        >
                          Delete
                        </button>

                        <button
                          type="button"
                          className="rounded-lg bg-green-50 px-3 py-2 text-xs font-semibold text-green-600 transition hover:bg-green-100 sm:text-sm"
                        >
                          Update
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </main>
  );
}
