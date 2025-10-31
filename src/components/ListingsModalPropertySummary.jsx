"use client";

import { useState } from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

export default function ListingsModalPropertySummary({ property }) {
  if (!property) return null;

  const formatPrice = (val) => (val ? `$${Number(val).toLocaleString()}` : "N/A");
  const formatSqft = (val) => (val ? `${Number(val).toLocaleString()} sqft` : "N/A");

  const beds = property.BedroomsTotal ?? 0;
  const fullBaths = property.BathroomsFull ?? 0;
  const halfBaths = property.BathroomsHalf ?? 0;
  const totalBaths = fullBaths + halfBaths;

  // --- Pick the description field from Spark API ---
  const description =
    property.Description ||
    property.PublicRemarks ||
    property.PropertyDescription ||
    "";

  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxChars = 250; // show first 250 chars initially

  const shouldTruncate = description.length > maxChars;
  const displayedText = showFullDescription ? description : description.slice(0, maxChars);

  return (
    <div className="space-y-4 border-b border-gray-200 mt-8 pb-6 text-left">
      {/* Title & Address */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 leading-tight">
          {property.ListingName || property.UnparsedAddress || "Listing"}
        </h2>
        <p className="text-gray-600 mt-1">{property.UnparsedAddress}</p>
      </div>

      {/* Price */}
      <p className="text-3xl font-semibold text-[#ebcc65]">
        {formatPrice(property.ListPrice)}
      </p>

      {/* Key Details Grid with Icons */}
      <div className="grid grid-cols-3 gap-6 text-gray-700 mt-2">
        <div className="flex items-center gap-2">
          <FaBed className="text-gray-500" size={16} />
          <span className="font-medium text-gray-900">{beds}</span>
          <span className="text-gray-500 text-xs ml-1">Beds</span>
        </div>

        <div className="flex items-center gap-2">
          <FaBath className="text-gray-500" size={16} />
          <span className="font-medium text-gray-900">{totalBaths}</span>
          <span className="text-gray-500 text-xs ml-1">Baths</span>
        </div>

        <div className="flex items-center gap-2">
          <FaRulerCombined className="text-gray-500" size={16} />
          <span className="font-medium text-gray-900">{formatSqft(property.LivingArea)}</span>
        </div>
      </div>

      {/* Extra Info */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700 pt-2">
        {property.YearBuilt && (
          <p><span className="font-medium">Year Built:</span> {property.YearBuilt}</p>
        )}
        {property.PricePerSqFt && (
          <p><span className="font-medium">Price/Sqft:</span> ${property.PricePerSqFt}</p>
        )}
        {property.PropertyType && (
          <p><span className="font-medium">Type:</span> {property.PropertyType}</p>
        )}
        {property.SubdivisionName && (
          <p><span className="font-medium">Subdivision:</span> {property.SubdivisionName}</p>
        )}
      </div>

      {/* Property Description with Show More / Show Less */}
      {description && (
        <div className="pt-4 text-gray-700 text-sm">
          <p>
            {displayedText}
            {shouldTruncate && !showFullDescription ? "..." : ""}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-1 text-[#d7595d] font-medium text-sm hover:underline"
            >
              {showFullDescription ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
