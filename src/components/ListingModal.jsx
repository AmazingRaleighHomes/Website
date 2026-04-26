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
  const [shareStatus, setShareStatus] = useState("");
  useEffect(() => setIsClient(true), []);

  if (!property || !isOpen || !isClient) return null;

  const handleShare = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}?listing=${property.ListingId || property.id || ""}`
        : "";

    const sharePayload = {
      title: property.ListingName || property.address || "Ulrich Realty Listing",
      text: property.address
        ? `Take a look at this property: ${property.address}`
        : "Take a look at this Ulrich Realty listing.",
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(sharePayload);
        setShareStatus("Shared");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus("Link copied");
      } else {
        setShareStatus("Share unavailable");
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        setShareStatus("Share unavailable");
      }
    } finally {
      window.setTimeout(() => setShareStatus(""), 2200);
    }
  };

  return (
    <>
      <ListingsModalHeader
        onBack={onClose}
        logoSrc="/favicon/favicon.svg"
      />

      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-auto bg-black/70 p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative mt-8 w-full max-w-[1240px] overflow-hidden rounded-[2rem] border border-[#e6ddd4] bg-[#f6f1e8] shadow-[0_35px_90px_rgba(0,0,0,0.28)]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <ListingsModalHeroGallery
              images={property.images || property.Media || []}
              height="h-[600px]"
            />

            <div className="w-full px-4 py-5 sm:px-6 sm:py-6">
              <div className="flex flex-col gap-6 lg:flex-row">
                <div className="min-w-0 flex-1 space-y-6">
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

                  <div id="tour-request">
                    <ListingsModalContactForm
                      propertyId={property.ListingId}
                      property={property}
                    />
                  </div>
                </div>

                <div className="w-full flex-shrink-0 lg:w-[340px]">
                  <ListingsModalDetailsAccordion
                    data={property}
                    onShare={handleShare}
                    shareStatus={shareStatus}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
