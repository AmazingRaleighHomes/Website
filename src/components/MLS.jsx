"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

// Mock MLS data
const allProperties = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  image:
    "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
  price: `$${350 + i * 10}k`,
  type: ["Apartments", "Duplex Homes", "Town Houses", "Studio Apartments"][i % 4],
  location: ["Raleigh, NC", "Durham, NC", "Chapel Hill, NC"][i % 3],
}));

export default function MLSProperties() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("All");
  const perPage = 12;
  const maxPage = Math.ceil(allProperties.length / perPage);

  const propertyTypes = [
    "All",
    "Apartments",
    "Duplex Homes",
    "Town Houses",
    "Studio Apartments",
  ];

  const filtered =
    selectedType === "All"
      ? allProperties
      : allProperties.filter((p) => p.type === selectedType);

  const displayedProperties = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="text-4xl sm:text-5xl font-regular text-gray-800 leading-snug">
            Discover Handpicked Homes
            <br />
            That{" "}
            <span
              className="font-serif italic"
              style={{ color: "#ebcc65", fontWeight: "200" }}
            >
              Define Elegance
            </span>
          </h1>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1);
              }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedType === type
                  ? "bg-[#ebcc65] text-white border-gray-500]"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Properties Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {displayedProperties.map((property) => (
            <motion.div
              key={property.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition"
            >
              <img
                src={property.image}
                alt={property.type}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-lg font-semibold text-[#d7595d]">
                  {property.price}
                </p>
                <p className="text-gray-700">{property.type}</p>
                <p className="text-gray-500 text-sm">{property.location}</p>
                <button className="mt-4 w-full bg-[#ebcc65] hover:bg-[#d7595d] text-white py-2 rounded-full transition">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination / Load More */}
        {filtered.length > perPage && (
          <div className="mt-12 text-center">
            <button
              onClick={() =>
                setCurrentPage(currentPage < maxPage ? currentPage + 1 : 1)
              }
              className="bg-[#ebcc65] hover:bg-[#d7595d] text-white px-6 py-2 rounded-full font-medium transition"
            >
              Load More Listings
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
