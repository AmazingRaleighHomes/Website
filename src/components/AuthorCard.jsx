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
          Mike Ulrich is the founder of Ulrich Realty, dedicated to helping buyers and sellers in Raleigh-Durham navigate one of North Carolina&apos;s most competitive housing markets with clear local guidance and a client-first approach.
        </p>

        {expanded && (
          <div className="mt-2 space-y-2">
            <p>
              Under Mike&apos;s leadership, Ulrich Realty has built a boutique,
              high-performing real estate brand focused on thoughtful guidance,
              local expertise, and a smoother buying and selling experience from
              first conversation to closing day.
            </p>
            <p>
              Mike combines relationship-driven service with modern tools that
              help clients evaluate neighborhoods, compare opportunities, and
              move through the process with more clarity and confidence.
            </p>
            <p>
              His goal is simple: help clients make smart real estate decisions
              and feel well supported at every stage of the move.
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
