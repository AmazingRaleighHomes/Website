"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "We couldn't be happier with the outcome of our renovation project. From the initial consultation to the final touches, the team demonstrated a high level of professionalism and creativity.",
    rating: 5,
    name: "Tommie Littel",
    location: "Wake Forest, NC",
    date: "08/08",
  },
  {
    quote:
      "Working with the team was a dream — they listened to our needs, respected our budget, and delivered a home that truly feels like ours.",
    rating: 5,
    name: "Elena Marquez",
    location: "Apex, NC",
    date: "12/09",
  },
  {
    quote:
      "Exceptional service and outstanding results! They made what could’ve been stressful into a seamless, enjoyable experience.",
    rating: 5,
    name: "David Kim",
    location: "Raleigh, NC",
    date: "22/10",
  },
];

export default function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  const nextTestimonial = () =>
    setIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  useEffect(() => {
    timeoutRef.current = setTimeout(nextTestimonial, 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  const handleMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMouseLeave = () =>
    (timeoutRef.current = setTimeout(nextTestimonial, 7000));

  return (
    <section className="bg-[#fffaf5] py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
            Client Reviews
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-snug text-[#1f1c17] sm:text-5xl">
            Hear from buyers and sellers <br />
            <span
              className="font-serif italic text-[#d86a45]"
              style={{ fontWeight: "200" }}
            >
              across the Triangle
            </span>
          </h2>
        </motion.div>

        <div
          className="relative flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <button
            onClick={prevTestimonial}
            className="absolute left-0 rounded-full border border-[#d8cec4] bg-white p-2 transition hover:bg-[#f8efe8] sm:-left-12"
          >
            <ChevronLeft className="h-6 w-6 text-[#6f675f]" />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-2xl rounded-[2rem] border border-[#eadfd6] bg-white px-8 py-10 text-center shadow-[0_18px_60px_rgba(48,36,24,0.08)]"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50) nextTestimonial();
                if (info.offset.x > 50) prevTestimonial();
              }}
            >
              <div className="relative">
                <div className="absolute -top-6 left-0 select-none text-7xl text-[#d86a45] opacity-20">
                  “
                </div>

                <p className="mb-6 text-lg leading-relaxed text-[#4f463f] sm:text-xl">
                  “{testimonials[index].quote}”
                </p>

                <div className="mb-4 flex justify-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[index].rating
                          ? "text-[#d86a45]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-[#1f1c17]">
                    {testimonials[index].name}
                  </h4>
                  <p className="text-[#6f675f]">{testimonials[index].location}</p>
                  <p className="mt-1 text-sm text-[#8c8177]">{testimonials[index].date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 rounded-full border border-[#d8cec4] bg-white p-2 transition hover:bg-[#f8efe8] sm:-right-12"
          >
            <ChevronRight className="h-6 w-6 text-[#6f675f]" />
          </button>
        </div>

        <div className="mt-8 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                i === index ? "bg-[#d86a45]" : "bg-[#d7cbc1]"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
