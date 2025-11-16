"use client";

import { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

export default function ListingsModalHeroGallery({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const startX = useRef(0);

  const handlePrev = () =>
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const openGallery = () => setIsGalleryOpen(true);
  const closeGallery = () => setIsGalleryOpen(false);

  if (images.length === 0)
    return <div className="w-full h-[300px] sm:h-[600px] bg-gray-200" />;

  // Primary image
  const leftImage = images[0];
  // Next up to 4 images
  const rightImages = images.slice(1, 5);

  // Swipe handling for mobile fullscreen
  const handleTouchStart = (e) => (startX.current = e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext(); // Swipe left
    if (diff < -50) handlePrev(); // Swipe right
  };

  return (
    <>
      {/* GALLERY PREVIEW */}
      <div className="w-full h-[300px] sm:h-[600px] flex flex-col sm:flex-row gap-2 relative overflow-hidden rounded-t-2xl">
        {/* LEFT MAIN IMAGE */}
        {leftImage && (
          <div className="w-full sm:w-1/2 h-[200px] sm:h-full relative">
            <img
              src={leftImage}
              alt="Primary"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* RIGHT SIDE GRID (only visible on desktop) */}
        <div className="hidden sm:grid sm:w-1/2 sm:h-full grid-cols-2 grid-rows-2 gap-2">
          {rightImages.map((img, idx) => (
            <div key={idx} className="w-full h-full relative">
              <img
                src={img}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* MOBILE STRIP of extra images */}
        <div className="flex sm:hidden w-full gap-2 overflow-x-auto px-2 mt-2 scrollbar-hide">
          {rightImages.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`Gallery thumb ${idx + 1}`}
              className="h-24 w-36 object-cover rounded-md flex-shrink-0"
            />
          ))}
        </div>

        {/* VIEW BUTTON */}
        <button
          onClick={openGallery}
          className="absolute right-4 bottom-4 bg-[#ebcc65] text-black font-medium px-4 py-2 rounded-full shadow hover:opacity-90 transition z-10 text-sm sm:text-base"
        >
          View All Photos
        </button>
      </div>

      {/* FULLSCREEN GALLERY MODAL */}
      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-2 sm:p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close */}
          <button
            onClick={closeGallery}
            className="absolute top-4 right-4 text-white text-2xl sm:text-3xl z-10 bg-black/40 p-2 rounded-full hover:bg-black/60"
          >
            <FaTimes />
          </button>

          {/* Image container */}
          <div className="relative w-full max-w-5xl h-[90vh] flex items-center justify-center">
            {/* Prev */}
            <button
              onClick={handlePrev}
              className="absolute left-3 sm:left-6 text-white text-2xl sm:text-3xl bg-black/30 p-3 sm:p-4 rounded-full hover:bg-black/50 z-10 active:scale-95 transition"
            >
              <FaChevronLeft />
            </button>

            {/* Image */}
            <img
              src={images[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain select-none"
              draggable="false"
            />

            {/* Next */}
            <button
              onClick={handleNext}
              className="absolute right-3 sm:right-6 text-white text-2xl sm:text-3xl bg-black/30 p-3 sm:p-4 rounded-full hover:bg-black/50 z-10 active:scale-95 transition"
            >
              <FaChevronRight />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/40 px-3 py-1 rounded-full text-xs sm:text-sm z-10">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
