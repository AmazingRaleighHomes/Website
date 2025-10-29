"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection({ selectedArea, onSearch }) {
  const [propertyOpen, setPropertyOpen] = useState(false);
  const [propertyValue, setPropertyValue] = useState("Any Price");
  const [query, setQuery] = useState("");

  const propertyRef = useRef(null);
  const [propertyWidth, setPropertyWidth] = useState(0);

  const propertyOptions = ["Any Price", "$100k", "$300k", "$500k", "$750k+"];

  // Measure property dropdown width
  useEffect(() => {
    if (propertyRef.current) setPropertyWidth(propertyRef.current.offsetWidth);
  }, []);

  // Smooth exponential scroll to MLS component
  const scrollToMLS = () => {
    const target = document.getElementById("mls-listings");
    if (!target) return;

    const start = window.scrollY;
    const end = target.offsetTop;
    const distance = end - start;
    const duration = 800; // in ms
    let startTime = null;

    const easeInOutExpo = (t) =>
      t === 0
        ? 0
        : t === 1
        ? 1
        : t < 0.5
        ? Math.pow(2, 20 * t - 10) / 2
        : (2 - Math.pow(2, -20 * t + 10)) / 2;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const eased = easeInOutExpo(progress);

      window.scrollTo(0, start + distance * eased);

      if (timeElapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        price: propertyValue,
        query: query,
        area: selectedArea,
      });
    }
    scrollToMLS(); // scroll after applying filters
  };

  return (
    <section
      className="relative h-[90vh] sm:h-screen bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white text-4xl sm:text-5xl md:text-6xl font-bold mb-4 max-w-3xl leading-tight drop-shadow-lg"
        >
          Find Your Dream Home in Raleigh-Durham
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
          className="text-gray-200 text-base sm:text-lg md:text-xl mb-8 max-w-2xl"
        >
          Discover the latest MLS listings, explore neighborhoods, and connect
          with trusted local real estate experts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-xl rounded-full w-full max-w-4xl mx-auto flex items-center text-gray-700 font-medium divide-x divide-gray-300 px-4 py-2 relative"
        >
          {/* Property Value Dropdown */}
          <div
            ref={propertyRef}
            className="relative flex items-center gap-1 px-3 cursor-pointer"
            onClick={() => setPropertyOpen(!propertyOpen)}
          >
            <span>{propertyValue}</span>
            <svg
              className="w-4 h-4 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>

            <AnimatePresence>
              {propertyOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  style={{ width: propertyWidth }}
                >
                  {propertyOptions.map((option) => (
                    <li
                      key={option}
                      onClick={() => {
                        setPropertyValue(option);
                        setPropertyOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                    >
                      {option}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* Selected Area */}
          <div className="px-3 text-gray-700">{selectedArea || "Area"}</div>

          {/* Location / MLS Input */}
          <input
            type="text"
            placeholder="City, Address, or MLS #"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow bg-transparent px-3 py-1 focus:outline-none placeholder-gray-500"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-[#ebcc65] border hover:bg-[#e5555c] text-white px-6 py-2 rounded-full font-medium transition"
          >
            Search
          </button>
        </motion.div>
      </div>
    </section>
  );
}
