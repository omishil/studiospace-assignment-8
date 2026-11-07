
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import EmptyState from "@/components/EmptyState";
import BrandedLoader from "@/components/BrandedLoader";

export default function MyBookingsPage() {
  const { data: session, isPending } = useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);
  const [uiStatuses, setUiStatuses] = useState({});

  const customerEmail = session?.user?.email;

  // Demo-only status shown in the UI. Nothing is persisted to MongoDB.
  const getDisplayStatus = (booking) =>
    booking.status === "Cancelled"
      ? "Cancelled"
      : uiStatuses[booking._id] || "Pending";

  const handleStatusChange = (bookingId, value) => {
    setUiStatuses((previous) => {
      const next = { ...previous };

      if (value === "Pending") {
        delete next[bookingId];
      } else {
        next[bookingId] = value;
      }

      return next;
    });

    toast.success(
      value === "Pending"
        ? "Booking status reset to Pending."
        : `Booking marked as ${value}.`,
      { id: `status-${bookingId}` }
    );
  };

  // Fetch customer bookings
  useEffect(() => {
    if (!customerEmail) {
      return;
    }

    const fetchBookings = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `http://localhost:5000/bookings?email=${encodeURIComponent(customerEmail)}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch bookings");
        }

        const data = await response.json();
        setBookings(data);
      } catch (error) {
        toast.error(error.message || "Could not load your bookings.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [customerEmail]);

  // Get status badge colors
  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Confirmed":
        return "bg-green-100 text-green-700";

      case "Completed":
        return "bg-blue-100 text-blue-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  // Cancel booking
  const handleCancelBooking = async (bookingId) => {
    try {
      setCancellingId(bookingId);
      toast.loading("Cancelling your booking...", { id: "cancel-booking" });

      const response = await fetch(
        `http://localhost:5000/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: customerEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to cancel booking");
      }

      // Update booking status in React state
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? { ...booking, status: "Cancelled" }
            : booking
        )
      );

      setUiStatuses((previous) => {
        const next = { ...previous };
        delete next[bookingId];
        return next;
      });

      toast.success("Booking cancelled successfully!", {
        id: "cancel-booking",
      });
    } catch (error) {
      toast.error(error.message || "Could not cancel booking.", {
        id: "cancel-booking",
      });
    } finally {
      setCancellingId(null);
    }
  };

  // Loading state
  if (isPending || (customerEmail && loading)) {
    return (
      <main className="min-h-screen bg-[#fff8fb]">
        <BrandedLoader label="Loading your bookings..." />
      </main>
    );
  }

  // Not logged in
  if (!session?.user) {
    return (
      <main className="min-h-screen bg-[#fff8fb] px-4 py-12 text-center">
        <h1 className="text-xl font-bold text-gray-900">
          Please sign in
        </h1>

        <p className="mt-2 text-sm text-gray-600">
          Sign in to view your bookings.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">
 {/* Page Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Bookings
          </h1>

          <p className="mt-2 text-xs text-gray-600 sm:text-sm">
            Manage and track your studio reservations.
          </p>
        </div>

        {/* Booking Count */}
        <div className="mb-5 rounded-xl border border-pink-100 bg-white p-3 sm:mb-6 sm:p-4">
          <p className="text-xs text-gray-500 sm:text-sm">
            Total Bookings
          </p>

          <p className="mt-1 text-xl font-bold text-pink-700 sm:text-2xl">
            {bookings.length}
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <EmptyState
            icon="📅"
            title="No bookings yet"
            description="Your studio reservations will appear here. Find a creative space and book your next session."
            actionHref="/studios"
            actionLabel="Browse Studios"
          />
        ) : (

          /* Booking Cards */
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:gap-5">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:p-5"
              >
                {/* Card Header */}
                <div className="flex flex-wrap items-start justify-between gap-3">

                  <div className="min-w-0">
                    <h2 className="text-base font-bold text-gray-900 sm:text-lg">
                      {booking.studioTitle}
                    </h2>
                  </div>

                  {/* Status Badge + demo dropdown */}
                  <div className="flex shrink-0 flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold sm:text-xs ${getStatusStyle(getDisplayStatus(booking))}`}
                    >
                      {getDisplayStatus(booking)}
                    </span>

                    {getDisplayStatus(booking) !== "Cancelled" && (
                      <select
                        value={getDisplayStatus(booking)}
                        onChange={(event) =>
                          handleStatusChange(booking._id, event.target.value)
                        }
                        aria-label={`Update status for ${booking.studioTitle} (demo only)`}
                        className="rounded-full border border-pink-200 bg-white px-2 py-1 text-[10px] font-semibold text-gray-700 outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100 dark:border-pink-900/60 dark:bg-[#241820] dark:text-pink-100 sm:text-xs"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    )}
                  </div>

                </div>

                <div className="my-4 border-t border-gray-100" />

                {/* Booking Information */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">

                  <div>
                    <p className="text-[11px] text-gray-500 sm:text-xs">
                      Booking Date
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-900 sm:text-sm">
                      {booking.bookingDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-500 sm:text-xs">
                      Time
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-900 sm:text-sm">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-500 sm:text-xs">
                      Customer
                    </p>

                    <p className="mt-1 text-xs font-semibold text-gray-900 sm:text-sm">
                      {booking.customerName}
                    </p>
                  </div>

                  <div>
                    <p className="text-[11px] text-gray-500 sm:text-xs">
                      Total Price
                    </p>

                    <p className="mt-1 text-base font-bold text-pink-700 sm:text-lg">
                      ${Number(booking.totalPrice).toFixed(2)}
                    </p>
                  </div>

                </div>

                {/* Cancel Booking Button */}
                {getDisplayStatus(booking) === "Pending" && (
                  <button
                    onClick={() => handleCancelBooking(booking._id)}
                    disabled={cancellingId === booking._id}
                    className="mt-5 w-full rounded-lg bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 sm:text-sm"
                  >
                    {cancellingId === booking._id
                      ? "Cancelling..."
                      : "Cancel Booking"}
                  </button>
                )}

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}
