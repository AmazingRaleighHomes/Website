"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ListingModal from "./ListingModal"; // import the modal component

export default function MLSProperties({ filters = {} }) {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null); // modal state

  const perPage = 12;

  // Fetch MLS data
  useEffect(() => {
    async function fetchMLS() {
      setLoading(true);
      try {
        const res = await fetch("/api/mls");
        const data = await res.json();

        if (data.error) {
          setError(data.error);
        } else {
          setProperties(data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMLS();
  }, []);

  const propertyTypes = ["All", "Single Family", "Townhouse", "Condo", "Apartment"];

  // Apply type filter from buttons
  let filtered = selectedType === "All" ? properties : properties.filter(
    (p) => p.PropertySubType === selectedType
  );

  // Apply HeroSection filters
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

  return (
    <section id="mls-listings" className="py-20 bg-gray-50">
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

        {/* Type Filter Buttons */}
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
                  ? "bg-[#ebcc65] text-white border-gray-500"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Loading/Error State */}
        {loading && <p className="text-gray-500">Loading MLS listings...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Properties Grid */}
        {!loading && !error && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {displayedProperties.map((property) => (
              <motion.div
                key={property.ListingKey || property.Id}
                whileHover={{ scale: 1.03 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer transition"
                onClick={() => setSelectedProperty(property)} // open modal
              >
                {/* Image */}
                <img
                  src={property?.Media?.[0]?.MediaURL || "/images/no-image.jpg"}
                  alt={property?.UnparsedAddress || "Property image"}
                  className="w-full h-56 object-cover"
                />

                {/* Details */}
                <div className="p-4">
                  <p className="text-lg font-semibold text-[#d7595d]">
                    ${property?.ListPrice ? property.ListPrice.toLocaleString() : "N/A"}
                  </p>
                  <p className="text-gray-700">
                    {property?.PropertySubType || property?.PropertyType || "Home"}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {property?.UnparsedAddress || "Address unavailable"}
                  </p>
                  <button className="mt-4 w-full bg-[#ebcc65] hover:bg-[#d7595d] text-white py-2 rounded-full transition">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && filtered.length > perPage && (
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

      <ListingModal
  property={selectedProperty}
  isOpen={!!selectedProperty} // <- this fixes it
  onClose={() => setSelectedProperty(null)}
/>

      </div>
    </section>
  );
}
