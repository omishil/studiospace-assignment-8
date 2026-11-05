import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50 px-4 py-14 sm:px-6 sm:py-20"
    >
      {/* Soft background shapes (these give the glass something to blur) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/2 h-80 w-80 rounded-full bg-fuchsia-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 right-1/3 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* About Content */}
        <div>
          <span className="inline-block rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur-md sm:text-sm">
            About StudioSpace
          </span>

          <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            The Right Space for Every Creative Idea
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-600 sm:text-base">
            StudioSpace is a creative workspace marketplace that connects
            studio owners with creators looking for the perfect place to bring
            their ideas to life.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            Whether you&apos;re a photographer, filmmaker, musician, podcaster,
            or artist, finding the right workspace shouldn&apos;t be difficult.
            Our platform makes it easier to discover, explore, and book
            creative spaces in one convenient place.
          </p>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            Studio owners can list their spaces, showcase their facilities,
            manage their listings, and connect with creators. Meanwhile, users
            can explore available studios, compare their features, and manage
            their booking requests.
          </p>

          <Link
            href="/studios"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-pink-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-300/60 transition hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
          >
            Explore Studios
          </Link>
        </div>

        {/* About Image */}
        <div className="relative pb-6">
          {/* Glass frame around the image */}
          <div className="rounded-3xl border border-white/80 bg-white/50 p-2 shadow-[0_8px_32px_rgba(219,39,119,0.1)] ring-1 ring-inset ring-white/40 backdrop-blur-xl sm:p-3">
            <div className="overflow-hidden rounded-2xl">
            <Image
  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85"
  alt="Modern creative workspace"
  width={1200}
  height={800}
  className="h-64 w-full object-cover sm:h-80 lg:h-[420px]"
/>
            </div>
          </div>

          {/* Floating glass badge */}
          <div className="absolute bottom-0 left-4 rounded-2xl border border-white/80 bg-white/60 px-5 py-4 shadow-[0_8px_32px_rgba(219,39,119,0.15)] ring-1 ring-inset ring-white/40 backdrop-blur-xl sm:left-8">
            <p className="text-sm font-bold text-gray-900">One Platform</p>
            <p className="mt-1 text-xs text-gray-600">
              Endless Creative Possibilities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}