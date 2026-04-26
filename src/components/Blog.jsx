"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const allPosts = [
  {
    id: 1,
    title: "2026 Home Buying Guide for First-Time Buyers in Raleigh & Durham",
    slug: "2026-home-buying-guide-raleigh-durham",
    category: "Buying",
    excerpt:
      "Learn how first-time buyers can compete for Raleigh and Durham homes with smarter financing, neighborhood research, and offer strategy...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Oct 12, 2025",
  },
  {
    id: 2,
    title: "Renovation Ideas That Add Value",
    slug: "renovation-ideas-that-add-value",
    category: "Renovation",
    excerpt:
      "See which upgrades tend to matter most to Triangle buyers when you want to improve livability and resale value...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Sep 28, 2025",
  },
  {
    id: 3,
    title: "Understanding Real Estate Investment",
    slug: "understanding-real-estate-investment",
    category: "Investing",
    excerpt:
      "Understand what local investors watch in Raleigh-Durham, from rent demand and location fundamentals to long-term appreciation...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Sep 10, 2025",
  },
  {
    id: 4,
    title: "Decorating Tips for Small Spaces",
    slug: "decorating-tips-for-small-spaces",
    category: "Interior",
    excerpt:
      "Use simple design choices to make condos, townhomes, and smaller homes feel brighter, larger, and more marketable...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Aug 22, 2025",
  },
  {
    id: 5,
    title: "Top Neighborhoods to Buy in 2025",
    slug: "top-neighborhoods-to-buy-in-2025",
    category: "Buying",
    excerpt:
      "Compare some of the most searched Raleigh-area neighborhoods for lifestyle, inventory mix, and long-term upside...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Jul 15, 2025",
  },
  {
    id: 6,
    title: "Eco-Friendly Home Renovations",
    slug: "eco-friendly-home-renovations",
    category: "Renovation",
    excerpt:
      "Explore sustainable upgrades that can improve comfort, reduce operating costs, and strengthen resale appeal in North Carolina...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Jun 30, 2025",
  },
];

const categories = ["All", "Buying", "Renovation", "Investing", "Interior"];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3);

  const filteredPosts =
    activeCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <section className="bg-[#f3ece4] py-24">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
            Market Insight
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-snug text-[#1f1c17] sm:text-5xl">
            Raleigh-Durham real estate advice <br />
            <span
              className="font-serif italic text-[#d86a45]"
              style={{ fontWeight: "200" }}
            >
              and Triangle market updates
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[#6f675f]">
            Stay current on Raleigh, Durham, Cary, and Chapel Hill housing trends with practical advice for buyers, sellers, and investors.
          </p>
        </motion.div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(3);
              }}
              className={`rounded-full border px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition ${
                activeCategory === cat
                  ? "border-[#d86a45] bg-[#1f1b17] text-white"
                  : "border-[#d8cec4] bg-white text-[#5f5750] hover:bg-[#fbf5ef]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              whileHover={{ scale: 1.03 }}
              className="overflow-hidden rounded-[2rem] border border-[#e6ddd4] bg-white shadow-[0_20px_60px_rgba(48,36,24,0.08)]"
            >
              <img
                src={post.image}
                alt={post.title}
                className="h-56 w-full object-cover"
              />
              <div className="p-6 text-left">
                <p className="mb-2 text-sm uppercase tracking-[0.18em] text-[#a15b41]">
                  {post.date}
                </p>
                <h3 className="mb-2 text-lg font-semibold text-[#1f1c17]">
                  {post.title}
                </h3>
                <p className="mb-4 text-[#6f675f]">{post.excerpt}</p>

                <Link href={`/blog/${post.slug}`} passHref>
                  <button className="mt-2 font-semibold text-[#d86a45] hover:underline">
                    Read More
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {visibleCount < filteredPosts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="rounded-full bg-[#d86a45] px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#bf5532]"
            >
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
