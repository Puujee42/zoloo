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
    // --- 1. Дэвсгэрийг брэндийн өнгөтэйгөө уялдуулсан ---
    <div className="bg-zolGreen/5 py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- 2. Гарчгийг Playfair Display фонт, ногоон өнгөтэй болгосон --- */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-playfair font-bold text-4xl md:text-5xl text-zolGreen">
            Шинээр нэмэгдсэн
          </h2>
          <p className="mt-4 text-zolDark/70 max-w-2xl text-lg leading-relaxed">
            Манай онцгой цуглуулгад шинээр нэмэгдсэн орон сууц, байшин, виллагуудыг сонирхоно уу.
          </p>
          {/* --- Ялгах зураасыг алтан шаргал өнгөтэй болгосон --- */}
          <div className="w-28 h-1 bg-zolGold mt-6 rounded-full"></div>
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

        {/* --- 3. "View All" товчлуурыг zolGold болгосон --- */}
        <div className="mt-16 text-center">
            <button
              onClick={() => router.push('/all-properties')}
              className="px-10 py-3 bg-zolGold text-white font-semibold rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
            >
              Бүх зарыг харах
            </button>
        </div>
      </div>
    </div>
  );
};

export default RecentProperties;