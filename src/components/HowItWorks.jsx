import Link from "next/link";

const steps = [
  {
    number: "01",
    title: "Discover Spaces",
    description:
      "Explore a variety of creative studios. Compare locations, prices, and amenities to find the perfect space for your project.",
    icon: "m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z",
  },
  {
    number: "02",
    title: "Choose Your Schedule",
    description:
      "Select your preferred studio and choose the booking hours that fit your creative schedule.",
    icon: "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5",
  },
  {
    number: "03",
    title: "Book Your Studio",
    description:
      "Submit your booking request and wait for the host to review and confirm your reservation.",
    icon: "M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  },
  {
    number: "04",
    title: "Create & Produce",
    description:
      "Track your booking status and get ready to bring your creative ideas to life in your chosen space.",
    icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="howitworks"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50 px-4 py-14 sm:px-6 sm:py-20"
    >
      {/* Soft background shapes (these give the glass something to blur) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-pink-300/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-fuchsia-200/50 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-rose-200/50 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
          <span className="inline-block rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-xs font-semibold text-pink-700 shadow-sm backdrop-blur-md sm:text-sm">
            Simple Process
          </span>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            How StudioSpace Works
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
            Finding and booking your perfect creative space has never been
            easier. Just follow these four simple steps.
          </p>
        </div>

        {/* Booking Steps */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative overflow-hidden rounded-2xl border border-white/80 bg-white/50 p-6 shadow-[0_8px_32px_rgba(219,39,119,0.08)] ring-1 ring-inset ring-white/40 backdrop-blur-xl transition duration-300 hover:bg-white/70 hover:shadow-[0_12px_40px_rgba(219,39,119,0.14)] sm:p-7"
            >
              {/* Large faded step number */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute right-5 top-4 select-none text-5xl font-bold text-pink-200/60 transition group-hover:text-pink-300/60"
              >
                {step.number}
              </span>

              {/* Icon */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/80 bg-pink-100/70 text-pink-600 shadow-sm backdrop-blur-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={step.icon}
                  />
                </svg>
              </div>

              <h3 className="relative mt-6 text-lg font-bold text-gray-900">
                {step.title}
              </h3>

              <p className="relative mt-2 text-sm leading-6 text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Studio Owner Section */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/80 bg-white/40 px-6 py-10 shadow-[0_8px_32px_rgba(219,39,119,0.1)] ring-1 ring-inset ring-white/40 backdrop-blur-xl sm:mt-16 sm:px-10 sm:py-12 lg:px-14">
          {/* Color behind the glass panel */}
          <div
            aria-hidden="true"
            className="absolute -right-10 -top-16 h-56 w-56 rounded-full bg-pink-300/50 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-16 left-10 h-48 w-48 rounded-full bg-fuchsia-200/60 blur-3xl"
          />

          <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Have a Creative Space?
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base sm:leading-7">
                Turn your studio into an opportunity. List your space, manage
                your studio listings, and connect with creators looking for the
                perfect workspace.
              </p>
            </div>

            <Link
              href="/add-studio"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-pink-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-300/60 transition hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 focus-visible:ring-offset-2"
            >
              Become a Host
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}