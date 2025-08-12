'use client'

import React from "react";
import { Mail } from "lucide-react"; // Using an icon for visual flair

/**
 * A newsletter signup component designed to capture user emails for property updates.
 */
const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would add logic here to send the email
    // to your marketing service (e.g., Mailchimp, ConvertKit).
    // For now, we'll just log it and prevent the page from reloading.
    const email = e.target.elements.email.value;
    console.log("Newsletter signup for:", email);
    alert("Thank you for subscribing!"); // Simple user feedback
    e.target.reset(); // Clear the form
  };

  return (
    // Section container with a subtle background and padding
    <div className="bg-blue-50/50 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8 lg:px-16 flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Get Exclusive Property Updates
          </h2>
          <p className="mt-3 text-gray-600">
            Join our newsletter to receive the latest property listings, market trends, and exclusive off-market deals delivered right to your inbox.
          </p>
        </div>

        {/* Newsletter Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center w-full max-w-lg gap-3"
        >
          <div className="relative flex-grow w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              name="email"
              className="border border-gray-300 rounded-md h-14 w-full outline-none pl-12 pr-4 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-shadow"
              type="email"
              placeholder="Enter your email address"
              aria-label="Email Address"
              required
            />
          </div>
          <button
            type="submit"
            className="px-8 h-14 w-full sm:w-auto text-white font-semibold bg-blue-600 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;