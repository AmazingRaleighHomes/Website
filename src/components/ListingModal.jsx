"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FaShareAlt } from "react-icons/fa";
import dynamic from "next/dynamic";
import ListingsModalHeader from "./ListingsModalHeader";
import ListingsModalPropertySummary from "./ListingsModalPropertySummary";
import ListingsModalDetailsAccordion from "./ListingsModalDetailsAccordion";
import "leaflet/dist/leaflet.css";
import ListingsModalHeroGallery from "./ListingsModalHeroGallery";
import ListingsModalContactForm from "./ListingsModalContactForm";


// Dynamically import react-leaflet components (SSR-safe)
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Custom Marker Icon (client-only)
let customMarker;
if (typeof window !== "undefined") {
  const L = require("leaflet");
  customMarker = new L.Icon({
    iconUrl: "/images/custom-marker.png",
    iconRetinaUrl: "/images/custom-marker@2x.png",
    iconSize: [45, 45],
    iconAnchor: [17, 45],
    popupAnchor: [0, -40],
    shadowUrl: "/images/marker-shadow.png",
    shadowSize: [45, 45],
    shadowAnchor: [17, 45],
  });
}

export default function ListingsModal({ property, isOpen, onClose }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);
  if (!property || !isOpen || !isClient) return null;

  // Map Component
  const ListingsModalMap = ({ lat, lng }) => {
    const mapRef = useRef(null);

    useEffect(() => {
      const resizeMap = () => {
        if (mapRef.current) {
          mapRef.current.invalidateSize(false);
          mapRef.current.panTo([lat, lng]);
        }
      };
      const timers = [setTimeout(resizeMap, 200), setTimeout(resizeMap, 600), setTimeout(resizeMap, 1200)];
      return () => timers.forEach(clearTimeout);
    }, [lat, lng]);

    return (
      <div className="relative w-full h-72 mt-4 rounded-lg overflow-hidden shadow-sm z-0">
        <MapContainer
          center={[lat, lng]}
          zoom={15}
          scrollWheelZoom={false}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
          className="w-full h-full"
          style={{ width: "100%", height: "100%" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO'
          />
          <Marker position={[lat, lng]} icon={customMarker}>
            <Popup>📍 {property?.UnparsedAddress}</Popup>
          </Marker>
        </MapContainer>
        <style jsx>{`
          .leaflet-container {
            filter: hue-rotate(195deg) saturate(1.2) brightness(1.05);
          }
        `}</style>
      </div>
    );
  };
  return (
    <>
      <ListingsModalHeader onBack={onClose} onShare={() => alert("Share this listing!")} logoSrc="/images/logo.png" />

      <AnimatePresence>
<motion.div
  className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 overflow-auto p-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  onClick={onClose}
>
  <motion.div
    className="bg-white rounded-2xl overflow-hidden w-full max-w-[1200px] shadow-lg relative mt-10"
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    exit={{ scale: 0.8 }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* FULL WIDTH HERO */}
    <div className="relative w-full overflow-hidden">
      <ListingsModalHeroGallery
        images={property?.Media || []}
        onOpenGallery={() => console.log("Open gallery modal")}
        height="h-[600px]" // or larger if you want
      />
    </div>

            {/* Modal Content */}
<div className="w-full px-6 pt-6">
  <div className="flex flex-col md:flex-row gap-6">
    {/* LEFT COLUMN (2/3) */}
    <div className="flex-1 min-w-0">
      {/* Buttons Back / Share */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={onClose} className="text-gray-700 hover:underline">
          Back to Listings
        </button>
        <button className="flex items-center gap-1 text-gray-700 hover:text-[#d7595d] transition-colors">
          <FaShareAlt /> Share
        </button>
      </div>

      {/* Property Summary */}
      <ListingsModalPropertySummary property={property} />

      {/* Map */}
      {property.Latitude && property.Longitude && (
        <ListingsModalMap lat={property.Latitude} lng={property.Longitude} />
      )}

      {/* Community Details */}
      {property.community && <ListingsModalDetailsAccordion community={property.community} />}

      {/* Contact Form below the map */}
      <div className="mt-6">
        <ListingsModalContactForm 
          propertyId={property.ListingId} 
          property={property} 
        />
      </div>
    </div>

   {/* RIGHT COLUMN */}
<div className="w-full md:w-1/3 flex-shrink-0 bg-gray-50 p-6 space-y-5 border-t md:border-t-0 md:border-l border-gray-200">
  <ListingsModalDetailsAccordion data={property} />
</div>

  </div>
</div>

          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
