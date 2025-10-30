"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ListingModal from "./ListingModal";
import { FaShareAlt, FaBed, FaBath, FaRulerCombined, FaLeaf } from "react-icons/fa";



export default function MLSProperties({ filters = {} }) {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});

  const perPage = 12;

  useEffect(() => {
    async function fetchMLS() {
      setLoading(true);
      try {
        const res = await fetch("/api/mls");
        const data = await res.json();
        if (data.error) setError(data.error);
        else setProperties(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMLS();
  }, []);

  const propertyTypes = ["All", "Single Family", "Townhouse", "Condo", "Apartment"];

  // Filter & sorting
  let filtered =
    selectedType === "All"
      ? properties
      : properties.filter((p) => p.PropertySubType === selectedType);

  if (filters.price && filters.price !== "Any Price") {
    const priceMax = (() => {
      switch (filters.price) {
        case "$100k": return 100000;
        case "$300k": return 300000;
        case "$500k": return 500000;
        case "$750k+": return Infinity;
        default: return Infinity;
      }
    })();
    filtered = filtered.filter((p) => p.ListPrice <= priceMax);
  }

  if (filters.query && filters.query.trim() !== "") {
    const query = filters.query.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.UnparsedAddress?.toLowerCase().includes(query) ||
        p.PropertyType?.toLowerCase().includes(query)
    );
  }

  const displayedProperties = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const maxPage = Math.ceil(filtered.length / perPage);

  const getImageIndex = (id) => imageIndexes[id] || 0;
  const changeImage = (id, direction, total) => {
    setImageIndexes((prev) => {
      const current = prev[id] || 0;
      const next =
        direction === "next"
          ? (current + 1) % total
          : (current - 1 + total) % total;
      return { ...prev, [id]: next };
    });
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));
    if (diffHours < 1) return "Added just now";
    if (diffHours < 24) return `Added ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `Added ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  return (
    <section id="mls-listings" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
            <span className="font-serif italic" style={{ color: "#ebcc65", fontWeight: "200" }}>
              Define Elegance
            </span>
          </h1>
        </motion.div>

        {/* Type Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => { setSelectedType(type); setCurrentPage(1); }}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all border ${
                selectedType === type
                  ? "bg-[#ebcc65] text-white border-gray-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {loading && <p className="text-gray-500">Loading MLS listings...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Properties Grid */}
        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {displayedProperties.map((property) => {
              const id = property.ListingKey || property.Id;
              const media = property?.Media || [];
              const totalImages = media.length || 1;
              const index = getImageIndex(id);
              const currentImage = media[index]?.MediaURL || "/images/no-image.jpg";
              const addedText = getTimeAgo(property?.OnMarketDate);

              return (
<motion.div
  key={id}
  whileHover={{ scale: 1.03 }}
  className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 relative"
  onClick={() => setSelectedProperty(property)}
>
  {/* Image Container */}
  <div className="relative w-full h-56 bg-gray-200 rounded-t-2xl overflow-hidden">
    {/* Main Image */}
    <img
      src={currentImage}
      alt={property?.UnparsedAddress || "Property image"}
      className="w-full h-full object-cover"
    />

    {/* "New" Badge (rounded pill, top-right) */}
    {addedText && (
      <div className="absolute top-3 right-2 z-50 bg-[#ebcc65] text-white text-xs font-medium px-3 py-1 rounded-2xl shadow-lg pointer-events-none">
        New — {addedText}
      </div>
    )}

    {/* Carousel Arrows */}
    {totalImages > 1 && (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            changeImage(id, "prev", totalImages);
          }}
          className="absolute top-1/2 left-2 -translate-y-1/2 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition pointer-events-auto"
          aria-label="Previous image"
        >
          <FaChevronLeft size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            changeImage(id, "next", totalImages);
          }}
          className="absolute top-1/2 right-2 -translate-y-1/2 z-50 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition pointer-events-auto"
          aria-label="Next image"
        >
          <FaChevronRight size={16} />
        </button>
      </>
    )}
  </div>

  {/* Card Details */}
  <div className="p-4 text-left">
    {/* Price */}
    <p className="text-lg font-semibold text-[#ebcc65]">
      ${property?.ListPrice ? property.ListPrice.toLocaleString() : "N/A"}
    </p>

    {/* Property Type */}
    <p className="text-gray-700 text-sm">
      {property?.PropertySubType || property?.PropertyType || "Home"}
    </p>

{/* Beds / Baths / Sqft / Acres */}
<div className="flex flex-wrap items-center gap-4 text-gray-500 text-xs mt-1">
  {property?.BedroomsTotal && (
    <div className="flex items-center gap-1">
      <FaBed size={14} /> {property.BedroomsTotal}
    </div>
  )}
  {(property?.BathroomsFull ?? 0) + (property?.BathroomsHalf ?? 0) > 0 && (
    <div className="flex items-center gap-1">
      <FaBath size={14} /> {(property.BathroomsFull ?? 0) + (property.BathroomsHalf ?? 0)}
    </div>
  )}
  {property?.LivingArea && (
    <div className="flex items-center gap-1">
      <FaRulerCombined size={14} /> {property.LivingArea.toLocaleString()} sqft
    </div>
  )}
  {property?.LotSizeAcres && (
    <div className="flex items-center gap-1">
      <FaLeaf size={14} /> {property.LotSizeAcres} acres
    </div>
  )}
</div>


    {/* Address */}
    <p className="text-gray-500 text-xs mt-1">
      {property?.UnparsedAddress || "Address unavailable"}
    </p>

    {/* View Details Button */}
    <button className="mt-3 w-full bg-[#ebcc65] hover:bg-[#d7595d] text-white py-2 rounded-full text-sm font-medium transition border border-white shadow-inner hover:shadow-lg">
      View Details
    </button>
  </div>
</motion.div>



              );
            })}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && filtered.length > perPage && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage(currentPage < maxPage ? currentPage + 1 : 1)}
              className="bg-[#ebcc65] hover:bg-[#d7595d] text-white px-6 py-2 rounded-full font-medium transition"
            >
              Load More Listings
            </button>
          </div>
        )}

        <ListingModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={() => setSelectedProperty(null)}
        />
      </div>
    </section>
  );
}
