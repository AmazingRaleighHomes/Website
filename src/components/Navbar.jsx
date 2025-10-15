"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function Navbar({ selectedArea, setSelectedArea }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Agents", href: "/our-agents" },
    { name: "Contact", href: "/contact-us" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        className="bg-white/30 backdrop-blur-xl border border-gray-200
          shadow-[0_8px_30px_rgba(0,0,0,0.08)] rounded-full
          px-8 py-3 flex items-center justify-between gap-6
          max-w-5xl mx-auto
          ring-1 ring-gray-100/70
          hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-300"
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5), 0 6px 20px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <div className="text-2xl font-bold tracking-tight drop-shadow-sm">
          <span style={{ color: "#ebcc65" }}>Amazing</span>
          <span className="text-white">Homes</span>
        </div>

        {/* Links (Desktop) */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="hover:text-[#ff6065] transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center gap-1"
        >
          <span className="w-6 h-[2px] bg-gray-800"></span>
          <span className="w-6 h-[2px] bg-gray-800"></span>
          <span className="w-6 h-[2px] bg-gray-800"></span>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-1/2 -translate-x-1/2
          bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-100
          p-6 w-72 text-center md:hidden"
        >
          <ul className="flex flex-col gap-4 text-gray-800 font-medium">
            {links.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-[#ff6065] transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
}
