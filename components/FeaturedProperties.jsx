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
    // --- 1. Дэвсгэрийг брэндийн өнгөтэйгөө уялдуулсан ---
    <div className="bg-zolGreen/5 py-20 md:py-28 px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        {/* --- 2. Гарчгийг Playfair Display фонт, ногоон өнгөтэй болгосон --- */}
        <h2 className="font-playfair font-bold text-4xl md:text-5xl text-zolGreen">
          Онцлох Үл Хөдлөх Хөрөнгө
        </h2>
        <p className="mt-4 text-zolDark/70 max-w-2xl text-lg leading-relaxed">
          Тансаг зэрэглэлийн харшаас эхлээд тохилог гэр бүлийн байшин хүртэлх бидний онцгойлон сонгосон үл хөдлөх хөрөнгүүдтэй танилцана уу.
        </p>
        {/* --- 3. Ялгах зураасыг алтан шаргал өнгөтэй болгосон --- */}
        <div className="w-28 h-1 bg-zolGold mt-6 rounded-full"></div>
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