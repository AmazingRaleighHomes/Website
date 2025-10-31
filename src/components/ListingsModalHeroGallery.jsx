"use client";

import { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export default function ListingsModalHeroGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handlePrev = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const openGallery = () => setIsGalleryOpen(true);
  const closeGallery = () => setIsGalleryOpen(false);

  if (images.length === 0) return <div className="w-full h-[600px] bg-gray-200" />;

  // Left image
  const leftImage = images[0];

  // Right images: take up to 4
  const rightImages = images.slice(1, 5);

  return (
    <>
      <div className="w-full h-[600px] flex gap-2 relative overflow-hidden rounded-t-2xl">
        {/* LEFT HALF */}
        {leftImage && (
          <div className="w-1/2 h-full relative">
            <img
              src={leftImage.MediaURL}
              alt="Primary"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* RIGHT HALF: 2x2 grid */}
        <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-2">
          {rightImages.map((img, idx) => (
            <div key={idx} className="w-full h-full relative">
              <img
                src={img.MediaURL}
                alt={`Right Image ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* View All Photos button */}
        <button
          onClick={openGallery}
          className="absolute right-4 bottom-12 bg-[#d7595d] text-white px-4 py-2 rounded-full hover:bg-[#ebcc65] transition-colors z-10"
        >
          View All Photos
        </button>
      </div>

      {/* FULLSCREEN GALLERY MODAL */}
      {isGalleryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white text-2xl z-10"
          >
            <FaTimes />
          </button>

          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-2 text-white text-3xl bg-black/30 p-2 rounded-full hover:bg-black/50 z-10"
            >
              <FaChevronLeft />
            </button>

            <img
              src={images[currentIndex].MediaURL}
              alt={`Gallery Image ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain"
            />

            <button
              onClick={handleNext}
              className="absolute right-2 text-white text-3xl bg-black/30 p-2 rounded-full hover:bg-black/50 z-10"
            >
              <FaChevronRight />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/40 px-3 py-1 rounded-full text-sm z-10">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
