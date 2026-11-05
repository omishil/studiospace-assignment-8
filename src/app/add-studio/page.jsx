
"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

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

export default function AddStudioPage() {
  const [amenities, setAmenities] = useState([]);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  // Get logged-in user's session
  const { data: session, isPending } = authClient.useSession();

  const hostName = session?.user?.name || "";
  const hostEmail = session?.user?.email || "";
  const hostId = session?.user?.id || "";

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check login
    if (!session?.user) {
      alert("Please log in before adding a studio.");
      return;
    }

    if (images.length === 0) {
      alert("Please select at least one studio image.");
      return;
    }

    try {
      // Upload multiple images to ImgBB
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
          alert("Image upload failed");
          return;
        }

        uploadedImages.push(uploadData.imageUrl);
      }

      // Get original form data
      const formData = new FormData(e.target);
      const studioData = Object.fromEntries(formData.entries());

      studioData.category = category;
      studioData.amenities = amenities;
      studioData.rating = Number(studioData.rating);

      // Save uploaded image URLs
      studioData.images = uploadedImages;
      studioData.image = uploadedImages[0];

      // Save host information
      studioData.hostName = hostName;
      studioData.hostEmail = hostEmail;
      studioData.hostId = hostId;

      // Save studio data to MongoDB
      const res = await fetch("http://localhost:5000/add-studio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Failed to add studio");
        return;
      }

      console.log(data);
      alert("Studio added successfully!");

    } catch (error) {
      console.error("Error adding studio:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff8fb] px-3 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Heading */}
        <div className="mb-8">
          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-xs font-medium text-gray-500 transition hover:text-pink-600 sm:text-sm"
          >
            <span>←</span>
            Back to Home
          </Link>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-pink-600 sm:text-sm">
            StudioSpace Host
          </p>

          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Add Your Studio
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Share your creative space with creators and turn your studio into
            an opportunity.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
          {/* Basic Information */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Basic Information
              </CardTitle>
              <CardDescription>
                Tell us about your creative space.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="title">Studio Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    required
                    placeholder="e.g. Modern Photography Studio"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Studio Category *</Label>
                  <Select value={category} onValueChange={setCategory}>
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
                  <Label htmlFor="maxCapacity">Maximum Capacity *</Label>
                  <Input
                    id="maxCapacity"
                    name="maxCapacity"
                    type="number"
                    min="1"
                    required
                    placeholder="e.g. 10 people"
                    className={inputClass}
                  />
                </div>

                {/* Studio Rating */}
                <div className="space-y-2">
                  <Label htmlFor="rating">Studio Rating (out of 5) *</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    defaultValue="5"
                    required
                    placeholder="e.g. 4.8"
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
                Set your studio rental price.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate ($) *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      $
                    </span>
                    <Input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="1"
                      required
                      placeholder="50"
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
                      defaultValue="0"
                      placeholder="100"
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
                Where can creators find your studio?
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="location">City / Location *</Label>
                <Input
                  id="location"
                  name="location"
                  required
                  placeholder="e.g. Dhaka, Bangladesh"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address *</Label>
                <Textarea
                  id="address"
                  name="address"
                  required
                  rows={2}
                  placeholder="Enter your complete studio address..."
                  className={inputClass}
                />
              </div>
            </CardContent>
          </Card>

          {/* Studio Images */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Studio Images
              </CardTitle>
              <CardDescription>
                Upload multiple images of your creative space.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="images">Studio Images *</Label>

                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  required
                  onChange={(e) =>
                    setImages(Array.from(e.target.files))
                  }
                  className={inputClass}
                />

                {images.length > 0 && (
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {images.length} image(s) selected
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
                Select everything available in your studio.
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
                      className={`cursor-pointer rounded-xl border p-2.5 text-xs font-normal transition sm:p-3 sm:text-sm ${
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
                        className="data-[state=checked]:border-pink-600 data-[state=checked]:bg-pink-600 data-[checked]:border-pink-600 data-[checked]:bg-pink-600"
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
                Give creators a detailed introduction to your space.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Textarea
                name="overview"
                required
                rows={6}
                placeholder="Describe your studio, its atmosphere, equipment, ideal uses, and anything else creators should know..."
                className={inputClass}
              />
            </CardContent>
          </Card>

          {/* Host Information */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Host Information
              </CardTitle>
              <CardDescription>
                Your account information is added automatically.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hostName">Host Name</Label>
                  <Input
                    id="hostName"
                    value={
                      isPending ? "Loading..." : hostName
                    }
                    readOnly
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hostEmail">Host Email</Label>
                  <Input
                    id="hostEmail"
                    value={
                      isPending ? "Loading..." : hostEmail
                    }
                    readOnly
                    disabled
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col-reverse gap-3 pb-6 sm:flex-row sm:justify-end">
            <Link
              href="/"
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
              disabled={isPending || !session?.user}
              className="rounded-xl bg-pink-600 px-8 shadow-lg shadow-pink-200 hover:bg-pink-700"
            >
              Add Studio →
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
