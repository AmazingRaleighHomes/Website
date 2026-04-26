"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const agentsData = [
  {
    id: 1,
    name: "Michael Ulrich",
    area: "Raleigh-Durham",
    title: "Founder & Realtor",
    image: "/images/Mike_Ulrich.jpeg",
    email: "Contact via inquiry form",
    phone: "(919) 802-7282",
    bio: "Michael Ulrich helps buyers and sellers navigate the Raleigh-Durham market with local strategy, pricing insight, and neighborhood-level guidance.",
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

      <section
        className="relative overflow-hidden bg-[#17130f] pb-20 pt-28 text-white sm:pt-32"
        style={{
          backgroundImage:
            "url('https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.28)_18%,rgba(23,19,15,0.82)_100%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex rounded-full border border-white/25 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#4f463f] backdrop-blur-sm"
            >
              Meet Ulrich Realty
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl"
            >
              Local real estate guidance for Raleigh-Durham buyers and sellers.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg"
            >
              Work with a team that understands Triangle neighborhoods, pricing
              strategy, listing presentation, and the details that shape strong
              buying and selling outcomes.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1e8] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] p-6 shadow-[0_20px_60px_rgba(48,36,24,0.08)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
                Search Agents
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-[#1f1c17]">
                Find the right local fit for your move.
              </h2>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <select
                className="rounded-full border border-[#d8cec4] bg-white px-4 py-3 text-sm text-[#1f1c17] outline-none transition focus:border-[#d86a45]"
                value={areaFilter}
                onChange={(e) => setAreaFilter(e.target.value)}
              >
                <option value="All">All Areas</option>
                <option value="Raleigh-Durham">Raleigh-Durham</option>
              </select>

              <input
                type="text"
                placeholder="Search by name"
                className="min-w-[220px] rounded-full border border-[#d8cec4] bg-white px-4 py-3 text-sm text-[#1f1c17] outline-none transition focus:border-[#d86a45]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredAgents.length === 0 ? (
            <div className="rounded-[2rem] border border-dashed border-[#d8cec4] bg-[#fffaf5] px-6 py-12 text-center text-[#6f675f]">
              No agents matched that search yet.
            </div>
          ) : (
            <div className="grid gap-8 lg:grid-cols-2">
              {filteredAgents.map((agent) => (
                <motion.div
                  key={agent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid overflow-hidden rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] shadow-[0_20px_60px_rgba(48,36,24,0.08)] md:grid-cols-[260px_1fr]"
                >
                  <div className="relative min-h-[320px]">
                    <Image
                      src={agent.image}
                      alt={agent.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="p-8">
                    <p className="text-sm uppercase tracking-[0.24em] text-[#a15b41]">
                      {agent.area}
                    </p>
                    <h3 className="mt-3 text-3xl font-semibold text-[#1f1c17]">
                      {agent.name}
                    </h3>
                    <p className="mt-2 text-lg text-[#6f675f]">{agent.title}</p>
                    <p className="mt-5 text-base leading-7 text-[#5f5750]">
                      {agent.bio}
                    </p>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                      <div className="rounded-[1.4rem] border border-[#e6ddd4] bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a15b41]">
                          Phone
                        </p>
                        <p className="mt-2 text-[#1f1c17]">{agent.phone}</p>
                      </div>
                      <div className="rounded-[1.4rem] border border-[#e6ddd4] bg-white p-4">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#a15b41]">
                          Contact
                        </p>
                        <p className="mt-2 text-[#1f1c17]">{agent.email}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
