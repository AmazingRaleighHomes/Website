"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  FaChevronLeft, FaChevronRight, FaBed, FaBath, FaCar, 
  FaRulerCombined, FaMapMarkerAlt, FaShareAlt, FaDownload 
} from "react-icons/fa";
import dynamic from "next/dynamic";

// Dynamically import Leaflet components to prevent SSR errors
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Fix Leaflet default icon
import L from "leaflet";
import "leaflet/dist/leaflet.css";
// Example: custom marker icon
const customMarker = new L.Icon({
  iconUrl: "/images/custom-marker.png", // path to your custom icon
  iconRetinaUrl: "/images/custom-marker@2x.png", // optional retina version
  iconSize: [45, 45], // size of the icon [width, height]
  iconAnchor: [17, 45], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -40], // where the popup opens relative to iconAnchor
  shadowUrl: "/images/marker-shadow.png", // optional shadow
  shadowSize: [45, 45],
  shadowAnchor: [17, 45],
});

export default function ListingModal({ property, isOpen, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isClient, setIsClient] = useState(false);

  // Log the property object for debugging field names
  useEffect(() => {
    if (property) {
      console.log("ListingModal property object:", property);
    }
  }, [property]);

  useEffect(() => {
    setIsClient(true); // ensures client-only rendering
  }, []);

  if (!property || !isOpen) return null;

  const images = property.Media?.length > 0 ? property.Media : [{ MediaURL: "/images/no-image.jpg" }];

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  // Formatters
  const formatPrice = (val) => (val ? `$${val.toLocaleString()}` : "N/A");
  const formatSqft = (val) => (val ? `${val.toLocaleString()} sqft` : "N/A");

  // Badges
  const badges = [];
  if (property.DaysOnMarket && property.DaysOnMarket < 7) badges.push("New Listing");
  if (property.PriceReductionAmount) badges.push("Price Reduced");

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 overflow-auto p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl overflow-hidden max-w-5xl w-full shadow-lg"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Carousel */}
          <div className="relative w-full h-96 bg-gray-100 flex items-center justify-center">
            <img
              src={images[currentImage].MediaURL}
              alt={`Property image ${currentImage + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 z-10"
                >
                  <FaChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 z-10"
                >
                  <FaChevronRight size={20} />
                </button>
              </>
            )}
            {/* Badges */}
            <div className="absolute top-2 left-2 flex gap-2">
              {badges.map((b, i) => (
                <span key={i} className="bg-[#d7595d] text-white px-3 py-1 rounded-full text-xs font-semibold">{b}</span>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="p-6 space-y-4">
            {/* Price & Address */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <h2 className="text-2xl font-bold text-[#d7595d]">{formatPrice(property.ListPrice)}</h2>
              <p className="text-gray-700">{property.UnparsedAddress || "Address unavailable"}</p>
            </div>

           {/* Features Icons */}
<div className="flex flex-wrap gap-4 text-gray-600 text-sm">
  <div className="flex items-center gap-1">
    <FaBed /> {property.BedroomsTotal ?? "N/A"} Beds
  </div>
  <div className="flex items-center gap-1">
    <FaBath /> {(property.BathroomsFull ?? 0) + (property.BathroomsHalf ?? 0)} Baths
  </div>
  <div className="flex items-center gap-1">
    <FaCar /> {property.GarageSpaces ?? property.Garage ?? "N/A"} Garage
  </div>
  <div className="flex items-center gap-1">
    <FaRulerCombined /> {formatSqft(property.LivingArea ?? property.LotSizeTotal ?? property.SquareFootage)}
  </div>
  {/* Schools */}
  <div className="flex flex-col gap-0.5">
    <div className="flex items-center gap-1">
      <FaMapMarkerAlt /> {property.HighSchool ?? "N/A"}
    </div>
  </div>
</div>



            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <button className="bg-[#d7595d] hover:bg-[#ebcc65] text-white px-6 py-2 rounded-full font-medium transition">Schedule Viewing</button>
              <a href={`tel:${property.AgentPhone || ""}`} className="bg-gray-100 hover:bg-gray-200 px-6 py-2 rounded-full text-gray-800 font-medium transition text-center">Call Agent</a>
              <button className="bg-[#ebcc65] hover:bg-[#d7595d] text-white px-6 py-2 rounded-full font-medium transition flex items-center gap-2"><FaShareAlt /> Share</button>
              <button className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full font-medium transition flex items-center gap-2"><FaDownload /> Download PDF</button>
            </div>

            {/* Description */}
            {property.Description && <p className="text-gray-600 mt-2">{property.Description}</p>}

      {/* Map */}
{isClient && property.Latitude && property.Longitude && (
  <div className="w-full h-64 mt-4 rounded-lg overflow-hidden">
    <MapContainer
      center={[property.Latitude, property.Longitude]}
      zoom={15}
      scrollWheelZoom={false}
      className="w-full h-full"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker
        position={[property.Latitude, property.Longitude]}
        icon={customMarker} // <-- custom icon added here
      >
        <Popup>{property.UnparsedAddress}</Popup>
      </Marker>
    </MapContainer>
  </div>
)}

            {/* Agent Info */}
            {property.AgentName && (
              <div className="mt-4 border-t pt-4 flex items-center gap-4">
                {property.AgentPhoto && <img src={property.AgentPhoto} alt={property.AgentName} className="w-12 h-12 rounded-full object-cover" />}
                <div>
                  <p className="font-semibold">{property.AgentName}</p>
                  <p className="text-sm text-gray-600">{property.AgentEmail || property.AgentPhone}</p>
                </div>
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-full font-medium transition"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
