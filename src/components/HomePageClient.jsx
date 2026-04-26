"use client";

import { Suspense, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import MLS from "@/components/MLS";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function HomePageClient() {
  const [selectedArea, setSelectedArea] = useState("Raleigh-Durham");
  const [mlsFilters, setMlsFilters] = useState({});

  const handleSearch = (filters) => {
    setMlsFilters(filters);
    if (filters.area) {
      setSelectedArea(filters.area);
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
