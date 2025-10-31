"use client";

import { FaShareAlt } from "react-icons/fa";

export default function ListingsModalHeader({ onBack, onShare, logoSrc }) {
  return (
    <div className="flex items-center justify-between w-full border-b border-gray-200 px-6 py-3 bg-white sticky top-0 z-50">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="text-gray-700 hover:text-[#d7595d] font-medium"
      >
        ← Back
      </button>

      {/* Logo Center */}
      {logoSrc ? (
        <img src={logoSrc} alt="Logo" className="h-8 object-contain" />
      ) : (
        <div className="text-xl font-bold text-gray-900">Logo</div>
      )}

      {/* Share Button */}
      <button
        onClick={onShare}
        className="flex items-center gap-1 text-gray-700 hover:text-[#d7595d] font-medium"
      >
        <FaShareAlt /> Share
      </button>
    </div>
  );
}
