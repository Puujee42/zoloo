// components/HomeProducts.jsx

import React from "react";
import { useAppContext } from "@/context/AppContext";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton"; // Import skeleton for loading state
import { useRouter } from "next/navigation";

const HomeProducts = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  // Display a limited number of properties, e.g., the first 5
  const homeProperties = properties.slice(0, 5);

  return (
    // --- 1. Container with themed background and padding ---
    <div className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* --- 2. Heading styled with dark green --- */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">
            Сүүлд нэмэгдсэн
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl text-lg">
            Зах зээл дээрх хамгийн сүүлийн үеийн, эрэлттэй үл хөдлөх хөрөнгүүдтэй танилцана уу.
          </p>
          {/* --- 3. Decorative separator styled with gold --- */}
          <div className="w-28 h-1 bg-yellow-400 mt-6 rounded-full"></div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 w-full">
          {isLoading
            ? // Show skeletons while loading
              Array.from({ length: 5 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))
            : // Show actual property cards
              homeProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
        </div>

        {/* "View More" Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => {
              router.push("/all-properties");
            }}
            // --- 4. Button styled with gold to match the brand's primary action color ---
            className="px-10 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-md"
          >
            Бүх зарыг харах
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeProducts;