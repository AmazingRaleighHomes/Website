"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer"; // import your footer

// Example agent data (replace with real API/Supabase)
const agentsData = [
  {
    id: 1,
    name: "Michael Ulrich",
    area: "Raleigh-Durham",
    title: "Senior Agent",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    email: "mike@amazingraleighdurhamhomes.com",
    phone: "(919) 802-7282",
  },
];

export default function AgentsPage() {
  const [areaFilter, setAreaFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAgents = agentsData.filter(
    (agent) =>
      (areaFilter === "All" || agent.area === areaFilter) &&
      agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative h-[50vh] sm:h-[60vh] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg"
          >
            Meet Our Agents
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-gray-200 text-base sm:text-lg md:text-xl mt-4 max-w-2xl"
          >
            Our experienced real estate professionals are here to help you buy or sell your home in the Raleigh-Durham area.
          </motion.p>
        </div>
      </section>

      {/* Agents Section */}
      <div className="px-4 sm:px-6 md:px-12 py-12 bg-gray-50 min-h-screen">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 max-w-4xl mx-auto">
          {/* Area Filter */}
          <select
            className="px-4 py-2 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#ebcc65] transition"
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
          >
            <option value="All">All Areas</option>
            <option value="Raleigh">Raleigh</option>
            <option value="Durham">Durham</option>
            <option value="Cary">Cary</option>
            <option value="Chapel Hill">Chapel Hill</option>
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search by name"
            className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ebcc65] transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredAgents.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No agents found.
            </p>
          ) : (
            filteredAgents.map((agent) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col items-center text-center p-6 hover:shadow-2xl transition"
              >
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-900">{agent.name}</h3>
                <p className="text-[#ebcc65] font-medium">{agent.title}</p>
                <p className="text-gray-500 text-sm">{agent.area}</p>
                <div className="mt-4 flex flex-col gap-1 text-gray-600 text-sm">
                  <span>Email: {agent.email}</span>
                  <span>Phone: {agent.phone}</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
