'use client'

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from './PropertyCard';
import PropertyCardSkeleton from './PropertyCardSkeleton';

/**
 * "Онцлох" үл хөдлөх хөрөнгийн жагсаалтыг харуулах компонент.
 */
const FeaturedProperties = () => {
  const { properties, isLoading } = useAppContext();

  // Show the first 3 properties as featured, or an empty array if not available
  const featuredProperties = properties?.slice(0, 3) || [];

  return (
    // --- 1. Container: Use a subtle, light background ---
    <div className="bg-gray-50 py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        {/* --- 2. Heading: Style with a rich, dark green --- */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-green-900">
          Онцлох Үл Хөдлөх Хөрөнгө
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-lg">
          Тансаг зэрэглэлийн харшаас эхлээд тохилог гэр бүлийн байшин хүртэлх бидний онцгойлон сонгосон үл хөдлөх хөрөнгүүдтэй танилцана уу.
        </p>
        {/* --- 3. Separator: Style with a vibrant gold --- */}
        <div className="w-28 h-1 bg-yellow-400 mt-6 rounded-full"></div>
      </div>

      {/* Properties Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // --- Skeleton: Display while data is loading ---
          Array.from({ length: 3 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))
        ) : (
          // Render the actual featured properties once loaded
          featuredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;