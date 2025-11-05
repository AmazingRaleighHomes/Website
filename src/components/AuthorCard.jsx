"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthorCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
      {/* Header */}
      <h3 className="text-sm font-semibold text-gray-500 mb-2">WRITTEN BY</h3>
      <div className="flex items-center mb-4">
        <Image
          src="/images/Mike_Ulrich.jpeg" // replace with actual author image
          alt="Mike Ulrich"
          width={50}
          height={50}
          className="rounded-full mr-4"
        />
        <div>
          <p className="text-lg font-bold text-gray-900">Mike Ulrich</p>
          <p className="text-sm text-gray-500">Founder & Realtor</p>
        </div>
      </div>

      {/* Snippet / Expandable Bio */}
      <div className="text-gray-700 text-sm leading-relaxed">
        <p>
          Mike Ulrich is a top Realtor® and founder of Amazing Raleigh Durham Homes, dedicated to helping buyers and sellers in Raleigh–Durham navigate one of the fastest-moving housing markets in North Carolina. He is known for his innovative approach, deep local knowledge, and client-first philosophy.
        </p>

        {expanded && (
          <div className="mt-2 space-y-2">
            <p>
              Under Mike’s leadership, Ulrich Realty has built a boutique, high-performing team focused on delivering exceptional results. Mike emphasizes mentorship, accountability, and the right systems to empower agents while providing clients with unmatched guidance and insight.
            </p>
            <p>
              Beyond real estate, Mike actively gives back to the community, supporting local initiatives, schools, and small businesses. He also leverages technology to make the home buying and selling process seamless, from virtual tours to market analysis.
            </p>
            <p>
              Mike’s mission is to create lasting value for clients and the community, ensuring each transaction goes beyond the sale to leave a meaningful impact.
            </p>
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-blue-600 hover:underline text-sm font-medium"
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </div>
  );
}
