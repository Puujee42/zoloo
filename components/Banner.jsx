'use client'

import React from "react";
import { assets } from "@/assets/assets"; // Make sure this path is correct
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use next/navigation for App Router

/**
 * A banner component designed to be a prominent hero section for the homepage.
 */
const Banner = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/all-properties'); // Navigate to the main property listing page
  };

  const handleLearnMoreClick = () => {
    router.push('/about-us'); // Navigate to an "About Us" or "Contact" page
  };

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white my-16 rounded-xl overflow-hidden shadow-2xl">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover opacity-30"
          src={assets.hero_background_image} // IMPORTANT: Replace with a high-quality real estate image from your assets
          alt="Modern house background"
          layout="fill"
          priority // Prioritize loading this image as it's above the fold
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight text-shadow-md">
          Find Your Dream Home with Us
        </h1>
        <p className="max-w-xl mt-4 text-lg text-gray-200">
          We offer a curated selection of the finest properties, tailored to your lifestyle and preferences.
        </p>
        
        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <button 
            onClick={handleExploreClick}
            className="group flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 rounded-md text-white font-semibold hover:bg-blue-700 transition-all transform hover:scale-105"
          >
            Explore Properties
            {/* You can use a real arrow icon from lucide-react or an Image as you prefer */}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
          <button 
            onClick={handleLearnMoreClick}
            className="px-8 py-3 bg-white/10 border border-white/50 rounded-md text-white font-semibold hover:bg-white hover:text-gray-900 transition-colors backdrop-blur-sm"
          >
            Learn More
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .text-shadow-md {
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Banner;