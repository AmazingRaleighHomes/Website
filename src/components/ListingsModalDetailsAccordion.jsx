"use client";

import { useState } from "react";

/* -------------------------------------------------------------------------- */
/* Helper: check if a value is "meaningful" (not null, empty, etc.)          */
/* -------------------------------------------------------------------------- */
const showValue = (value) => {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === "object" && Object.keys(value).length === 0) return false;
  if (value === "") return false;
  return true;
};

/* -------------------------------------------------------------------------- */
/* Helper: render array or string safely                                     */
/* -------------------------------------------------------------------------- */
const renderArray = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  return value ?? "";
};

/* -------------------------------------------------------------------------- */
/* Main Component                                                            */
/* -------------------------------------------------------------------------- */
export default function ListingsModalDetailsAccordion({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Guard: no data
  if (!data) {
    return <p className="text-red-600">No listing data provided.</p>;
  }

  // Extract top-level fields
  const {
    price,
    status,
    listingId,
    beds,
    baths,
    sqft,
    acres,
    yearBuilt,
    type,
    subType,
    listingDate,
    ListAgentPhone,
  } = data;

  // Extract nested community_info safely
  const communityInfo = data.community_info || {};
  const schools = communityInfo.schools || {};
  const utilities = communityInfo.utilities || {};
  const hoa = communityInfo.hoa || {};

  return (
    <div className="relative space-y-4">
      {/* Sticky Tour & Agent Info */}
      <div className="sticky top-5 z-10 border border-gray-200 rounded-lg p-4 bg-white space-y-3">
        {/* Request Tour Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full bg-[#ebcc65] hover:bg-[#ebcc80] text-white font-semibold py-2 px-4 rounded transition"
        >
          Request a Tour
        </button>

        {/* Phone Button */}
        <a
          href={`tel:${ListAgentPhone || "9198027282"}`}
          className="w-full flex items-center justify-center gap-2 border hover:bg-black/10 text-black font-regular py-2 px-4 rounded transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 001.5-1.5v-3.937a1.5 1.5 0 00-1.091-1.45l-3.583-1.02a1.5 1.5 0 00-1.63.55l-.972 1.215a11.042 11.042 0 01-5.516-5.516l1.215-.972a1.5 1.5 0 00.55-1.63l-1.02-3.583A1.5 1.5 0 005.687 3H2.25A1.5 1.5 0 .75 4.5V6.75z"
            />
          </svg>
          Call Agent
        </a>

        {/* Messenger */}
        <a
          href="https://m.me/mike.ulrich81"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 border hover:bg-[#0073e6]/10 text-[#000] font-regular py-2 px-4 rounded transition"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12 2C6.48 2 2 6.13 2 11.5c0 2.99 1.51 5.68 3.93 7.47V22l3.59-1.97c.8.22 1.65.34 2.48.34 5.52 0 10-4.13 10-9.5S17.52 2 12 2zm.13 12.83l-2.6-2.76-4.12 2.76 4.71-5.02 2.53 2.76 4.12-2.76-4.64 5.02z" />
          </svg>
          Message on Messenger
        </a>
      </div>

      {/* Tour Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h2 className="text-xl font-semibold mb-4">Request a Tour</h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input type="tel" className="w-full border border-gray-300 rounded px-3 py-2" required />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
                onClick={() => {
                  alert("Tour request submitted! (Connect to backend later)");
                  setIsModalOpen(false);
                }}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Home Details */}
      {showValue(price) && (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Home Details</h3>
          {showValue(status) && <p>Status: {status}</p>}
          {showValue(listingId) && <p>MLS #ID: {listingId}</p>}
          {showValue(price) && <p>Price: ${price.toLocaleString()}</p>}
          {showValue(beds) && <p>Bedrooms: {beds}</p>}
          {showValue(baths) && <p>Bathrooms: {baths}</p>}
          {showValue(sqft) && <p>Square Footage: {sqft}</p>}
          {showValue(acres) && <p>Acres: {acres}</p>}
          {showValue(yearBuilt) && <p>Year: {yearBuilt}</p>}
          {showValue(type) && <p>Property Type: {type}</p>}
          {showValue(subType) && <p>Property Sub Type: {subType}</p>}
          {showValue(price) && showValue(sqft) && (
            <p>Price per Sq Ft: ${(price / sqft).toFixed(0)}</p>
          )}
          {showValue(listingDate) && <p>Date Listed: {listingDate}</p>}
        </div>
      )}

      {/* Schools */}
      {(showValue(schools.elementary) || showValue(schools.middle) || showValue(schools.high)) && (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Schools</h3>
          {showValue(schools.elementary) && <p>Elementary: {schools.elementary}</p>}
          {showValue(schools.middle) && <p>Middle: {schools.middle}</p>}
          {showValue(schools.high) && <p>High: {schools.high}</p>}
        </div>
      )}

      {/* Utilities */}
      {(showValue(utilities.sewer) || showValue(utilities.water_source)) && (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Utilities</h3>
          {showValue(utilities.sewer) && (
            <p>Sewer: {renderArray(utilities.sewer)}</p>
          )}
          {showValue(utilities.water_source) && (
            <p>Water Source: {renderArray(utilities.water_source)}</p>
          )}
        </div>
      )}

      {/* Exterior */}
      {(showValue(communityInfo.exterior_features) ||
        showValue(communityInfo.roof) ||
        showValue(communityInfo.garage_spaces) ||
        showValue(communityInfo.foundation_details)) && (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Exterior</h3>
          {showValue(communityInfo.exterior_features) && (
            <p>Exterior: {renderArray(communityInfo.exterior_features)}</p>
          )}
          {showValue(communityInfo.roof) && (
            <p>Roof: {renderArray(communityInfo.roof)}</p>
          )}
          {showValue(communityInfo.garage_spaces) && (
            <p>Garage Spaces: {communityInfo.garage_spaces}</p>
          )}
          {showValue(communityInfo.foundation_details) && (
            <p>Foundation: {renderArray(communityInfo.foundation_details)}</p>
          )}
        </div>
      )}

      {/* HOA */}
      {showValue(hoa) && (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">HOA</h3>
          <p>Has HOA: {hoa.has_hoa ? "Yes" : "No"}</p>
          {showValue(hoa.fee) && <p>Fee: ${hoa.fee}</p>}
          {showValue(hoa.includes) && hoa.includes.length > 0 && (
            <p>Includes: {hoa.includes.join(", ")}</p>
          )}
        </div>
      )}

      {/* Additional Info */}
      {(showValue(communityInfo.architectural_style) || showValue(communityInfo.builder_name)) && (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Additional Information</h3>
          {showValue(communityInfo.architectural_style) && (
            <p>Style: {renderArray(communityInfo.architectural_style)}</p>
          )}
          {showValue(communityInfo.builder_name) && (
            <p>Builder: {communityInfo.builder_name}</p>
          )}
        </div>
      )}
    </div>
  );
}
