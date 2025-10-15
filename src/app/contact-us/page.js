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

      {/* Hero Section */}
      <section
        className="relative h-[50vh] sm:h-[60vh] bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage:
            "url('https://degbfm0bobp7.cloudfront.net/storage/56df3875-1b80-480e-953d-763faa4fc182/delivery/f8a6ed51-b4ac-4177-d762-08dde1a82257/images/web/016_B56S.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 sm:px-6">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white text-4xl sm:text-5xl md:text-6xl font-bold drop-shadow-lg"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: "easeOut" }}
            className="text-gray-200 text-base sm:text-lg md:text-xl mt-4 max-w-2xl"
          >
            We’re here to help you find your dream home in the Raleigh-Durham area. Reach out and we’ll get back to you quickly.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <div className="px-4 sm:px-6 md:px-12 py-12 bg-gray-50 min-h-screen">
        {/* Page Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl font-bold text-gray-900 text-center mb-6"
        >
          Get in Touch
        </motion.h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Have questions or want to work with us? Fill out the form below or use the contact details to reach out.
        </p>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4"
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ebcc65] transition"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ebcc65] transition"
              required
            />
            <textarea
              name="message"
              rows={6}
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="px-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ebcc65] transition resize-none"
              required
            />
            <button
              type="submit"
              className="bg-[#ebcc65] text-white px-6 py-3 rounded-full font-medium hover:bg-[#e5555c] transition shadow-md hover:shadow-lg mt-2"
            >
              Send Message
            </button>
          </motion.form>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col gap-3">
              <h3 className="text-xl font-semibold text-gray-900">Contact Info</h3>
              <p className="text-gray-600">Email: info@amazingraleighhomes.com</p>
              <p className="text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-gray-600">Address: 123 Main Street, Raleigh, NC</p>
            </div>

            <div className="w-full h-64 rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3301.123456789!2d-78.6382!3d35.7796!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sRaleigh%2C%20NC!5e0!3m2!1sen!2sus!4v1697383640000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
