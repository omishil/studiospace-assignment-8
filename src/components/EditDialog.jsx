"use client";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function EditDialog({ studio }) {
  
  const router = useRouter();

 const handleSubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const updatedStudio = Object.fromEntries(formData.entries());

  const res = await fetch(
    `http://localhost:5000/studios/${studio._id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudio),
    }
  );
if (res.ok) {
  router.refresh();
}
  const data = await res.json();
  console.log(data);
};
  return (
    <Dialog>
      <DialogTrigger className="inline-flex items-center gap-2 rounded-lg border border-pink-800 bg-pink-100 px-4 py-2 text-sm font-semibold text-pink-800 shadow-sm transition hover:border-pink-400 hover:bg-pink-100">
  <span>✎</span>
  Edit Studio Details
</DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Studio</DialogTitle>
          <DialogDescription>
            Update your studio information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" defaultValue={studio.title} placeholder="Studio Title" className="w-full rounded-md border p-2" />

          <input name="category" defaultValue={studio.category} placeholder="Category" className="w-full rounded-md border p-2" />

          <input name="location" defaultValue={studio.location} placeholder="Location" className="w-full rounded-md border p-2" />

          <textarea name="overview" defaultValue={studio.overview} placeholder="Overview" className="w-full rounded-md border p-2" />

          <input name="maxCapacity" defaultValue={studio.maxCapacity} placeholder="Maximum Capacity" className="w-full rounded-md border p-2" />

          <input name="hourlyRate" defaultValue={studio.hourlyRate} placeholder="Hourly Rate" className="w-full rounded-md border p-2" />

          <input name="securityDeposit" defaultValue={studio.securityDeposit} placeholder="Security Deposit" className="w-full rounded-md border p-2" />

          <input name="address" defaultValue={studio.address || ""} placeholder="Address" className="w-full rounded-md border p-2" />

          <button
            type="submit"
            className="w-full rounded-md bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
          >
            Save Changes
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}