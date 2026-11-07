import BrandedLoader from "@/components/BrandedLoader";

export default function AddStudioLoading() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8fb]">
      <BrandedLoader label="Preparing your studio form..." />
    </main>
  );
}
