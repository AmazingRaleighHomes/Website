"use client";

import { useState } from "react";
import { FaBed, FaBath, FaRulerCombined } from "react-icons/fa";

export default function ListingsModalPropertySummary({ property }) {
  if (!property) return null;

  const formatPrice = (val) => (val ? `$${Number(val).toLocaleString()}` : "N/A");
  const formatSqft = (val) => (val ? `${Number(val).toLocaleString()} sqft` : "N/A");

  const beds = property.beds ?? 0;
  const baths = property.baths ?? 0;
  const sqft = property.sqft ?? 0;
  const pricePerSqft = property.price && sqft ? Math.round(property.price / sqft) : null;
  const description = property.description || "";

  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxChars = 320;
  const shouldTruncate = description.length > maxChars;
  const displayedText = showFullDescription ? description : description.slice(0, maxChars);

  return (
    <div className="space-y-6 text-left">
      <div className="border-b border-[#e6ddd4] pb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-[#a15b41]">
              Property Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-[#1f1c17] sm:text-4xl">
              {property.ListingName || property.address || "Listing"}
            </h2>
            {property.address && (
              <p className="mt-2 text-base text-[#6f675f]">{property.address}</p>
            )}
          </div>

          <div className="rounded-[1.4rem] border border-[#e6ddd4] bg-[#fffaf5] px-5 py-4 shadow-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a15b41]">
              Offered At
            </p>
            <p className="mt-2 text-3xl font-semibold text-[#d86a45]">
              {formatPrice(property.price)}
            </p>
            {pricePerSqft && (
              <p className="mt-1 text-sm text-[#6f675f]">${pricePerSqft}/sqft</p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-[1.4rem] border border-[#e6ddd4] bg-white p-4">
          <div className="flex items-center gap-3 text-[#1f1c17]">
            <FaBed className="text-[#a15b41]" size={16} />
            <span className="text-lg font-semibold">{beds}</span>
          </div>
          <p className="mt-2 text-sm text-[#6f675f]">Bedrooms</p>
        </div>

        <div className="rounded-[1.4rem] border border-[#e6ddd4] bg-white p-4">
          <div className="flex items-center gap-3 text-[#1f1c17]">
            <FaBath className="text-[#a15b41]" size={16} />
            <span className="text-lg font-semibold">{baths}</span>
          </div>
          <p className="mt-2 text-sm text-[#6f675f]">Bathrooms</p>
        </div>

        <div className="rounded-[1.4rem] border border-[#e6ddd4] bg-white p-4">
          <div className="flex items-center gap-3 text-[#1f1c17]">
            <FaRulerCombined className="text-[#a15b41]" size={16} />
            <span className="text-lg font-semibold">{formatSqft(sqft)}</span>
          </div>
          <p className="mt-2 text-sm text-[#6f675f]">Interior Size</p>
        </div>
      </div>

      <div className="grid gap-4 text-sm text-[#5f5750] sm:grid-cols-2 xl:grid-cols-4">
        {property.yearBuilt && (
          <div className="rounded-[1.2rem] border border-[#e6ddd4] bg-[#fffaf5] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a15b41]">Year Built</p>
            <p className="mt-2 text-base font-medium text-[#1f1c17]">{property.yearBuilt}</p>
          </div>
        )}
        {property.type && (
          <div className="rounded-[1.2rem] border border-[#e6ddd4] bg-[#fffaf5] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a15b41]">Property Type</p>
            <p className="mt-2 text-base font-medium text-[#1f1c17]">{property.type}</p>
          </div>
        )}
        {property.subdivision && (
          <div className="rounded-[1.2rem] border border-[#e6ddd4] bg-[#fffaf5] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a15b41]">Subdivision</p>
            <p className="mt-2 text-base font-medium text-[#1f1c17]">{property.subdivision}</p>
          </div>
        )}
        {property.acres && (
          <div className="rounded-[1.2rem] border border-[#e6ddd4] bg-[#fffaf5] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#a15b41]">Lot Size</p>
            <p className="mt-2 text-base font-medium text-[#1f1c17]">{property.acres} acres</p>
          </div>
        )}
      </div>

      {description && (
        <div className="rounded-[1.6rem] border border-[#e6ddd4] bg-white p-6">
          <p className="text-sm uppercase tracking-[0.24em] text-[#a15b41]">
            Listing Description
          </p>
          <p className="mt-4 text-sm leading-7 text-[#5f5750]">
            {displayedText}
            {!showFullDescription && shouldTruncate ? "..." : ""}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setShowFullDescription(!showFullDescription)}
              className="mt-3 text-sm font-semibold text-[#d86a45] hover:underline"
            >
              {showFullDescription ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
