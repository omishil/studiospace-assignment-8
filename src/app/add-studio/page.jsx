"use client";

import { useState } from "react";
import Link from "next/link";

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

  const handleAmenityChange = (amenity) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const studioData = Object.fromEntries(formData.entries());

    studioData.category = category;
    studioData.amenities = amenities;
    studioData.rating = Number(studioData.rating);

    const res = await fetch("http://localhost:5000/add-studio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studioData),
    });

    const data = await res.json();

    console.log(data);
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

          {/* Studio Image URL */}
          <Card className={cardClass}>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Studio Image
              </CardTitle>
              <CardDescription>
                Add an image URL to showcase your creative space.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="image">Studio Image URL *</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  required
                  placeholder="https://example.com/studio.jpg"
                  className={inputClass}
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-400">
                Paste a direct image URL (JPG, PNG, or WEBP).
              </p>
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
                        onCheckedChange={() => handleAmenityChange(amenity)}
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
                Your account information will appear here.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="hostName">Host Name</Label>
                  <Input
                    id="hostName"
                    value="Will be connected later"
                    readOnly
                    disabled
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hostEmail">Host Email</Label>
                  <Input
                    id="hostEmail"
                    value="Will be connected later"
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