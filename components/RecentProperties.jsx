'use client'

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from './PropertyCard'; // The reusable card component
import PropertyCardSkeleton from './PropertyCardSkeleton'; // The reusable skeleton loader
import { useRouter } from 'next/navigation';
import { MoveRight } from 'lucide-react'; // Icon for the "View All" link

const RecentProperties = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  // Show a curated number of properties on the homepage, e.g., the first 8
  const recentProperties = properties?.slice(0, 8) || [];

  return (
    <div className="py-20 md:py-28">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Recently Added Properties
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl">
            Explore the latest homes, apartments, and villas added to our exclusive collection.
          </p>
        </div>
        <button
          onClick={() => router.push('/all-properties')}
          className="group flex items-center gap-2 mt-4 md:mt-0 text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors"
        >
          View All Properties
          <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Conditional Rendering: Show skeletons while loading, otherwise show properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {isLoading ? (
          // If loading, render 8 skeleton placeholders for a good UX
          Array.from({ length: 8 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))
        ) : (
          // If not loading, render the actual property cards
          recentProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecentProperties;