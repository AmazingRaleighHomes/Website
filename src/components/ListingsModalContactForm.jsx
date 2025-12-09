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

  const [status, setStatus] = useState(""); // success, error, loading

  // Auto-fill the message when property loads
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

      console.log("Sending template params:", templateParams); // optional debug

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      if (response.status === 200) {
        setStatus("success");

        // Reset form but keep auto-filled message
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
    <div className="space-y-3 mt-4 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 leading-tight text-left">
        Request a Tour
      </h3>
      <p className="text-gray-600 text-sm text-left">
        Request a tour for <strong>{property.address}</strong>
      </p>

      <form className="space-y-2" onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name*"
          value={formData.firstName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="email"
          name="email"
          placeholder="Email*"
          value={formData.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone*"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-lg p-2"
        />
        <textarea
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-2"
        ></textarea>

        <button
          type="submit"
          className={`w-full py-2 rounded-full text-white transition-colors ${
            status === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#ebcc65] hover:bg-[#ebcc65]"
          }`}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>

      {status === "success" && (
        <p className="text-green-500">Request sent successfully!</p>
      )}
      {status === "error" && (
        <p className="text-red-500">Something went wrong. Try again.</p>
      )}
      {status &&
        status !== "success" &&
        status !== "error" &&
        status !== "loading" && (
          <p className="text-red-500">{status}</p>
        )}
    </div>
  );
}
