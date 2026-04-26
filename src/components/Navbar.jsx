"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Listings", href: "/#mls-listings" },
    { name: "Agents", href: "/our-agents" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="border-b border-[#d9cdc2]/70 bg-white/92 backdrop-blur-md shadow-[0_8px_30px_rgba(54,40,28,0.08)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 text-[#1f1c17] sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-[#e7d5ca] bg-white p-2 shadow-sm">
              <Image
                src="/favicon/favicon.svg"
                alt="Ulrich Realty logo"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <div className="text-lg font-semibold uppercase tracking-[0.18em]">
                Ulrich Realty
              </div>
              <div className="text-xs uppercase tracking-[0.3em] text-[#7c7066]">
                Raleigh-Durham Real Estate
              </div>
            </div>
          </Link>

          <ul className="hidden items-center gap-8 text-sm font-medium text-[#5f5750] md:flex">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-[#d86a45]"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link
              href="/contact-us"
              className="inline-flex items-center rounded-full border border-[#e2b39f]/40 bg-[#d86a45] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#bf5532]"
            >
              Schedule a Consultation
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col items-center justify-center gap-1 md:hidden"
            aria-label="Toggle navigation"
          >
            <span className="h-[2px] w-6 bg-[#1f1c17]"></span>
            <span className="h-[2px] w-6 bg-[#1f1c17]"></span>
            <span className="h-[2px] w-6 bg-[#1f1c17]"></span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="border-b border-[#d9cdc2]/70 bg-white px-4 py-6 md:hidden"
        >
          <ul className="mx-auto flex max-w-7xl flex-col gap-4 text-sm font-medium text-[#1f1c17]">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="transition-colors duration-200 hover:text-[#d86a45]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact-us"
                className="inline-flex items-center rounded-full border border-[#e2b39f]/40 bg-[#d86a45] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#bf5532]"
                onClick={() => setMenuOpen(false)}
              >
                Schedule a Consultation
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
