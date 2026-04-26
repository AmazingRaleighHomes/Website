"use client";

import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

export default function ListingsModalContactForm({ property }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  useEffect(() => {
    if (property?.address) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I’m interested in scheduling a tour for ${property.address}. Please let me know available times.`,
      }));
    }
  }, [property]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.email || !formData.phone) {
      setStatus("Please fill out all required fields.");
      return;
    }

    setStatus("loading");

    try {
      const templateParams = {
        propertyId: property.ListingId,
        propertyAddress: property.address,
        propertyTitle: property.ListingName || "Property Inquiry",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setStatus("success");
        setFormData((prev) => ({
          ...prev,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: `Hi, I’m interested in scheduling a tour for ${property.address}. Please let me know available times.`,
        }));
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  if (!property) return null;

  return (
    <div className="rounded-[2rem] border border-[#e6ddd4] bg-[#fffaf5] p-6 shadow-[0_20px_60px_rgba(48,36,24,0.06)]">
      <p className="text-sm uppercase tracking-[0.24em] text-[#a15b41]">
        Request A Tour
      </p>
      <h3 className="mt-3 text-3xl font-semibold leading-tight text-[#1f1c17]">
        Ask about this home.
      </h3>
      <p className="mt-3 text-sm leading-6 text-[#6f675f]">
        Reach out about <strong>{property.address}</strong> and Ulrich Realty
        will follow up about availability, timing, and next steps.
      </p>

      <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="text"
            name="firstName"
            placeholder="First name*"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full rounded-[1.1rem] border border-[#d8cec4] bg-white px-4 py-3 text-[#1f1c17] outline-none transition focus:border-[#d86a45]"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full rounded-[1.1rem] border border-[#d8cec4] bg-white px-4 py-3 text-[#1f1c17] outline-none transition focus:border-[#d86a45]"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-[1.1rem] border border-[#d8cec4] bg-white px-4 py-3 text-[#1f1c17] outline-none transition focus:border-[#d86a45]"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone*"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-[1.1rem] border border-[#d8cec4] bg-white px-4 py-3 text-[#1f1c17] outline-none transition focus:border-[#d86a45]"
          />
        </div>

        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-[1.4rem] border border-[#d8cec4] bg-white px-4 py-3 text-[#1f1c17] outline-none transition resize-none focus:border-[#d86a45]"
        ></textarea>

        <button
          type="submit"
          className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] transition ${
            status === "loading"
              ? "cursor-not-allowed bg-gray-400 text-white"
              : "bg-[#d86a45] text-white hover:bg-[#bf5532]"
          }`}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit Tour Request"}
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-sm text-green-600">Request sent successfully.</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-sm text-red-500">Something went wrong. Try again.</p>
      )}
      {status &&
        status !== "success" &&
        status !== "error" &&
        status !== "loading" && (
          <p className="mt-4 text-sm text-red-500">{status}</p>
        )}
    </div>
  );
}
