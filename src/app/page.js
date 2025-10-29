"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

// Dynamically import MLS so any browser-only code inside it (like Leaflet maps) won't run on the server
const MLS = dynamic(() => import("@/components/MLS"), { ssr: false });

export default function Home() {
  // State to hold filters from HeroSection
  const [mlsFilters, setMlsFilters] = useState({});

  const handleSearch = (filters) => {
    setMlsFilters(filters);
  };

  return (
    <main>
      <Navbar />

      {/* HeroSection passes search filters */}
      <HeroSection selectedArea="Raleigh-Durham" onSearch={handleSearch} />

      {/* MLS component receives filters (client-only) */}
      <MLS filters={mlsFilters} />

      <Journey />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}
