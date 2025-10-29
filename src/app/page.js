"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import MLS from "@/components/MLS";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

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
      
      {/* MLS component receives filters */}
      <MLS filters={mlsFilters} />
      
      <Journey />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}
