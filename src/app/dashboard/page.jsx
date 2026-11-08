"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { toast } from "sonner";
import BrandedLoader from "@/components/BrandedLoader";

const quickActions = [
  {
    href: "/add-studio",
    label: "Add New Studio",
    description: "List a new creative space for creators to book.",
    icon: "🏠",
  },
  {
    href: "/my-listings",
    label: "My Studio Listings",
    description: "Update or remove the studios you already host.",
    icon: "🎬",
  },
  {
    href: "/my-bookings",
    label: "My Bookings",
    description: "Track reservations and cancel pending slots.",
    icon: "📅",
  },
  {
    href: "/studios",
    label: "Explore Studios",
    description: "Discover spaces for your next creative project.",
    icon: "🔍",
  },
];

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

export default function DashboardPage() {
  const { data: session, isPending } = useSession();

  const [studios, setStudios] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = session?.user?.email;

  useEffect(() => {
    if (isPending) return;

    if (!email) {
      return;
    }

    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const [studiosRes, bookingsRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listings/${encodeURIComponent(email)}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings?email=${encodeURIComponent(email)}`),
        ]);

        if (studiosRes.ok) {
          setStudios(await studiosRes.json());
        }

        if (bookingsRes.ok) {
          setBookings(await bookingsRes.json());
        }
      } catch (error) {
        console.error(error);
        toast.error("Could not load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [email, isPending]);

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#fff8fb]">
        <BrandedLoader label="Loading your dashboard..." />
      </main>
    );
  }

  if (!session?.user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border border-pink-100 bg-white p-6 text-center shadow-sm">
          <h1 className="text-lg font-bold text-gray-900">Please log in</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to view your host dashboard.
          </p>
          <Link
            href="/Login"
            className="mt-5 inline-block rounded-lg bg-pink-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-pink-700"
          >
            Log In
          </Link>
        </div>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#fff8fb]">
        <BrandedLoader label="Loading your dashboard..." />
      </main>
    );
  }

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "Pending"
  ).length;
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "Confirmed"
  ).length;

  const stats = [
    { label: "My Studios", value: studios.length, icon: "🏠" },
    { label: "Total Bookings", value: bookings.length, icon: "📅" },
    { label: "Pending Requests", value: pendingBookings, icon: "⏳" },
    { label: "Confirmed", value: confirmedBookings, icon: "✅" },
  ];

  const recentBookings = [...bookings].slice(0, 4);

  return (
    <main className="min-h-screen bg-[#fff8fb] px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-7 sm:mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-pink-600">
            Dashboard
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome back, {session.user.name?.split(" ")[0] || "Creator"}!
          </h1>
          <p className="mt-2 max-w-xl text-sm text-gray-600">
            Here is a quick overview of your studios and reservations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-pink-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <span className="text-xl sm:text-2xl">{stat.icon}</span>
              <p className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <section className="mt-8">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            Quick Actions
          </h2>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.href}
                href={action.href}
                className="group flex items-start gap-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-pink-300 hover:shadow-md sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50 text-xl">
                  {action.icon}
                </span>

                <span className="min-w-0">
                  <span className="flex items-center gap-2 text-sm font-semibold text-gray-900 sm:text-base">
                    {action.label}
                    <span className="text-pink-500 transition group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-gray-500 sm:text-sm">
                    {action.description}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent bookings */}
        <section className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
              Recent Bookings
            </h2>

            <Link
              href="/my-bookings"
              className="text-xs font-semibold text-pink-600 transition hover:text-pink-800 sm:text-sm"
            >
              View all
            </Link>
          </div>

          {recentBookings.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-pink-100 bg-white p-6 text-center shadow-sm">
              <p className="text-2xl">📅</p>
              <p className="mt-2 text-sm font-semibold text-gray-800">
                No bookings yet
              </p>
              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Once you book a studio, it will show up here.
              </p>
              <Link
                href="/studios"
                className="mt-4 inline-block rounded-lg bg-pink-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-pink-700 sm:text-sm"
              >
                Browse Studios
              </Link>
            </div>
          ) : (
            <div className="mt-4 overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm">
              {recentBookings.map((booking, index) => (
                <div
                  key={booking._id}
                  className={`flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 ${
                    index > 0 ? "border-t border-gray-100" : ""
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-900">
                      {booking.studioTitle}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {booking.bookingDate} · {booking.startTime} -{" "}
                      {booking.endTime}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold sm:text-xs ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
