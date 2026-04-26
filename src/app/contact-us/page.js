"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message has been sent.`);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <section
        className="relative overflow-hidden bg-[#17130f] pb-20 pt-28 text-white sm:pt-32"
        style={{
          backgroundImage:
            "url('https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.92)_0%,rgba(255,255,255,0.3)_18%,rgba(23,19,15,0.82)_100%)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="inline-flex rounded-full border border-white/25 bg-white/55 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#4f463f] backdrop-blur-sm"
            >
              Contact Ulrich Realty
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mt-6 text-5xl font-semibold leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl"
            >
              Talk with a local Raleigh-Durham real estate team.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease: "easeOut" }}
              className="mt-6 max-w-2xl text-base leading-7 text-white/82 sm:text-lg"
            >
              Whether you are buying, selling, relocating, or just comparing
              neighborhoods, Ulrich Realty can help you make sense of the
              Raleigh-Durham market with local insight and clear next steps.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="bg-[#f6f1e8] py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] p-8 shadow-[0_20px_60px_rgba(48,36,24,0.08)]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
                Get In Touch
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight text-[#1f1c17] sm:text-4xl">
                Reach out for buying, selling, or valuation guidance.
              </h2>
              <p className="mt-4 text-base leading-7 text-[#6f675f]">
                We can help with home searches, pricing questions, market timing,
                neighborhood comparisons, and preparing your property for sale in
                Raleigh, Durham, Cary, Apex, and surrounding Triangle communities.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.6rem] border border-[#e6ddd4] bg-white p-6 shadow-[0_18px_45px_rgba(48,36,24,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a15b41]">
                  Call
                </p>
                <p className="mt-3 text-xl font-semibold text-[#1f1c17]">
                  (919) 802-7282
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6f675f]">
                  Best for quick questions about listings, tours, and timing.
                </p>
              </div>

              <div className="rounded-[1.6rem] border border-[#e6ddd4] bg-white p-6 shadow-[0_18px_45px_rgba(48,36,24,0.06)]">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#a15b41]">
                  Service Area
                </p>
                <p className="mt-3 text-xl font-semibold text-[#1f1c17]">
                  Raleigh-Durham
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6f675f]">
                  Including Cary, Apex, Wake Forest, Chapel Hill, and nearby communities.
                </p>
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e6ddd4] bg-[#1f1b17] p-8 text-white shadow-[0_20px_60px_rgba(48,36,24,0.12)]">
              <p className="text-sm uppercase tracking-[0.28em] text-[#f1c4b0]">
                What To Include
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-white/78">
                <li>Your target neighborhoods or commute needs</li>
                <li>Your budget or valuation question</li>
                <li>Your timing for buying or selling</li>
                <li>Any homes or areas you already have in mind</li>
              </ul>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] p-8 shadow-[0_20px_60px_rgba(48,36,24,0.08)]"
          >
            <p className="text-sm uppercase tracking-[0.28em] text-[#a15b41]">
              Send A Message
            </p>
            <h3 className="mt-4 text-3xl font-semibold text-[#1f1c17]">
              Tell us what you need help with.
            </h3>
            <p className="mt-3 text-sm leading-6 text-[#6f675f]">
              Use this form for home value requests, buyer consultations, tour
              planning, or general Raleigh-Durham real estate questions.
            </p>

            <div className="mt-8 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-[1.2rem] border border-[#d8cec4] bg-white px-4 py-3 text-[#1f1c17] outline-none transition focus:border-[#d86a45]"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-[1.2rem] border border-[#d8cec4] bg-white px-4 py-3 text-[#1f1c17] outline-none transition focus:border-[#d86a45]"
                required
              />
              <textarea
                name="message"
                rows={7}
                placeholder="Tell us whether you're buying, selling, relocating, or requesting a home value estimate."
                value={formData.message}
                onChange={handleChange}
                className="w-full rounded-[1.4rem] border border-[#d8cec4] bg-white px-4 py-3 text-[#1f1c17] outline-none transition focus:border-[#d86a45] resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-6 inline-flex rounded-full bg-[#d86a45] px-6 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#bf5532]"
            >
              Send Message
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </>
  );
}
