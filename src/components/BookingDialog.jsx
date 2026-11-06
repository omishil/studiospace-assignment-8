"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useSession, authClient } from "@/lib/auth-client";import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function BookingDialog({ studio }) {
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [loading, setLoading] = useState(false);

  const customerName = session?.user?.name || "";
  const customerEmail = session?.user?.email || "";

  const calculatePrice = () => {
    if (!startTime || !endTime || endTime <= startTime) {
      return 0;
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    const hours = (end - start) / 60;

    return hours * Number(studio.hourlyRate);
  };

  const totalPrice = calculatePrice();

  const handleBooking = async (e) => {




    e.preventDefault();

    if (!session?.user) {
      toast.error("Please sign in before booking.");
      return;
    }

    if (!bookingDate || !startTime || !endTime) {
      toast.error("Please complete all booking fields.");
      return;
    }

    if (new Date(`${bookingDate}T00:00:00`) < new Date(new Date().toDateString())) {
      toast.error("Please select a future date.");
      return;
    }

    if (totalPrice <= 0) {
      toast.error("Please select a valid time range.");
      return;
    }

    try {
      setLoading(true);
 // Get JWT token
  const { data, error } = await authClient.token();
  const token = data?.token;
if (error || !token) {
    throw new Error("Authentication failed. Please sign in again.");
  }

      const response = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
            authorization: `Bearer ${token}`,

        },
        body: JSON.stringify({
          studioId: studio._id,
          customerName,
          customerEmail,
          bookingDate,
          startTime,
          endTime,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Booking failed");
      }

      toast.success("Booking submitted successfully!");

      setOpen(false);
      setBookingDate("");
      setStartTime("");
      setEndTime("");
    } catch (error) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="mt-6 w-full rounded-xl bg-pink-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-800">
        Book Workspace Now
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-2xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Book Your Workspace
          </DialogTitle>

          <DialogDescription>
            Reserve {studio.title} for your next creative project.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Customer Name
            </label>
            <input
              value={customerName}
              readOnly
              className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Email Address
            </label>
            <input
              value={customerEmail}
              readOnly
              className="w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Booking Date
            </label>
            <input
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
              className="w-full rounded-lg border px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                required
                className="w-full rounded-lg border px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="rounded-xl bg-pink-50 p-4">
            <p className="text-sm text-gray-600">
              Hourly Rate: ${studio.hourlyRate}
            </p>

            <p className="mt-1 text-lg font-bold text-pink-700">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>

          <DialogFooter>
            <button
              type="submit"
              disabled={loading || !session?.user || totalPrice <= 0}
              className="w-full rounded-xl bg-pink-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-pink-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}