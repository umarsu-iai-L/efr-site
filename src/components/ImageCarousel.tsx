"use client";

import { useState } from "react";

export interface CarouselImage {
  alt: string;
  src: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  initialIndex?: number;
  title?: string;
}

export default function ImageCarousel({
  images,
  initialIndex = 0,
  title,
}: ImageCarouselProps) {
  const [selectedIndex, setSelectedIndex] = useState(
    Math.min(Math.max(initialIndex, 0), Math.max(images.length - 1, 0)),
  );

  if (images.length === 0) return null;

  const selectedImage = images[selectedIndex];
  const selectPrevious = () =>
    setSelectedIndex((index) => (index - 1 + images.length) % images.length);
  const selectNext = () =>
    setSelectedIndex((index) => (index + 1) % images.length);

  return (
    <section aria-label={title ?? "Image carousel"} className="w-full">
      {title && <h2 className="mb-5 text-2xl font-semibold">{title}</h2>}

      <div className="relative mx-auto aspect-[3/5] w-full max-w-md overflow-hidden rounded-2xl border-4 border-[#224474] bg-slate-950 shadow-2xl shadow-[#224474]/30">
        <img
          src={selectedImage.src}
          alt={selectedImage.alt}
          className="h-full w-full object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Show previous image"
              onClick={selectPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#224474] px-4 py-2 text-xl text-white shadow-lg shadow-black/40 transition hover:scale-105 hover:bg-[#18325a] focus:outline-none focus:ring-2 focus:ring-white"
            >
              &#8592;
            </button>
            <button
              type="button"
              aria-label="Show next image"
              onClick={selectNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#224474] px-4 py-2 text-xl text-white shadow-lg shadow-black/40 transition hover:scale-105 hover:bg-[#18325a] focus:outline-none focus:ring-2 focus:ring-white"
            >
              &#8594;
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
        <p className="mt-4 text-center text-sm text-gray-500">
          {selectedIndex + 1} of {images.length}
        </p>
      )}
    </section>
  );
}
