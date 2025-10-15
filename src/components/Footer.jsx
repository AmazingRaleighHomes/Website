"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-black text-gray-300 py-12 px-6"
    >
      {/* Newsletter Top Section */}
      <div className="max-w-6xl mx-auto mb-12">
        <h4 className="text-2xl font-semibold text-white text-center mb-4">
          Subscribe to Our Newsletter
        </h4>
        <p className="text-gray-400 text-center mb-6">
          Get the latest Raleigh-Durham listings and updates straight to your inbox.
        </p>
        <form className="flex flex-col sm:flex-row items-center gap-3 justify-center">
          <input
            type="email"
            placeholder="Your email"
            className="w-full sm:flex-grow px-4 py-3 rounded-full border border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ebcc65] transition"
          />
          <button
            type="submit"
            className="bg-[#ebcc65] hover:bg-[#e5b945] text-black px-6 py-3 rounded-full font-medium transition"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
        {/* Logo + Social */}
        <div className="flex flex-col gap-4">
          <span className="text-2xl font-bold text-white">
            Amazing<span className="text-[#ebcc65]">Homes</span>
          </span>
          <p className="text-gray-400 text-sm">
            Helping you find your dream home in the Raleigh-Durham area.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-[#ebcc65] transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.326v21.348C0 23.407.593 24 1.325 24h11.497v-9.294H9.691v-3.622h3.131V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.794.715-1.794 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.407 24 24 23.407 24 22.674V1.326C24 .593 23.407 0 22.675 0z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#ebcc65] transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.056 1.956.24 2.415.403a4.92 4.92 0 011.71 1.11 4.92 4.92 0 011.11 1.709c.164.459.347 1.245.403 2.415.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.956-.403 2.415a4.932 4.932 0 01-1.11 1.71 4.932 4.932 0 01-1.709 1.11c-.459.164-1.245.347-2.415.403-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.17-.056-1.956-.24-2.415-.403a4.932 4.932 0 01-1.71-1.11 4.932 4.932 0 01-1.11-1.709c-.164-.459-.347-1.245-.403-2.415C2.175 15.747 2.163 15.367 2.163 12s.012-3.584.07-4.85c.056-1.17.24-1.956.403-2.415a4.92 4.92 0 011.11-1.71 4.92 4.92 0 011.709-1.11c.459-.164 1.245-.347 2.415-.403C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.014 7.052.072 5.765.129 4.673.31 3.78.635c-.895.324-1.65.756-2.405 1.51a6.916 6.916 0 00-1.51 2.404c-.325.893-.506 1.985-.563 3.272C.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.057 1.287.238 2.379.563 3.272.324.895.756 1.65 1.51 2.405a6.916 6.916 0 002.404 1.51c.893.325 1.985.506 3.272.563 1.28.058 1.689.072 4.948.072s3.668-.014 4.948-.072c1.287-.057 2.379-.238 3.272-.563a6.916 6.916 0 002.405-1.51 6.916 6.916 0 001.51-2.404c.325-.893.506-1.985.563-3.272.058-1.28.072-1.689.072-4.948s-.014-3.668-.072-4.948c-.057-1.287-.238-2.379-.563-3.272a6.916 6.916 0 00-1.51-2.405 6.916 6.916 0 00-2.404-1.51c-.893-.325-1.985-.506-3.272-.563C15.668.014 15.259 0 12 0z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#ebcc65] transition">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.225 0H1.773C.793 0 0 .793 0 1.773v20.451C0 23.207.793 24 1.773 24h20.451C23.207 24 24 23.207 24 22.225V1.773C24 .793 23.207 0 22.225 0zm-13.44 20.452H5.338V9.007h3.447v11.445zM7.062 7.578a2 2 0 110-3.997 2 2 0 010 3.997zm13.39 12.874h-3.447v-5.828c0-1.389-.028-3.175-1.935-3.175-1.936 0-2.233 1.514-2.233 3.078v5.925H9.53V9.007h3.311v1.562h.047c.462-.874 1.592-1.793 3.276-1.793 3.501 0 4.145 2.304 4.145 5.3v6.376z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-2">Quick Links</h4>
          <ul className="flex flex-col gap-1">
            <li><a href="#" className="hover:text-[#ebcc65] transition">Home</a></li>
            <li><a href="#" className="hover:text-[#ebcc65] transition">Agents</a></li>
            <li><a href="#" className="hover:text-[#ebcc65] transition">Contact</a></li>
            <li><a href="#" className="hover:text-[#ebcc65] transition">About Us</a></li>
          </ul>
        </div>

        {/* Contact / Info */}
        <div className="flex flex-col gap-2">
          <h4 className="text-white font-semibold mb-2">Contact</h4>
          <p className="text-gray-400 text-sm">
            123 Main Street, Raleigh, NC <br />
            info@amazinghomes.com <br />
            (555) 123-4567
          </p>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-12 border-t border-gray-800 pt-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} AmazingHomes. All rights reserved.
      </div>
    </motion.footer>
  );
}
