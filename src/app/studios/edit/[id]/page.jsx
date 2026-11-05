
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
  "Sound Stage",
  "Art Studio",
  "Other",
];

const availableAmenities = [
  "Wi-Fi",
  "Air Conditioning",
  "Lighting Equipment",
  "Camera Equipment",
  "Sound System",
  "Parking",
  "Restroom",
  "Changing Room",
  "Makeup Room",
  "Kitchen",
  "Furniture",
  "Green Screen",
];

const inputClass =
  "focus-visible:border-pink-500 focus-visible:ring-pink-100";

const cardClass = "rounded-2xl border-pink-100 shadow-sm";

export default function UpdateStudioPage() {
  const { id } = useParams();
  const router = useRouter();

  const [studio, setStudio] = useState(null);
  const [category, setCategory] = useState("");
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch existing studio information
  useEffect(() => {
    const fetchStudio = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/studios/${id}`
        );

        if (!res.ok) {
          throw new Error("Failed to fetch studio");
        }

        const data = await res.json();

        setStudio(data);
        setCategory(data.category || "");
        setAmenities(data.amenities || []);
      } catch (error) {
        console.error(error);
        toast.error("Could not load studio information.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStudio();
    }
  }, [id]);

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studio) return;

    try {
      setSaving(true);

      const formData = new FormData(e.target);
      const updatedStudio = Object.fromEntries(
        formData.entries()
      );

      updatedStudio.category = category;
      updatedStudio.amenities = amenities;

      updatedStudio.maxCapacity = Number(
        updatedStudio.maxCapacity
      );

      updatedStudio.rating = Number(updatedStudio.rating);
      updatedStudio.hourlyRate = Number(
        updatedStudio.hourlyRate
      );

      updatedStudio.securityDeposit = Number(
        updatedStudio.securityDeposit
      );

      // Keep existing images unless new images are selected
      const existingImages = studio.images?.length
        ? studio.images
        : studio.image
          ? [studio.image]
          : [];

      const uploadedImages = [];

      for (const image of images) {
        const imageFormData = new FormData();
        imageFormData.append("image", image);

        const uploadRes = await fetch(
          "http://localhost:5000/upload-image",
          {
            method: "POST",
            body: imageFormData,
          }
        );

        const uploadData = await uploadRes.json();

        if (!uploadRes.ok) {
          throw new Error("Image upload failed");
        }

        uploadedImages.push(uploadData.imageUrl);
      }

      // Append newly uploaded images to existing images
      const finalImages = [
        ...existingImages,
        ...uploadedImages,
      ];

      updatedStudio.images = finalImages;
      updatedStudio.image = finalImages[0] || "";

      // Update MongoDB
      const res = await fetch(
        `http://localhost:5000/studios/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedStudio),
        }
      );

      if (!res.ok) {
        throw new Error("Failed to update studio");
      }

      toast.success("Studio updated successfully!");

      setTimeout(() => {
        router.push("/my-listings");
      }, 600);
    } catch (error) {
      console.error("Update error:", error);
      toast.error(error.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading studio information...
        </p>
      </div>
    );
  }

  if (!studio) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <p className="text-gray-600">Studio not found.</p>
        <Link
          href="/my-listings"
          className="mt-4 text-sm font-semibold text-pink-600"
        >
          Back to My Listings
        </Link>
      </div>
    );
  }

  const existingImages = studio.images?.length
    ? studio.images
    : studio.image
      ? [studio.image]
      : [];

  return (
    <main className="min-h-screen bg-[#fff8fb] px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">

        {/* Heading */}
        <div className="mb-8">
          <Link
            href="/my-listings"
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-gray-500 hover:text-pink-600 sm:text-sm"
          >
            ← Back to My Listings
          </Link>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
            StudioSpace Host
          </p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Update Your Studio
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-500 sm:text-base">
            Update your studio information and keep your listing
            up to date.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 sm:space-y-6"
        >

          {/* Basic Information */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Basic Information
              </CardTitle>
              <CardDescription>
                Update your creative space details.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="title">Studio Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={studio.title}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Studio Category *</Label>
                  <Select
                    value={category}
                    onValueChange={setCategory}
                  >
                    <SelectTrigger
                      id="category"
                      className={`w-full ${inputClass}`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxCapacity">
                    Maximum Capacity *
                  </Label>
                  <Input
                    id="maxCapacity"
                    name="maxCapacity"
                    type="number"
                    min="1"
                    defaultValue={studio.maxCapacity}
                    required
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rating">
                    Studio Rating (out of 5) *
                  </Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    defaultValue={studio.rating ?? 5}
                    required
                    className={inputClass}
                  />
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Pricing & Deposit
              </CardTitle>
              <CardDescription>
                Update your studio rental price.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">
                    Hourly Rate ($) *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="1"
                      defaultValue={studio.hourlyRate}
                      required
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="securityDeposit">
                    Security Deposit ($)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      id="securityDeposit"
                      name="securityDeposit"
                      type="number"
                      min="0"
                      defaultValue={studio.securityDeposit ?? 0}
                      className={`${inputClass} pl-8`}
                    />
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Studio Location
              </CardTitle>
              <CardDescription>
                Update your studio location.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="location">City / Location *</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={studio.location}
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  defaultValue={studio.address}
                  required
                  rows={2}
                  className={inputClass}
                />
              </div>
            </CardContent>
          </Card>

          {/* Existing Images */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Studio Images
              </CardTitle>
              <CardDescription>
                Your existing images will remain unless you add
                new ones.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {existingImages.length > 0 && (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {existingImages.map((image, index) => (
                    <div
                      key={`${image}-${index}`}
                      className="relative h-28 overflow-hidden rounded-xl sm:h-36"
                    >
                      <Image
                        src={image}
                        alt={`Studio image ${index + 1}`}
                        fill
                        unoptimized
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="images">
                  Add More Images (Optional)
                </Label>

                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    setImages(Array.from(e.target.files || []))
                  }
                  className={inputClass}
                />

                {images.length > 0 && (
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {images.length} new image(s) selected
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Amenities */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Studio Amenities
              </CardTitle>
              <CardDescription>
                Update the amenities available in your studio.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {availableAmenities.map((amenity) => {
                  const checked = amenities.includes(amenity);

                  return (
                    <Label
                      key={amenity}
                      htmlFor={`amenity-${amenity}`}
                      className={`flex cursor-pointer items-center gap-2 rounded-xl border p-2.5 text-xs font-normal transition sm:p-3 sm:text-sm ${
                        checked
                          ? "border-pink-400 bg-pink-50 text-pink-700"
                          : "border-gray-200 text-gray-600 hover:border-pink-200"
                      }`}
                    >
                      <Checkbox
                        id={`amenity-${amenity}`}
                        checked={checked}
                        onCheckedChange={() =>
                          handleAmenityChange(amenity)
                        }
                        className="data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600"
                      />
                      {amenity}
                    </Label>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Overview */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Studio Overview
              </CardTitle>
              <CardDescription>
                Update your studio description.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Textarea
                name="overview"
                defaultValue={studio.overview}
                required
                rows={6}
                className={inputClass}
              />
            </CardContent>
          </Card>

          {/* Host Information */}
          <Card className={`${cardClass} border-amber-300 bg-amber-50/70`}>
            <CardHeader>
              <CardTitle className="text-lg text-amber-900 sm:text-xl">
                Host Information
              </CardTitle>
              <CardDescription className="text-amber-800/80">
                Your original account information cannot be changed.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                <div className="space-y-2">
                  <Label htmlFor="hostName">Host Name</Label>
                  <Input
                    id="hostName"
                    value={studio.hostName || ""}
                    readOnly
                    disabled
                    className="border-amber-200 bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hostEmail">Host Email</Label>
                  <Input
                    id="hostEmail"
                    value={studio.hostEmail || studio.ownerEmail || ""}
                    readOnly
                    disabled
                    className="border-amber-200 bg-white"
                  />
                </div>

              </div>
            </CardContent>
          </Card>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 pb-6 sm:flex-row sm:justify-end">
            <Link
              href="/my-listings"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "rounded-xl",
              })}
            >
              Cancel
            </Link>

            <Button
              type="submit"
              size="lg"
              disabled={saving}
              className="rounded-xl bg-pink-600 px-8 shadow-lg shadow-pink-200 hover:bg-pink-700"
            >
              {saving ? "Updating..." : "Save Changes →"}
            </Button>
          </div>

        </form>
      </div>
    </main>
  );
}
