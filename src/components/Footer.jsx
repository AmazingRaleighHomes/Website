"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#15120f] px-6 py-14 text-gray-300"
    >
      <div className="mx-auto mb-14 max-w-6xl rounded-[2rem] border border-white/10 bg-[#201b17] px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-[#f1c4b0]">
              Stay Ahead
            </p>
            <h4 className="mt-3 text-2xl font-semibold text-white">
              Get local listings and market notes in your inbox.
            </h4>
            <p className="mt-2 text-gray-400">
              Weekly updates for buyers, sellers, and investors watching the Triangle.
            </p>
          </div>
          <form className="flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="Your email"
              className="w-full rounded-full border border-white/10 bg-[#16120f] px-5 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#d86a45] transition"
            />
            <button
              type="submit"
              className="rounded-full bg-[#d86a45] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#bf5532]"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-3">
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold uppercase tracking-[0.18em] text-white">
            Ulrich Realty
          </span>
          <p className="max-w-sm text-sm leading-6 text-gray-400">
            Ulrich Realty helps buyers and sellers navigate Raleigh, Durham,
            Cary, Apex, and surrounding Triangle communities with clear local guidance.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="mb-2 font-semibold text-white">Quick Links</h4>
          <ul className="flex flex-col gap-2 text-sm text-gray-400">
            <li><Link href="/" className="transition hover:text-[#f1c4b0]">Home</Link></li>
            <li><Link href="#mls-listings" className="transition hover:text-[#f1c4b0]">Listings</Link></li>
            <li><Link href="/our-agents" className="transition hover:text-[#f1c4b0]">Agents</Link></li>
            <li><Link href="/contact-us" className="transition hover:text-[#f1c4b0]">Contact</Link></li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="mb-2 font-semibold text-white">Contact</h4>
          <p className="text-sm leading-6 text-gray-400">
            Michael Ulrich <br />
            Raleigh-Durham, North Carolina <br />
            (919) 802-7282 <br />
            <Link href="/contact-us" className="transition hover:text-[#f1c4b0]">
              Use the contact form
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-12 border-t border-white/8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Ulrich Realty. All rights reserved.
      </div>
    </motion.footer>
  );
}
