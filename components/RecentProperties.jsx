'use client'

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from './PropertyCard'; // Themed property card component
import PropertyCardSkeleton from './PropertyCardSkeleton'; // Reusable skeleton loader
import { useRouter } from 'next/navigation';

const RecentProperties = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  // Show only the latest 8 properties on the homepage
  const recentProperties = properties?.slice(0, 8) || [];

  return (
    // --- 1. Container: Use a subtle background for texture and add padding ---
    <div className="bg-gray-50 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          {/* --- 2. Heading: Styled with rich green for emphasis --- */}
          <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">
            Шинээр нэмэгдсэн үл хөдлөхүүд
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl text-lg">
            Манай онцгой цуглуулгад шинээр нэмэгдсэн орон сууц, байр, виллагуудыг үзнэ үү.
          </p>
          {/* --- 3. Separator: Gold accent for a touch of luxury --- */}
          <div className="w-28 h-1 bg-yellow-400 mt-6 rounded-full"></div>
        </div>

        {/* Conditional Rendering: Show skeleton during load, otherwise show properties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            // Display 8 skeletons for a better loading experience
            Array.from({ length: 8 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))
          ) : (
            // Display the actual property cards once loaded
            recentProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>

        {/* --- 4. "View All" Button: Styled as a prominent call-to-action --- */}
        <div className="mt-16 text-center">
            <button
              onClick={() => router.push('/all-properties')}
              className="px-10 py-3 bg-yellow-400 text-black font-bold rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-md"
            >
              Бүх зарыг харах
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecentProperties;