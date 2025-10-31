"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

export default function ListingsModalGalleryModal({ images, onClose }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  const prev = () => setCurrent(current === 0 ? total - 1 : current - 1);
  const next = () => setCurrent(current === total - 1 ? 0 : current + 1);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-45 bg-black/90 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-5xl h-full md:h-[600px] overflow-hidden relative flex items-center justify-center"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <img
            src={images[current].MediaURL}
            alt={`Slide ${current}`}
            className="w-full h-full object-contain"
          />

          {/* Prev/Next buttons */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 px-3 py-1 rounded-full hover:bg-white transition"
          >
            ◀
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 text-gray-800 px-3 py-1 rounded-full hover:bg-white transition"
          >
            ▶
          </button>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white text-gray-800 px-3 py-1 rounded-full shadow hover:bg-gray-100 transition"
          >
            Close
          </button>

          {/* Pagination dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === current ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
