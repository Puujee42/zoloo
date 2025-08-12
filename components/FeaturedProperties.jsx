'use client'

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from './PropertyCard'; // The reusable card component
import PropertyCardSkeleton from './PropertyCardSkeleton'; // The reusable skeleton loader

/**
 * A component to display a curated list of "Featured" properties.
 */
const FeaturedProperties = () => {
  const { properties, isLoading } = useAppContext();

  // In a real application, you might have a specific flag for featured properties.
  // For this example, we'll simply feature the first 3 properties from the list.
  const featuredProperties = properties?.slice(0, 3) || [];

  return (
    <div className="py-20 md:py-28">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Properties</h2>
        <p className="mt-2 text-gray-600 max-w-xl">
          Discover our handpicked selection of premier properties, from luxurious estates to cozy family homes.
        </p>
        <div className="w-24 h-1 bg-blue-600 mt-4 rounded-full"></div>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {isLoading ? (
          // If loading, show 3 skeleton placeholders
          Array.from({ length: 3 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))
        ) : (
          // Once loaded, show the actual featured properties
          featuredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedProperties;