// /components/HeaderSlider.jsx

'use client' // This component uses hooks, so it must be a client component.

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useAppContext } from "@/context/AppContext"; // Import the AppContext
import { useRouter } from "next/navigation"; // Import the Next.js router
import { BedDouble, Bath, LandPlot, MoveRight } from "lucide-react"; // Import icons
import { assets } from '@/assets/assets'; // Import your assets

const HeaderSlider = () => {
  // --- 1. Get properties and loading state from the global context ---
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  // --- 2. Select the first 3 properties for the slider ---
  const sliderProperties = properties.slice(0, 3);

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (sliderProperties.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderProperties.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [sliderProperties.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleViewDetails = (propertyId) => {
    router.push(`/property/${propertyId}`);
  };

  // --- 3. Display a skeleton loader while properties are being fetched ---
  if (isLoading) {
    return (
      <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden rounded-2xl mt-6 shadow-2xl bg-gray-300 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-16">
          <div className="h-12 w-3/4 bg-gray-400/50 rounded-lg mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-400/50 rounded-lg"></div>
          <div className="flex items-center gap-6 mt-6">
            <div className="h-6 w-20 bg-gray-400/50 rounded-md"></div>
            <div className="h-6 w-20 bg-gray-400/50 rounded-md"></div>
            <div className="h-6 w-24 bg-gray-400/50 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  // --- 4. Don't render the component if there are no properties to display ---
  if (!sliderProperties || sliderProperties.length === 0) {
    return null; // Or return a placeholder message
  }

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden rounded-2xl mt-6 shadow-2xl">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderProperties.map((property) => (
          <div key={property._id} className="relative min-w-full h-full text-white">
            {/* Background Image */}
            {/* --- FIX:  Conditionally render the Image if the image array is not null or empty--- */}
            {property?.images && property.images.length > 0 ? (
               <Image
                   src={property.images[0]}
                   alt={property.title}
                   fill
                   className="z-0 object-cover"
                   priority={true} // Prioritize loading the first image
               />
            ) : (
               <Image // Fallback image if no image is available
                   src={assets.fallback_property_image} // Replace with your fallback path
                   alt={property.title}
                   fill
                   className="z-0 object-cover"
                   priority={true}
               />
            )}

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-16">
              <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight" style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}>
                {property.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-200" style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}>
                {property.description}
              </p>
              
              {/* Property Details */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-gray-200">
                  <div className="flex items-center gap-2"><BedDouble size={20} /> {property.bedrooms} Ор</div>
                  <div className="flex items-center gap-2"><Bath size={20} /> {property.bathrooms} Угаалгын өрөө</div>
                  <div className="flex items-center gap-2"><LandPlot size={20} /> {property.area.toLocaleString()} м²</div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <button 
                  onClick={() => handleViewDetails(property._id)}
                  // --- 5. Styled with gold to match the brand ---
                  className="px-8 py-3 bg-yellow-400 text-black rounded-lg font-bold hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-lg"
                >
                  Үл хөдлөх хөрөнгийн дэлгэрэнгүйг харах
                </button>
                <button 
                  onClick={() => router.push('/contact')}
                  // --- 6. Styled for secondary action, consistent with other components ---
                  className="group flex items-center gap-2 px-8 py-3 font-semibold bg-white/10 backdrop-blur-sm border border-white/40 rounded-lg hover:bg-white hover:text-green-900 transition-colors shadow-lg"
                >
                  Агенттай холбогдох
                  <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Thumbnails */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        {sliderProperties.map((property, index) => (
          <div
            key={property._id}
            onClick={() => handleSlideChange(index)}
            // --- 7. Active border is now gold ---
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              currentSlide === index ? "border-yellow-400 scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
                src={property.images[0]}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={50}
                className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;