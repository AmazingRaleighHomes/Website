"use client";

import { Suspense, useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import MLS from "@/components/MLS";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

function getInitialSearchState() {
  if (typeof window === "undefined") {
    return {
      area: "Raleigh-Durham",
      filters: {},
    };
  }

  const params = new URLSearchParams(window.location.search);
  const area = params.get("area") || "Raleigh-Durham";
  const query = params.get("query") || "";
  const price = params.get("price") || "Any Price";

  return {
    area,
    filters: {
      area,
      query,
      price,
    },
  };
}

export default function HomePageClient() {
  const [selectedArea, setSelectedArea] = useState("Raleigh-Durham");
  const [mlsFilters, setMlsFilters] = useState({});

  useEffect(() => {
    const initialState = getInitialSearchState();
    setSelectedArea(initialState.area);
    setMlsFilters(initialState.filters);
  }, []);

  const handleSearch = (filters) => {
    setMlsFilters(filters);
    if (filters.area) {
      setSelectedArea(filters.area);
    }

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);

      if (filters.area && filters.area !== "Raleigh-Durham") {
        params.set("area", filters.area);
      } else {
        params.delete("area");
      }

      if (filters.query?.trim()) {
        params.set("query", filters.query.trim());
      } else {
        params.delete("query");
      }

      if (filters.price && filters.price !== "Any Price") {
        params.set("price", filters.price);
      } else {
        params.delete("price");
      }

      const queryString = params.toString();
      const nextUrl = queryString
        ? `${window.location.pathname}?${queryString}${window.location.hash}`
        : `${window.location.pathname}${window.location.hash}`;

      window.history.replaceState({}, "", nextUrl);
    }
  };

  return (
    <main>
      <Navbar />
      <HeroSection
        selectedArea={selectedArea}
        setSelectedArea={setSelectedArea}
        onSearch={handleSearch}
      />
      <Suspense fallback={null}>
        <MLS
          filters={mlsFilters}
          onSearch={handleSearch}
          selectedArea={selectedArea}
          setSelectedArea={setSelectedArea}
        />
      </Suspense>
      <Journey />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}
