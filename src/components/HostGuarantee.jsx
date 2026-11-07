const guarantees = [
  {
    icon: "🛡️",
    title: "Liability Protection",
    description:
      "Every confirmed booking is covered by StudioSpace damage protection, so hosts and creators can work with confidence.",
  },
  {
    icon: "✅",
    title: "Verified Profiles",
    description:
      "Hosts and creators verify their identity before their first booking, keeping the community trusted and accountable.",
  },
  {
    icon: "🎥",
    title: "Equipment Safety",
    description:
      "Studios list their gear and safety details up front. If something goes wrong on set, our team helps mediate fairly.",
  },
  {
    icon: "🕑",
    title: "24/7 Creator Support",
    description:
      "Real people are available any hour for booking questions, cancellations, and last-minute on-set emergencies.",
  },
];

export default function HostGuarantee() {
  return (
    <section
      id="guarantee"
      className="scroll-mt-20 bg-[#fff8fb] px-4 py-14 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-14">
          <span className="inline-block rounded-full bg-pink-100 px-4 py-1.5 text-xs font-semibold text-pink-700 sm:text-sm">
            Peace of Mind
          </span>

          <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-gray-900 sm:text-3xl md:text-4xl">
            Host Guarantee &amp; Creator Support
          </h2>

          <p className="mt-4 text-sm leading-7 text-gray-600 sm:text-base">
            StudioSpace protects both sides of every booking, from the first
            message to the final wrap.
          </p>
        </div>

        {/* Guarantee Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {guarantees.map((item) => (
            <article
              key={item.title}
              className="flex h-full flex-col rounded-2xl border border-pink-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl">
                {item.icon}
              </span>

              <h3 className="mt-4 text-base font-bold text-gray-900 sm:text-lg">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-600 sm:text-sm">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
