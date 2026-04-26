"use client";

import { FaShareAlt } from "react-icons/fa";

const showValue = (value) => {
  if (value === null || value === undefined) return false;
  if (Array.isArray(value) && value.length === 0) return false;
  if (typeof value === "object" && Object.keys(value).length === 0) return false;
  if (value === "") return false;
  return true;
};

const renderArray = (value) => {
  if (Array.isArray(value)) return value.join(", ");
  return value ?? "";
};

function DetailCard({ title, children }) {
  if (!children) return null;

  return (
    <div className="rounded-[1.5rem] border border-[#e6ddd4] bg-white p-5">
      <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-[#a15b41]">
        {title}
      </h3>
      <div className="mt-4 space-y-2 text-sm leading-6 text-[#5f5750]">{children}</div>
    </div>
  );
}

export default function ListingsModalDetailsAccordion({ data, onShare, shareStatus }) {
  if (!data) {
    return <p className="text-red-600">No listing data provided.</p>;
  }

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

  const communityInfo = data.community_info || {};
  const schools = communityInfo.schools || {};
  const utilities = communityInfo.utilities || {};
  const hoa = communityInfo.hoa || {};

  return (
    <div className="space-y-5">
      <div className="sticky top-5 rounded-[1.8rem] border border-[#e6ddd4] bg-[#fffaf5] p-5 shadow-[0_18px_50px_rgba(48,36,24,0.08)]">
        <p className="text-sm uppercase tracking-[0.24em] text-[#a15b41]">
          Quick Actions
        </p>
        <div className="mt-4 space-y-3">
          <a
            href={`tel:${ListAgentPhone || "9198027282"}`}
            className="flex w-full items-center justify-center rounded-full border border-[#e2b39f]/40 bg-[#d86a45] px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#bf5532]"
          >
            Call Agent
          </a>
          <a
            href="#tour-request"
            className="flex w-full items-center justify-center rounded-full border border-[#d8cec4] bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#1f1c17] transition hover:border-[#d86a45] hover:text-[#d86a45]"
          >
            Request A Tour
          </a>
          <button
            onClick={onShare}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-[#d8cec4] bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#1f1c17] transition hover:border-[#d86a45] hover:text-[#d86a45]"
          >
            <FaShareAlt />
            {shareStatus || "Share Listing"}
          </button>
          <a
            href="https://m.me/mike.ulrich81"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center rounded-full border border-[#d8cec4] bg-white px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-[#1f1c17] transition hover:border-[#d86a45] hover:text-[#d86a45]"
          >
            Message Agent
          </a>
        </div>
      </div>

      <DetailCard title="Home Details">
        {showValue(status) && <p>Status: {status}</p>}
        {showValue(listingId) && <p>MLS ID: {listingId}</p>}
        {showValue(price) && <p>Price: ${price.toLocaleString()}</p>}
        {showValue(beds) && <p>Bedrooms: {beds}</p>}
        {showValue(baths) && <p>Bathrooms: {baths}</p>}
        {showValue(sqft) && <p>Square Footage: {sqft}</p>}
        {showValue(acres) && <p>Acres: {acres}</p>}
        {showValue(yearBuilt) && <p>Year Built: {yearBuilt}</p>}
        {showValue(type) && <p>Property Type: {type}</p>}
        {showValue(subType) && <p>Property Sub Type: {subType}</p>}
        {showValue(price) && showValue(sqft) && <p>Price per Sq Ft: ${(price / sqft).toFixed(0)}</p>}
        {showValue(listingDate) && <p>Date Listed: {listingDate}</p>}
      </DetailCard>

      {(showValue(schools.elementary) ||
        showValue(schools.middle) ||
        showValue(schools.high)) && (
        <DetailCard title="Schools">
          {showValue(schools.elementary) && <p>Elementary: {schools.elementary}</p>}
          {showValue(schools.middle) && <p>Middle: {schools.middle}</p>}
          {showValue(schools.high) && <p>High: {schools.high}</p>}
        </DetailCard>
      )}

      {(showValue(utilities.sewer) || showValue(utilities.water_source)) && (
        <DetailCard title="Utilities">
          {showValue(utilities.sewer) && <p>Sewer: {renderArray(utilities.sewer)}</p>}
          {showValue(utilities.water_source) && (
            <p>Water Source: {renderArray(utilities.water_source)}</p>
          )}
        </DetailCard>
      )}

      {(showValue(communityInfo.exterior_features) ||
        showValue(communityInfo.roof) ||
        showValue(communityInfo.garage_spaces) ||
        showValue(communityInfo.foundation_details)) && (
        <DetailCard title="Exterior">
          {showValue(communityInfo.exterior_features) && (
            <p>Exterior: {renderArray(communityInfo.exterior_features)}</p>
          )}
          {showValue(communityInfo.roof) && <p>Roof: {renderArray(communityInfo.roof)}</p>}
          {showValue(communityInfo.garage_spaces) && (
            <p>Garage Spaces: {communityInfo.garage_spaces}</p>
          )}
          {showValue(communityInfo.foundation_details) && (
            <p>Foundation: {renderArray(communityInfo.foundation_details)}</p>
          )}
        </DetailCard>
      )}

      {showValue(hoa) && (
        <DetailCard title="HOA">
          <p>Has HOA: {hoa.has_hoa ? "Yes" : "No"}</p>
          {showValue(hoa.fee) && <p>Fee: ${hoa.fee}</p>}
          {showValue(hoa.includes) && hoa.includes.length > 0 && (
            <p>Includes: {hoa.includes.join(", ")}</p>
          )}
        </DetailCard>
      )}

      {(showValue(communityInfo.architectural_style) ||
        showValue(communityInfo.builder_name)) && (
        <DetailCard title="Additional Information">
          {showValue(communityInfo.architectural_style) && (
            <p>Style: {renderArray(communityInfo.architectural_style)}</p>
          )}
          {showValue(communityInfo.builder_name) && (
            <p>Builder: {communityInfo.builder_name}</p>
          )}
        </DetailCard>
      )}
    </div>
  );
}
