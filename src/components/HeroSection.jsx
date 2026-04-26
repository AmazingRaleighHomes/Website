"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection({ selectedArea, setSelectedArea, onSearch }) {
  const [propertyValue, setPropertyValue] = useState("Any Price");
  const [query, setQuery] = useState("");
  const propertyOptions = ["Any Price", "$100k", "$300k", "$500k", "$750k+"];
  const areaOptions = [
    "Raleigh-Durham",
    "Raleigh",
    "Durham",
    "Cary",
    "Apex",
    "Wake Forest",
    "Chapel Hill",
  ];
  const quickSearches = [
    { label: "Homes in Raleigh", query: "Raleigh", area: "Raleigh" },
    { label: "Homes in Cary", query: "Cary", area: "Cary" },
    { label: "Luxury Homes", query: "Luxury", area: "Raleigh-Durham" },
    { label: "New Listings", query: "", area: "Raleigh-Durham", price: "Any Price" },
  ];

  const scrollToMLS = () => {
    const target = document.getElementById("mls-listings");
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch({
        price: propertyValue,
        query,
        area: selectedArea,
      });
    }
    scrollToMLS();
  };

  return (
    <section
      className="relative overflow-hidden bg-[#17130f] pt-24 text-white sm:pt-28"
      style={{
        backgroundImage:
          "url('https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_9%,rgba(255,255,255,0.74)_17%,rgba(19,14,10,0.42)_42%,rgba(19,14,10,0.72)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(180deg,rgba(23,19,15,0)_0%,rgba(23,19,15,1)_100%)]" />

      <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl items-center justify-center px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="mb-5 inline-flex items-center rounded-full border border-white/40 bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#4f463f] backdrop-blur-sm"
          >
            Raleigh • Durham • Cary • Apex • Wake Forest
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: "easeOut" }}
            className="max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl"
          >
            Search Raleigh-Durham homes for sale with Ulrich Realty.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/86 sm:text-lg"
          >
            Explore homes for sale in Raleigh, Durham, Cary, Apex, and nearby
            Triangle communities with local guidance on neighborhoods, pricing,
            commute patterns, and buyer strategy.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="mt-8 rounded-[1.75rem] border border-[#ead7cb]/70 bg-[#fffaf5]/96 p-3 text-left shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-sm sm:p-4"
          >
            <div className="grid gap-2 lg:grid-cols-[minmax(0,1.75fr)_0.8fr_0.8fr_auto]">
              <label className="flex flex-col rounded-[1.25rem] border border-[var(--border)] bg-white px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.16em] text-[#887d73]">
                Search
                <input
                  type="text"
                  placeholder="Search by city, neighborhood, address, or MLS #"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="mt-1.5 bg-transparent text-[15px] normal-case tracking-normal text-[var(--foreground)] outline-none placeholder:text-[#94897f]"
                />
              </label>

              <label className="flex flex-col rounded-[1.25rem] border border-[var(--border)] bg-white px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.16em] text-[#887d73]">
                Area
                <select
                  value={selectedArea || "Raleigh-Durham"}
                  onChange={(e) => setSelectedArea?.(e.target.value)}
                  className="mt-1.5 bg-transparent text-[15px] font-medium normal-case tracking-normal text-[var(--foreground)] outline-none"
                >
                  {areaOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col rounded-[1.25rem] border border-[var(--border)] bg-white px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.16em] text-[#887d73]">
                Max price
                <select
                  value={propertyValue}
                  onChange={(e) => setPropertyValue(e.target.value)}
                  className="mt-1.5 bg-transparent text-[15px] font-medium normal-case tracking-normal text-[var(--foreground)] outline-none"
                >
                  {propertyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <button
                onClick={handleSearch}
                className="flex min-h-full items-center justify-center rounded-[1.25rem] bg-[#d86a45] px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#bf5532]"
              >
                Search Listings
              </button>
            </div>

            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 px-1 text-sm text-[var(--muted)]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9b5a40]">
                Quick Search
              </span>
              {quickSearches.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setQuery(item.query);
                    setSelectedArea?.(item.area);
                    if (item.price) setPropertyValue(item.price);
                  }}
                  className="rounded-full bg-[#f6ebe4] px-3 py-1.5 transition hover:bg-[#eed8cc] hover:text-[var(--foreground)]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="mx-auto mt-7 max-w-2xl rounded-[1.6rem] border border-white/18 bg-black/20 px-5 py-5 text-center backdrop-blur-sm"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#f1c4b0]">
              What&apos;s Your Home Worth?
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-white sm:text-[2rem]">
              See what your Raleigh-Durham home could command in today&apos;s market.
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/72">
              Get a local home value estimate backed by neighborhood activity,
              recent comparable sales, and current buyer demand across the Triangle.
            </p>
            <div className="mt-5">
              <a
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#4f463f] transition hover:bg-[#eed8cc]"
              >
                Get My Home Value
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
