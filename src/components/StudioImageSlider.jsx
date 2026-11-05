
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function StudioImageSlider({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="relative mt-5 flex h-56 items-center justify-center rounded-2xl bg-pink-100 text-sm text-gray-500 sm:h-96">
        No studio images available
      </div>
    );
  }

  return (
    <div className="relative mt-5 h-56 overflow-hidden rounded-2xl sm:h-96">
      <Image
        key={images[currentIndex]}
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        fill
        unoptimized
        className="object-cover"
      />

      {/* Previous button */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/75"
          >
            ❮
          </button>

          {/* Next button */}
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/75"
          >
            ❯
          </button>

          {/* Navigation dots */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((image, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-5 bg-white"
                    : "w-2 bg-white/60"
                }`}
              />
            ))}
          </div>

          {/* Image counter */}
          <div className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  );
}
