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

  if (images.length === 0) {
    return <div className="h-[320px] w-full bg-[#ece4db] sm:h-[560px]" />;
  }

  const leftImage = images[0];
  const rightImages = images.slice(1, 5);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
  };

  return (
    <>
      <div className="relative overflow-hidden border-b border-[#e6ddd4] bg-[#f3ece4]">
        <div className="grid gap-2 p-2 sm:grid-cols-[1.2fr_0.8fr] sm:p-3">
          {leftImage && (
            <div className="relative h-[260px] overflow-hidden rounded-[1.6rem] sm:h-[560px]">
              <img
                src={leftImage}
                alt="Primary property photo"
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <div className="hidden grid-cols-2 grid-rows-2 gap-2 sm:grid">
            {rightImages.map((img, idx) => (
              <div key={idx} className="relative overflow-hidden rounded-[1.25rem]">
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto px-3 pb-3 sm:hidden scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                openGallery();
              }}
              className="overflow-hidden rounded-[1rem] flex-shrink-0"
            >
              <img
                src={img}
                alt={`Gallery thumb ${idx + 1}`}
                className="h-24 w-36 object-cover"
              />
            </button>
          ))}
        </div>

        <button
          onClick={openGallery}
          className="absolute bottom-6 right-6 rounded-full border border-[#e2b39f]/40 bg-white px-5 py-2.5 text-sm font-semibold uppercase tracking-[0.14em] text-[#1f1c17] shadow-lg transition hover:bg-[#f5ede8]"
        >
          View All Photos
        </button>
      </div>

      {isGalleryOpen && (
        <div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-2 sm:p-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={closeGallery}
            className="absolute right-4 top-4 z-10 rounded-full bg-black/40 p-3 text-2xl text-white transition hover:bg-black/60"
          >
            <FaTimes />
          </button>

          <div className="relative flex h-[90vh] w-full max-w-6xl items-center justify-center">
            <button
              onClick={handlePrev}
              className="absolute left-3 z-10 rounded-full bg-black/30 p-3 text-2xl text-white transition hover:bg-black/50 sm:left-6 sm:p-4 sm:text-3xl"
            >
              <FaChevronLeft />
            </button>

            <img
              src={images[currentIndex]}
              alt={`Gallery ${currentIndex + 1}`}
              className="max-h-full max-w-full object-contain select-none"
              draggable="false"
            />

            <button
              onClick={handleNext}
              className="absolute right-3 z-10 rounded-full bg-black/30 p-3 text-2xl text-white transition hover:bg-black/50 sm:right-6 sm:p-4 sm:text-3xl"
            >
              <FaChevronRight />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-3 py-1 text-xs text-white sm:text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
