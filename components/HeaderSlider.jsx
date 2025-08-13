// /components/HeaderSlider.jsx

'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { BedDouble, Bath, LandPlot, MoveRight } from "lucide-react";
import { assets } from '@/assets/assets';

const HeaderSlider = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

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

  // Skeleton loader
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

  if (!sliderProperties || sliderProperties.length === 0) {
    return null;
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
            {property?.images && property.images.length > 0 ? (
               <Image
                   src={property.images[0]}
                   alt={property.title}
                   fill
                   className="z-0 object-cover"
                   priority={true}
               />
            ) : (
               <Image
                   src={assets.fallback_property_image}
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
              {/* --- 1. Гарчгийг Playfair Display фонтоор сольсон --- */}
              <h1 className="font-playfair font-bold text-3xl md:text-5xl max-w-3xl leading-tight drop-shadow-lg">
                {property.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md">
                {property.description}
              </p>
              
              {/* Property Details */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-white/90">
                  <div className="flex items-center gap-2 drop-shadow-sm"><BedDouble size={20} /> {property.bedrooms} Ор</div>
                  <div className="flex items-center gap-2 drop-shadow-sm"><Bath size={20} /> {property.bathrooms} Угаалгын өрөө</div>
                  <div className="flex items-center gap-2 drop-shadow-sm"><LandPlot size={20} /> {property.area.toLocaleString()} м²</div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                {/* --- 2. Үндсэн товчлуурыг zolGold болгосон --- */}
                <button 
                  onClick={() => handleViewDetails(property._id)}
                  className="px-8 py-3 bg-zolGold text-white rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Дэлгэрэнгүй харах
                </button>
                {/* --- 3. Хоёрдогч товчлуурын загварыг шинэчилсэн --- */}
                <button 
                  onClick={() => router.push('/contact')}
                  className="group flex items-center gap-2 px-8 py-3 font-semibold bg-transparent border-2 border-zolGold rounded-full text-white hover:bg-zolGold transition-colors shadow-lg"
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
            // --- 4. Идэвхтэй хүрээг zolGold болгосон ---
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              currentSlide === index ? "border-zolGold scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
                src={property.images?.[0] || assets.fallback_property_image} // Fallback for thumbnail
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={50}
                className="object-cover h-[50px]" // Ensure consistent height
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;