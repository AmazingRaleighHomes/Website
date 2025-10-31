"use client";

export default function ListingsModalDetailsAccordion({ data }) {
  if (!data) return null;

  console.log("Spark property data:", data); // for debugging

  return (
    <div className="space-y-4">

      {/* Home Details */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">Home Details</h3>
        <p>Status: {data.StandardStatus}</p>
        <p>MLS #ID: {data.ListingKey}</p>
        <p>Price: {data.ListPrice}</p>
        <p>Bedrooms: {data.BedroomsTotal}</p>
        <p>Bathrooms: {data.BathroomsTotalInteger}</p>
        <p>Square Footage: {data.LivingArea}</p>
        <p>Acres: {data.LotSizeAcres}</p>
        <p>Year: {data.YearBuilt}</p>
        <p>Days on Site: {data.DOH1}</p>
        <p>Property Type: {data.PropertyType}</p>
        <p>Property Sub Type: {data.PropertySubType}</p>
        <p>Price per Sq Ft: {data.ListPrice && data.LivingArea ? (data.ListPrice / data.LivingArea).toFixed(0) : ""}</p>
        <p>Date Listed: {data.ListingContractDate}</p>
      </div>

      {/* Community Information */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">Community Information</h3>
        <p>Address: {data.StreetNumber} {data.StreetName} {data.StreetSuffix}</p>
        <p>City: {data.City}</p>
        <p>State: {data.StateOrProvince}</p>
        <p>Zip Code: {data.PostalCode}</p>
        <p>County: {data.CountyOrParish}</p>
        <p>Subdivision: {data.SubdivisionName}</p>
      </div>

      {/* Schools */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">Schools</h3>
        <p>Elementary: {data.ElementarySchool}</p>
        <p>Middle: {data.MiddleOrJuniorSchool}</p>
        <p>High: {data.HighSchool}</p>
      </div>

      {/* Utilities */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">Utilities</h3>
        <p>Sewer: {data.Sewer?.join(", ")}</p>
        <p>Water Source: {data.WaterSource?.join(", ")}</p>
      </div>

      {/* Interior */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">Interior</h3>
        <p>Features: {data.InteriorFeatures?.join(", ")}</p>
        <p>Appliances: {data.Appliances?.join(", ")}</p>
      </div>

      {/* Exterior */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">Exterior</h3>
        <p>Exterior Features: {data.ExteriorFeatures?.join(", ")}</p>
        <p>Roof: {data.Roof?.join(", ")}</p>
        <p>Garage Spaces: {data.GarageSpaces}</p>
        <p>Foundation: {data.FoundationDetails?.join(", ")}</p>
      </div>

      {/* HOA */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">HOA</h3>
        <p>Has HOA: {data.AssociationYN ? "Yes" : "No"}</p>
        <p>Services included: {data.AssociationFeeIncludes?.join(", ")}</p>
        <p>HOA fee: {data.AssociationFee ? `$${data.AssociationFee}` : "N/A"}</p>
      </div>

      {/* Additional Information */}
      <div className="border border-gray-200 rounded-lg p-4 text-left">
        <h3 className="font-semibold mb-2">Additional Information</h3>
        <p>Styles: {data.ArchitecturalStyle?.join(", ")}</p>
        <p>Price per Sq Ft: {data.ListPrice && data.LivingArea ? (data.ListPrice / data.LivingArea).toFixed(0) : ""}</p>
        <p>Builder Name: {data.BuilderName || "N/A"}</p>
      </div>

    </div>
  );
}
