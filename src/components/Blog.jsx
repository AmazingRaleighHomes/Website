"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// Mock Blog Data
const allPosts = [
  {
    id: 1,
    title: "5 Tips to Find Your Dream Home",
    category: "Buying",
    excerpt:
      "Discover the top strategies to secure your perfect home in today's market...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Oct 12, 2025",
  },
  {
    id: 2,
    title: "Renovation Ideas That Add Value",
    category: "Renovation",
    excerpt:
      "Increase your property value with these creative and practical renovation tips...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Sep 28, 2025",
  },
  {
    id: 3,
    title: "Understanding Real Estate Investment",
    category: "Investing",
    excerpt:
      "A beginner's guide to making smart real estate investments that pay off...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Sep 10, 2025",
  },
  {
    id: 4,
    title: "Decorating Tips for Small Spaces",
    category: "Interior",
    excerpt:
      "Maximize your small living spaces with these stylish and functional tips...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Aug 22, 2025",
  },
  {
    id: 5,
    title: "Top Neighborhoods to Buy in 2025",
    category: "Buying",
    excerpt:
      "Explore the most promising neighborhoods for real estate investment and living...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Jul 15, 2025",
  },
  {
    id: 6,
    title: "Eco-Friendly Home Renovations",
    category: "Renovation",
    excerpt:
      "Sustainable renovations that reduce your footprint and increase your home’s value...",
    image:
      "https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg",
    date: "Jun 30, 2025",
  },
];

const categories = ["All", "Buying", "Renovation", "Investing", "Interior"];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(3); // show 3 posts initially

  const filteredPosts =
    activeCategory === "All"
      ? allPosts
      : allPosts.filter((post) => post.category === activeCategory);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3); // load 3 more at a time
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-regular text-gray-800 leading-snug">
            Our Latest <br />
            <span
              className="font-serif italic text-[#ebcc65]"
              style={{ fontWeight: "200" }}
            >
              Blog Posts
            </span>
          </h2>
          <p className="mt-4 text-gray-600 max-w-xl mx-auto">
            Stay up-to-date with tips, insights, and market trends from our team of experts.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(3); // reset visible count on category change
              }}
              className={`px-5 py-2 rounded-full font-medium transition ${
                activeCategory === cat
                  ? "bg-[#ebcc65] text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <motion.div layout className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {displayedPosts.map((post) => (
            <motion.div
              key={post.id}
              layout
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden cursor-pointer"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-6 text-left">
                <p className="text-sm text-gray-400 mb-2">{post.date}</p>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <button className="mt-2 text-[#ebcc65] font-semibold hover:underline">
                  Read More
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More Button */}
        {visibleCount < filteredPosts.length && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="bg-[#ebcc65] hover:bg-[#d7595d] text-white px-6 py-2 rounded-full font-medium transition"
            >
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
