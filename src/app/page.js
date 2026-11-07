
import Heroslider from "@/components/Heroslider";
import StudiosPage from "./studios/page";
import HowItWorks from "@/components/HowItWorks";
import HostGuarantee from "@/components/HostGuarantee";
import AboutUs from "@/AboutUs";
import StudioCategories from "@/components/StudioCategories";

export default function Home() {
  return (
    <div className="bg-[#fff8fb]">
      <Heroslider />

  {/* Browse by Studio Categories */}
      <StudioCategories />


      {/* Featured studios section */}
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-6 text-left sm:mb-8">
          <span className="inline-flex items-center rounded-full bg-pink-300 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-pink-700 sm:text-xs dark:bg-pink-900/40 dark:text-pink-200">
            ★ Top 6 Featured Studios
          </span>

          <h2 className="mt-3 text-xl font-bold leading-tight text-gray-900 sm:text-3xl">
            Find Your Perfect Creative Space
          </h2>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-gray-500 sm:text-sm">
            Explore our six highest-rated studios, featuring unique spaces
            for photography, music, events, and other creative projects.
          </p>
        </div>

        <StudiosPage limit={6} />
      </section>
      {/* how it works section */}
      <HowItWorks id="howitworks"></HowItWorks>
      {/* host guarantee section */}
      <HostGuarantee />
      {/* about us */}
      <AboutUs></AboutUs>
    </div>
  );
}
