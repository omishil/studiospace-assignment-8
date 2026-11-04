import Heroslider from "@/components/Heroslider";
import StudiosPage from "./studios/page";

export default function Home() {
  return (
    <div className="bg-[#fff8fb]">
      <Heroslider />
{/* studios section in home page */}
      <section className="mx-auto max-w-6xl px-3 py-8 sm:px-6 sm:py-12">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Find Your Perfect Creative Space
        </h2>

        <p className="mt-2 text-xs text-gray-500 sm:text-sm">
          Explore unique studios and bring your creative ideas to life.
        </p>

        <div className="mt-6">
          <StudiosPage></StudiosPage>
        </div>
      </section>
    </div>
  );
}