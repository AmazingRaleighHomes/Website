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

  // Auto-slide
  useEffect(() => {
    timeoutRef.current = setTimeout(nextTestimonial, 7000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  // Pause on hover
  const handleMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMouseLeave = () =>
    (timeoutRef.current = setTimeout(nextTestimonial, 7000));

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-regular text-gray-800 leading-snug">
            Hear From Our Awesome <br />
            <span
              className="font-serif italic text-[#ebcc65]"
              style={{ fontWeight: "200" }}
            >
              Satisfied Clients
            </span>
          </h2>
        </motion.div>

        {/* Carousel */}
        <div
          className="relative flex items-center justify-center"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Prev Button */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 sm:-left-12 p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          {/* Testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="max-w-2xl text-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.x < -50) nextTestimonial();
                if (info.offset.x > 50) prevTestimonial();
              }}
            >
              <div className="relative">
                {/* Quotation Marks */}
                <div className="absolute -top-6 left-0 text-7xl text-[#ebcc65] opacity-30 select-none">
                  “
                </div>

                {/* Quote */}
                <p className="text-gray-700 text-lg sm:text-xl leading-relaxed mb-6">
                  “{testimonials[index].quote}”
                </p>

                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonials[index].rating
                          ? "text-[#ebcc65]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* Client Info */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {testimonials[index].name}
                  </h4>
                  <p className="text-gray-500">{testimonials[index].location}</p>
                  <p className="text-gray-400 text-sm mt-1">{testimonials[index].date}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next Button */}
          <button
            onClick={nextTestimonial}
            className="absolute right-0 sm:-right-12 p-2 rounded-full border border-gray-300 hover:bg-gray-100 transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-[#ebcc65]" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
