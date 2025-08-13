// components/HomeProducts.jsx
'use client'

import React from "react";
import { useAppContext } from "@/context/AppContext";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton"; // Import skeleton for loading state
import { useRouter } from "next/navigation";

const HomeProducts = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  // Display a limited number of properties, e.g., the first 6 for better grid layout
  const homeProperties = properties.slice(0, 6);

  return (
    // --- Container with white background to separate sections ---
    <div className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* --- 1. Гарчгийг Playfair Display фонт, ногоон өнгөтэй болгосон --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-zolGreen">
            Сүүлд нэмэгдсэн
          </h2>
          <p className="mt-4 text-zolDark/70 max-w-2xl text-lg leading-relaxed">
            Зах зээл дээрх хамгийн сүүлийн үеийн, эрэлттэй үл хөдлөх хөрөнгүүдтэй танилцана уу.
          </p>
          {/* --- Ялгах зураасыг алтан шаргал өнгөтэй болгосон --- */}
          <div className="w-28 h-1 bg-zolGold mt-6 rounded-full"></div>
        </div>

        {/* --- Grid layout adjusted for up to 6 items for better alignment --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {isLoading
            ? // Show skeletons while loading
              Array.from({ length: 6 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            : // Show actual property cards
              homeProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
        </div>

        {/* --- 2. "View More" товчлуурыг zolGold болгосон --- */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              router.push("/all-properties");
            }}
            className="px-10 py-3 bg-zolGold text-white font-semibold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
          >
            Бүх зарыг харах
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;