"use client";

import { useState, useEffect } from "react";

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
    if (property?.UnparsedAddress) {
      setFormData((prev) => ({
        ...prev,
        message: `Hi, I’m interested in scheduling a tour for ${property.UnparsedAddress}. Please let me know available times.`,
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
      const submission = {
        propertyId: property.ListingId,
        propertyAddress: property.UnparsedAddress,
        propertyTitle: property.Title || "",
        ...formData,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      if (response.ok) {
        setStatus("success");
        setFormData((prev) => ({
          ...prev,
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: `Hi, I’m interested in scheduling a tour for ${property.UnparsedAddress}. Please let me know available times.`,
        }));
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-3 mt-4 mb-8">
      <h3 className="text-2xl font-bold text-gray-900 leading-tight text-left">Request a Tour</h3>
      <p className="text-gray-600 text-sm text-left">
        Request a tour for <strong>{property.UnparsedAddress}</strong>
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
              : "bg-[#d7595d] hover:bg-[#ebcc65]"
          }`}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Submitting..." : "Submit"}
        </button>
      </form>

      {status === "success" && <p className="text-green-500">Request sent successfully!</p>}
      {status === "error" && <p className="text-red-500">Something went wrong. Try again.</p>}
      {status && status !== "success" && status !== "error" && status !== "loading" && (
        <p className="text-red-500">{status}</p>
      )}
    </div>
  );
}
