"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import MLS from "@/components/MLS";
import Journey from "@/components/Journey";
import Testimonials from "@/components/Testimonials";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

export default function HomePageClient() {
  const [mlsFilters, setMlsFilters] = useState({});

  const handleSearch = (filters) => {
    setMlsFilters(filters);
  };

  return (
    <main>
      <Navbar />
      <HeroSection selectedArea="Raleigh-Durham" onSearch={handleSearch} />
      <MLS filters={mlsFilters} />
      <Journey />
      <Testimonials />
      <Blog />
      <Footer />
    </main>
  );
}
