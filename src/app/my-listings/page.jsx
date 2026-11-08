
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import StudioSkeleton from "@/components/StudioSkeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function MyListingsPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);

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
          `${process.env.NEXT_PUBLIC_API_URL}/my-listings/${email}`
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

  // Delete studio (confirmed from the modal)
  const handleDelete = async () => {
    if (!pendingDelete) return;

    const id = pendingDelete._id;

    try {
      setDeletingId(id);
      setError("");
      toast.loading("Deleting your studio...", { id: "delete-studio" });

      const { data, error: tokenError } = await authClient.token();
      const token = data?.token;

      if (tokenError || !token) {
        throw new Error("Authentication failed. Please log in again.");
      }

      const email = encodeURIComponent(session.user.email);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/studios/${id}?email=${email}`,
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

      toast.success("Studio deleted successfully!", { id: "delete-studio" });
      setPendingDelete(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Something went wrong while deleting the studio.",
        { id: "delete-studio" }
      );
      setError(error.message || "Something went wrong while deleting the studio.");
    } finally {
      setDeletingId(null);
    }
  };

  // Loading state
  if (isPending || loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb] px-3 py-6 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-6 space-y-3 sm:mb-8">
            <div className="h-3 w-28 animate-pulse rounded bg-pink-100" />
            <div className="h-8 w-56 animate-pulse rounded-lg bg-pink-100" />
            <div className="h-3 w-72 animate-pulse rounded bg-pink-50" />
          </div>

          <div className="mb-5 h-20 animate-pulse rounded-xl border border-pink-100 bg-white shadow-sm sm:mb-7" />

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <StudioSkeleton key={item} />
            ))}
          </div>
        </div>
      </main>
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
            href="/Login"
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
          <EmptyState
            icon="🏠"
            title="No studio listings yet"
            description="Your studios will appear here after you list them. Share your space and start hosting creators."
            actionHref="/add-studio"
            actionLabel="Add a Studio"
          />
        )}

        {/* Studio cards */}
        {studios.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">

            {studios.map((studio) => (
              <article
                key={studio._id}
                className="flex h-full flex-col overflow-hidden rounded-xl border border-pink-100 bg-white shadow-sm transition hover:shadow-md sm:rounded-2xl"
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
                <div className="flex flex-1 flex-col p-3 sm:p-4 md:p-5">
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
                  <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
                    <Link
                      href={`/studios/edit/${studio._id}`}
                      className="rounded-lg bg-blue-50 px-3 py-2 text-center text-xs font-semibold text-blue-600 transition hover:bg-blue-100 sm:py-2.5 sm:text-sm"
                    >
                      Update
                    </Link>

                    <button
                      type="button"
                      onClick={() => setPendingDelete(studio)}
                      disabled={deletingId === studio._id}
                      className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:py-2.5 sm:text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}

          </div>
        )}

        {/* Delete confirmation modal */}
        <Dialog
          open={!!pendingDelete}
          onOpenChange={(open) => {
            if (!open && !deletingId) setPendingDelete(null);
          }}
        >
          <DialogContent className="rounded-2xl bg-white text-gray-900 sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-gray-900">
                Delete this studio?
              </DialogTitle>

              <DialogDescription className="text-sm text-gray-600">
                You are about to permanently remove{" "}
                <span className="font-semibold text-gray-800">
                  {pendingDelete?.name || pendingDelete?.title || "this studio"}
                </span>
                . This action cannot be undone.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                disabled={!!deletingId}
                className="rounded-lg border border-pink-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-pink-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={!!deletingId}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {deletingId ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}
