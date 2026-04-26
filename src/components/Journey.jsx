"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function JourneySection() {
  const communities = [
    "Raleigh",
    "Durham",
    "Cary",
    "Apex",
    "Wake Forest",
    "Holly Springs",
    "Morrisville",
    "Chapel Hill",
    "Fuquay-Varina",
    "Garner",
    "Clayton",
    "Rolesville",
  ];

  return (
    <section className="bg-[#1f1b17] py-20 text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative min-h-[320px] overflow-hidden rounded-[2rem]"
        >
          <img
            src="https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg"
            alt="Raleigh-Durham neighborhood homes"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,15,12,0.15)_0%,rgba(19,15,12,0.75)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-xs rounded-[1.6rem] border border-white/15 bg-black/30 p-5 backdrop-blur-sm">
              <p className="text-xs uppercase tracking-[0.3em] text-[#f1c4b0]">
                Local Guidance
              </p>
              <p className="mt-3 text-sm leading-6 text-white/78">
                From in-town Raleigh homes to growing suburbs like Cary, Apex,
                and Wake Forest, we help buyers compare lifestyle, inventory,
                and value with real local context.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="rounded-[2rem] border border-white/10 bg-[#26211d] p-8 sm:p-10"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[#f1c4b0]">
            Explore Communities
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl">
            Explore Raleigh-Durham neighborhoods before you book a showing.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/72">
            Triangle real estate is hyper-local. Search the communities buyers
            ask about most, compare neighborhood feel and location advantages,
            and narrow your search around commute, schools, amenities, and price.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {communities.map((community) => (
              <Link
                key={community}
                href="#mls-listings"
                className="rounded-[1.2rem] border border-white/10 bg-white/5 px-4 py-4 text-left text-sm font-medium text-white/86 transition hover:border-[#d86a45]/50 hover:bg-white/10"
              >
                {community}
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 text-sm text-white/62">
            <span>Neighborhood expertise</span>
            <span>School and commute context</span>
            <span>Buyer and seller strategy</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
