
"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";

export default function MyBookingsPage() {
  const { data: session } = useSession();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const customerEmail = session?.user?.email;

  useEffect(() => {
    if (!customerEmail) {
      setLoading(false);
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
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [customerEmail]);

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
  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb] px-4 py-12 text-center">
        <p className="text-gray-600">Loading your bookings...</p>
      </main>
    );
  }

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
//  handle cancel booking func
const handleCancelBooking = async (bookingId) => {
  try {
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
      throw new Error(data.message);
    }

    // Update the booking in React state
    setBookings((previousBookings) =>
      previousBookings.map((booking) =>
        booking._id === bookingId
          ? { ...booking, status: "Cancelled" }
          : booking
      )
    );

    toast.success("Booking cancelled successfully!");
  } catch (error) {
    toast.error(error.message);
  }
};

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            My Bookings
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            Manage and track your studio reservations.
          </p>
        </div>

        {/* Booking Count */}
        <div className="mb-6 rounded-xl border border-pink-100 bg-white p-4">
          <p className="text-sm text-gray-500">
            Total Bookings
          </p>

          <p className="mt-1 text-2xl font-bold text-pink-700">
            {bookings.length}
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="rounded-2xl border border-pink-100 bg-white px-4 py-16 text-center">
            <h2 className="text-lg font-bold text-gray-900">
              No bookings yet
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Your studio reservations will appear here.
            </p>
          </div>
        ) : (

          /* Booking Cards */
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">

                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {booking.studioTitle}
                    </h2>

                    <p className="mt-1 text-xs text-gray-500">
                      Booking ID: {booking._id}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(booking.status)}`}
                  >
                    {booking.status}
                  </span>

                </div>

                <div className="my-4 border-t border-gray-100" />

                <div className="grid grid-cols-2 gap-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Booking Date
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {booking.bookingDate}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {booking.startTime} - {booking.endTime}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Customer
                    </p>

                    <p className="mt-1 text-sm font-semibold text-gray-900">
                      {booking.customerName}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Total Price
                    </p>

                    <p className="mt-1 text-lg font-bold text-pink-700">
                      ${Number(booking.totalPrice).toFixed(2)}
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </main>
  );
}
