"use client";

import Image from "next/image";

export default function ListingsModalHeader({
  onBack,
  logoSrc,
}) {
  return (
    <div className="sticky top-0 z-[70] border-b border-[#e6ddd4] bg-white/95 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="mx-auto flex w-full max-w-[1240px] items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center rounded-full border border-[#d8cec4] bg-[#fffaf5] px-4 py-2 text-sm font-medium text-[#1f1c17] transition hover:border-[#d86a45] hover:text-[#d86a45]"
        >
          ← Back
        </button>

        {logoSrc ? (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#e7d5ca] bg-white p-2 shadow-sm">
              <Image
                src={logoSrc}
                alt="Ulrich Realty logo"
                width={28}
                height={28}
                className="h-7 w-7 object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1f1c17]">
                Ulrich Realty
              </div>
              <div className="text-[11px] uppercase tracking-[0.24em] text-[#7c7066]">
                Listing Details
              </div>
            </div>
          </div>
        ) : (
          <div className="text-sm font-semibold uppercase tracking-[0.18em] text-[#1f1c17]">
            Ulrich Realty
          </div>
        )}
        <div className="w-[88px]" aria-hidden="true" />
      </div>
    </div>
  );
}
