"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  FaChevronLeft,
  FaChevronRight,
  FaBed,
  FaBath,
  FaRulerCombined,
  FaLeaf,
} from "react-icons/fa";
import ListingModal from "./ListingModal";
import { supabase } from "@/lib/supabase";

export default function MLSProperties({ filters = {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [imageIndexes, setImageIndexes] = useState({});

  const perPage = 12;
  const propertyTypes = ["All", "Single Family", "Townhouse", "Condo", "Apartment"];
  const listingParam = searchParams.get("listing");
  const normalizeSearchText = (value) =>
    String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();

  useEffect(() => {
    async function fetchMLS() {
      setLoading(true);
      try {
        const { data, error: fetchError } = await supabase
          .from("properties")
          .select("*")
          .order("dateAdded", { ascending: false });

        if (fetchError) {
          setError(fetchError.message);
        } else {
          setProperties(data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMLS();
  }, []);

  useEffect(() => {
    if (!listingParam || properties.length === 0) return;

    const matchedProperty = properties.find((property) => {
      const possibleIds = [
        property.ListingId,
        property.listingId,
        property.id,
      ]
        .filter(Boolean)
        .map((value) => String(value));

      return possibleIds.includes(String(listingParam));
    });

    if (matchedProperty) {
      setSelectedProperty(matchedProperty);
    }
  }, [listingParam, properties]);

  const updateListingQuery = (listingValue) => {
    const params = new URLSearchParams(searchParams.toString());

    if (listingValue) {
      params.set("listing", String(listingValue));
    } else {
      params.delete("listing");
    }

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const openPropertyModal = (property) => {
    setSelectedProperty(property);
    updateListingQuery(property.ListingId || property.listingId || property.id);
  };

  const closePropertyModal = () => {
    setSelectedProperty(null);
    updateListingQuery(null);
  };

  let filtered =
    selectedType === "All"
      ? properties
      : properties.filter((p) => p.type === selectedType);

  if (filters.price && filters.price !== "Any Price") {
    const priceMax = (() => {
      switch (filters.price) {
        case "$100k":
          return 100_000;
        case "$300k":
          return 300_000;
        case "$500k":
          return 500_000;
        case "$750k+":
          return Infinity;
        default:
          return Infinity;
      }
    })();
    filtered = filtered.filter((p) => p.price <= priceMax);
  }

  if (filters.query && filters.query.trim() !== "") {
    const normalizedQuery = normalizeSearchText(filters.query);
    const queryTokens = normalizedQuery.split(" ").filter(Boolean);

    filtered = filtered.filter((p) => {
      const searchableText = normalizeSearchText(
        [
          p.address,
          p.UnparsedAddress,
          p.ListingName,
          p.subdivision,
          p.city,
          p.City,
          p.type,
          p.zip,
          p.postalCode,
          p.PostalCode,
          p.ListingId,
        ].join(" ")
      );

      if (!searchableText) return false;

      return queryTokens.every((token) => searchableText.includes(token));
    });
  }

  if (filters.area && filters.area !== "Raleigh-Durham") {
    const areaQuery = normalizeSearchText(filters.area);
    filtered = filtered.filter(
      (p) =>
        normalizeSearchText(
          [p.address, p.UnparsedAddress, p.subdivision, p.city, p.City].join(" ")
        ).includes(areaQuery)
    );
  }

  const displayedProperties = filtered.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );
  const maxPage = Math.ceil(filtered.length / perPage);

  const getImageIndex = (id) => imageIndexes[id] || 0;

  const changeImage = (id, direction, total) => {
    setImageIndexes((prev) => {
      const current = prev[id] || 0;
      const next =
        direction === "next"
          ? (current + 1) % total
          : (current - 1 + total) % total;
      return { ...prev, [id]: next };
    });
  };

  const getTimeAgo = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffHours < 1) return "Added just now";
    if (diffHours < 24) {
      return `Added ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    }

    const diffDays = Math.floor(diffHours / 24);
    return `Added ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  };

  const resultsSummary = (() => {
    const summaryParts = [];

    if (filters.area) {
      summaryParts.push(
        filters.area === "Raleigh-Durham" ? "across Raleigh-Durham" : `in ${filters.area}`
      );
    }

    if (filters.query?.trim()) {
      summaryParts.push(`matching "${filters.query.trim()}"`);
    }

    if (filters.price && filters.price !== "Any Price") {
      summaryParts.push(`under ${filters.price}`);
    }

    if (selectedType !== "All") {
      summaryParts.push(`for ${selectedType.toLowerCase()} homes`);
    }

    return summaryParts.length > 0
      ? `Showing ${filtered.length} ${filtered.length === 1 ? "home" : "homes"} ${summaryParts.join(" ")}`
      : `Showing ${filtered.length} ${filtered.length === 1 ? "home" : "homes"} across Raleigh-Durham`;
  })();

  return (
    <section id="mls-listings" className="bg-[#f6f1e8] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 text-center"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
            Search Raleigh Listings
          </p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#1f1c17] sm:text-5xl">
            Browse current inventory by property style and lifestyle fit.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#6f675f]">
            Inspired by the reference site&apos;s category-first browsing, but
            tied directly into your live property feed and modal experience.
          </p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedType(type);
                setCurrentPage(1);
              }}
              className={`rounded-full border px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition-all ${
                selectedType === type
                  ? "border-[#d86a45] bg-[#1f1b17] text-white"
                  : "border-[#d8cec4] bg-[#fffaf5] text-[#5f5750] hover:border-[#1f1b17] hover:bg-white"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {!loading && !error && (
          <div className="mb-8 rounded-[1.4rem] border border-[#e6ddd4] bg-[#fffaf5] px-5 py-4 text-center text-sm leading-6 text-[#6f675f] shadow-sm">
            <span className="font-semibold text-[#1f1c17]">Results:</span> {resultsSummary}
          </div>
        )}

        {loading && <p className="text-center text-[#6f675f]">Finding your forever home...</p>}
        {error && <p className="text-center text-red-500">Oh no! I dropped the ball: {error}</p>}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {displayedProperties.map((property) => {
              const id = property.id;
              const media = property.images || [];
              const totalImages = media.length || 1;
              const index = getImageIndex(id);
              const currentImage = media[index] || "/images/no-image.jpg";
              const addedText = getTimeAgo(property.dateAdded);

              return (
                <motion.div
                  key={id}
                  whileHover={{ scale: 1.03 }}
                  className="relative cursor-pointer overflow-hidden rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] shadow-[0_20px_60px_rgba(48,36,24,0.08)] transition-all duration-300"
                  onClick={() => openPropertyModal(property)}
                >
                  <div className="relative h-56 w-full overflow-hidden rounded-t-[2rem] bg-gray-200">
                    <img
                      src={currentImage}
                      alt={property.address || "Property image"}
                      className="h-full w-full object-cover"
                    />

                    {addedText && (
                      <div className="pointer-events-none absolute left-4 top-4 z-35 rounded-full bg-[#1f1b17] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-lg">
                        {addedText}
                      </div>
                    )}

                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeImage(id, "prev", totalImages);
                          }}
                          className="pointer-events-auto absolute left-3 top-1/2 z-35 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/70"
                          aria-label="Previous image"
                        >
                          <FaChevronLeft size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            changeImage(id, "next", totalImages);
                          }}
                          className="pointer-events-auto absolute right-3 top-1/2 z-35 -translate-y-1/2 rounded-full bg-black/45 p-2 text-white transition hover:bg-black/70"
                          aria-label="Next image"
                        >
                          <FaChevronRight size={16} />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="p-5 text-left">
                    <div className="mb-2 flex items-start justify-between gap-4">
                      <p className="text-xl font-semibold text-[#d86a45]">
                        ${property.price ? property.price.toLocaleString() : "N/A"}
                      </p>
                      <span className="rounded-full bg-[#f3e2d8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9b5a40]">
                        {property.type || "Home"}
                      </span>
                    </div>

                    <p className="text-base font-medium leading-6 text-[#1f1c17]">
                      {property.address || "Address unavailable"}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#6f675f]">
                      {property.beds && (
                        <div className="flex items-center gap-1.5">
                          <FaBed size={14} /> {property.beds} beds
                        </div>
                      )}
                      {property.baths > 0 && (
                        <div className="flex items-center gap-1.5">
                          <FaBath size={14} /> {property.baths} baths
                        </div>
                      )}
                      {property.sqft && (
                        <div className="flex items-center gap-1.5">
                          <FaRulerCombined size={14} /> {property.sqft.toLocaleString()} sqft
                        </div>
                      )}
                      {property.acres && (
                        <div className="flex items-center gap-1.5">
                          <FaLeaf size={14} /> {property.acres} acres
                        </div>
                      )}
                    </div>

                    <button className="mt-5 w-full rounded-full border border-[#e2b39f]/40 bg-[#d86a45] py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#bf5532]">
                      View Details
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && !error && filtered.length > perPage && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setCurrentPage(currentPage < maxPage ? currentPage + 1 : 1)}
              className="rounded-full border border-[#1f1b17] bg-[#1f1b17] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#312923]"
            >
              Load More Listings
            </button>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="rounded-[2rem] border border-dashed border-[#d8cec4] bg-[#fffaf5] px-6 py-12 text-center text-[#6f675f]">
            No listings matched that combination yet. Try a broader location or
            a higher max price to see more homes.
          </div>
        )}

        <ListingModal
          property={selectedProperty}
          isOpen={!!selectedProperty}
          onClose={closePropertyModal}
        />
      </div>
    </section>
  );
}
