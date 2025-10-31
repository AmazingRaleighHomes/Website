"use client";

import { useState } from "react";

export default function ListingsModalDetailsAccordion({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  // Helper: hide empty/null/[] values
  const showValue = (value) => {
    if (value === null) return false;
    if (value === undefined) return false;
    if (Array.isArray(value) && value.length === 0) return false;
    if (value === "") return false;
    return true;
  };

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
    href={`tel:${data.ListAgentPhone || "9198027282"}`}
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
        d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 001.5-1.5v-3.937a1.5 1.5 0 00-1.091-1.45l-3.583-1.02a1.5 1.5 0 00-1.63.55l-.972 1.215a11.042 11.042 0 01-5.516-5.516l1.215-.972a1.5 1.5 0 00.55-1.63l-1.02-3.583A1.5 1.5 0 005.687 3H2.25A1.5 1.5 0 00.75 4.5V6.75z"
      />
    </svg>
    Call Agent
  </a>

  {/* Facebook Messenger Button */}
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




      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setIsModalOpen(false)}
            >
              ✕
            </button>
            <h2 className="text-xl font-semibold mb-4">Request a Tour</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input type="text" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input type="email" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-gray-700">Phone</label>
                <input type="tel" className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Home Details */}
      {showValue(data.Status) && (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Home Details</h3>
          {showValue(data.Status) && <p>Status: {data.Status}</p>}
          {showValue(data.ListingId) && <p>MLS #ID: {data.ListingId}</p>}
          {showValue(data.ListPrice) && <p>Price: ${data.ListPrice.toLocaleString()}</p>}
          {showValue(data.BedroomsTotal) && <p>Bedrooms: {data.BedroomsTotal}</p>}
          {showValue(data.BathroomsTotalInteger) && <p>Bathrooms: {data.BathroomsTotalInteger}</p>}
          {showValue(data.LivingArea) && <p>Square Footage: {data.LivingArea}</p>}
          {showValue(data.LotSizeDimensions) && <p>Acres: {data.LotSizeDimensions}</p>}
          {showValue(data.YearBuilt) && <p>Year: {data.YearBuilt}</p>}
          {showValue(data.PropertyType) && <p>Property Type: {data.PropertyType}</p>}
          {showValue(data.PropertySubType) && <p>Property Sub Type: {data.PropertySubType}</p>}
          {showValue(data.ListPrice) && showValue(data.LivingArea) && (
            <p>Price per Sq Ft: ${(data.ListPrice / data.LivingArea).toFixed(0)}</p>
          )}
          {showValue(data.ListingContractDate) && <p>Date Listed: {data.ListingContractDate}</p>}
        </div>
      )}

      {/* Community Information */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">Community Information</h3>
        {showValue(data.StreetNumber) && showValue(data.StreetName) && (
          <p>Address: {`${data.StreetNumber} ${data.StreetName}`}</p>
        )}
        {showValue(data.City) && <p>City: {data.City}</p>}
        {showValue(data.StateOrProvince) && <p>State: {data.StateOrProvince}</p>}
        {showValue(data.PostalCode) && <p>Zip Code: {data.PostalCode}</p>}
        {showValue(data.CountyOrParish) && <p>County: {data.CountyOrParish}</p>}
        {showValue(data.SubdivisionName) && <p>Subdivision: {data.SubdivisionName}</p>}
      </div>

      {/* Schools */}
      {showValue(data.ElementarySchool) || showValue(data.MiddleOrJuniorSchool) || showValue(data.HighSchool) ? (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Schools</h3>
          {showValue(data.ElementarySchool) && <p>Elementary: {data.ElementarySchool}</p>}
          {showValue(data.MiddleOrJuniorSchool) && <p>Middle: {data.MiddleOrJuniorSchool}</p>}
          {showValue(data.HighSchool) && <p>High: {data.HighSchool}</p>}
        </div>
      ) : null}

      {/* Utilities */}
      {showValue(data.Sewer) || showValue(data.WaterSource) ? (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Utilities</h3>
          {showValue(data.Sewer) && <p>Sewer: {data.Sewer.join(", ")}</p>}
          {showValue(data.WaterSource) && <p>Water Source: {data.WaterSource.join(", ")}</p>}
        </div>
      ) : null}

      {/* Interior */}
      {showValue(data.InteriorFeatures) && (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Interior</h3>
          <p>{data.InteriorFeatures.join(", ")}</p>
        </div>
      )}

      {/* Exterior */}
      {showValue(data.ExteriorFeatures) || showValue(data.Roof) || showValue(data.GarageSpaces) || showValue(data.FoundationDetails) ? (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Exterior</h3>
          {showValue(data.ExteriorFeatures) && <p>Exterior: {data.ExteriorFeatures.join(", ")}</p>}
          {showValue(data.Roof) && <p>Roof: {data.Roof.join(", ")}</p>}
          {showValue(data.GarageSpaces) && <p>Garage Spaces: {data.GarageSpaces}</p>}
          {showValue(data.FoundationDetails) && <p>Foundation: {data.FoundationDetails.join(", ")}</p>}
        </div>
      ) : null}

      {/* HOA */}
      {showValue(data.AssociationYN) || showValue(data.AssociationFeeIncludes) || showValue(data.AssociationFee) ? (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">HOA</h3>
          {showValue(data.AssociationYN) && <p>Has HOA: {data.AssociationYN ? "Yes" : "No"}</p>}
          {showValue(data.AssociationFeeIncludes) && <p>Services included: {data.AssociationFeeIncludes.join(", ")}</p>}
          {showValue(data.AssociationFee) && <p>HOA fee: ${data.AssociationFee}</p>}
        </div>
      ) : null}

      {/* Additional Information */}
      {showValue(data.ArchitecturalStyle) || showValue(data.BuilderName) ? (
        <div className="border border-gray-200 rounded-lg p-4 text-left">
          <h3 className="font-semibold mb-2">Additional Information</h3>
          {showValue(data.ArchitecturalStyle) && <p>Styles: {data.ArchitecturalStyle.join(", ")}</p>}
          {showValue(data.ListPrice) && showValue(data.LivingArea) && (
            <p>Price per Sq Ft: ${(data.ListPrice / data.LivingArea).toFixed(0)}</p>
          )}
          {showValue(data.BuilderName) && <p>Builder Name: {data.BuilderName}</p>}
        </div>
      ) : null}

    </div>
  );
}
