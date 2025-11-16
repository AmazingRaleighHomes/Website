"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import ListingsModalHeader from "./ListingsModalHeader";
import ListingsModalPropertySummary from "./ListingsModalPropertySummary";
import ListingsModalDetailsAccordion from "./ListingsModalDetailsAccordion";
import ListingsModalHeroGallery from "./ListingsModalHeroGallery";
import ListingsModalContactForm from "./ListingsModalContactForm";
import "leaflet/dist/leaflet.css";

// Dynamically import react-leaflet components
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

// Custom Marker Icon
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

// Map component
function ListingsModalMap({ lat, lng, property, isOpen }) {
  const mapRef = useRef(null);
  const [showMap, setShowMap] = useState(false);

  // Only render map after modal is open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setShowMap(true), 50); // small delay to ensure DOM is painted
      return () => clearTimeout(t);
    } else {
      setShowMap(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
      mapRef.current.panTo([lat, lng], { animate: true, duration: 0.5 });
    }
  }, [showMap, lat, lng]);

  if (!showMap) return null;

  return (
    <div className="relative w-full h-80 sm:h-[400px] mt-4 rounded-lg overflow-hidden shadow-sm">
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false}
        whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; CARTO'
        />
        {customMarker && (
          <Marker position={[lat, lng]} icon={customMarker}>
            <Popup>📍 {property?.UnparsedAddress || property?.address}</Popup>
          </Marker>
        )}
      </MapContainer>
      <style jsx>{`
        .leaflet-container {
          filter: hue-rotate(195deg) saturate(1.2) brightness(1.05);
        }
      `}</style>
    </div>
  );
}

export default function ListingModal({ property, isOpen, onClose }) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  if (!property || !isOpen || !isClient) return null;

  return (
    <>
      <ListingsModalHeader
        onBack={onClose}
        onShare={() => alert("Share this listing!")}
        logoSrc="/images/logo.png"
      />

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
            {/* HERO GALLERY */}
            <ListingsModalHeroGallery
              images={property.images || property.Media || []}
              height="h-[600px]"
            />

            {/* MAIN CONTENT */}
            <div className="w-full px-6 pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* LEFT COLUMN */}
                <div className="flex-1 min-w-0 space-y-6">
                  <ListingsModalPropertySummary
                    property={{
                      ...property,
                      description: property.description || property.PublicRemarks,
                    }}
                  />

                  {/* Map */}
                  {property.Latitude && property.Longitude && (
                    <ListingsModalMap
                      lat={Number(property.Latitude)}
                      lng={Number(property.Longitude)}
                      property={property}
                      isOpen={isOpen}
                    />
                  )}

                  {/* Contact Form */}
                  <ListingsModalContactForm
                    propertyId={property.ListingId}
                    property={property}
                  />
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
