"use client";

import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ListingsModalDetailsAccordion({ community }) {
  const [isOpen, setIsOpen] = useState(true);

  if (!community || Object.keys(community).length === 0) return null;

  // Flatten nested objects (like community.schools) to make them displayable
  const flattenFields = (obj, parentKey = "") => {
    return Object.entries(obj).flatMap(([key, value]) => {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        return flattenFields(value, key);
      } else {
        return [{ label: parentKey ? `${parentKey} - ${key}` : key, value }];
      }
    });
  };

  const fields = flattenFields(community);

  return (
    <div className="mt-6 border rounded-lg overflow-hidden shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center bg-gray-100 px-4 py-2 text-left font-semibold text-gray-800"
      >
        Property Details
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {isOpen && (
        <div className="p-4 text-gray-700 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {fields.map(({ label, value }) => {
            if (!value) return null;

            const displayValue = Array.isArray(value)
              ? value.join(", ")
              : value;

            // Capitalize label nicely
            const formattedLabel = label
              .replace(/([A-Z])/g, " $1")
              .replace(/_/g, " ")
              .replace(/\b\w/g, (c) => c.toUpperCase());

            return (
              <p key={label}>
                <span className="font-semibold">{formattedLabel}:</span>{" "}
                {displayValue}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}
