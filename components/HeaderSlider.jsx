// /components/HeaderSlider.jsx

'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { LandPlot, MoveRight } from "lucide-react";
import { assets } from '@/assets/assets';
import { motion, AnimatePresence } from "framer-motion";

const HeaderSlider = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  const sliderProperties = properties.slice(0, 3);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide every 4s
  useEffect(() => {
    if (sliderProperties.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliderProperties.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [sliderProperties.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleViewDetails = (propertyId) => {
    router.push(`/property/${propertyId}`);
  };

  // Skeleton Loader
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
      {/* Slides */}
      <AnimatePresence initial={false} mode="wait">
        {sliderProperties.map(
          (property, index) =>
            index === currentSlide && (
              <motion.div
                key={property._id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
              >
                {/* Background Image with subtle zoom-in */}
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1 }}
                  animate={{ scale: 1.05 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                >
                  <Image
                    src={property?.images?.[0] || assets.fallback_property_image}
                    alt={property.title}
                    fill
                    className="z-0 object-cover"
                    priority={index === 0}
                  />
                </motion.div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10" />

                {/* Content */}
                <motion.div
                  className="relative z-20 flex flex-col justify-end h-full p-8 md:p-16 text-white"
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.45, ease: "easeOut" }}
                >
                  <h1 className="font-playfair font-bold text-3xl md:text-5xl max-w-3xl leading-tight drop-shadow-lg">
                    {property.title}
                  </h1>
                  <p className="mt-4 max-w-2xl text-lg text-white/90 drop-shadow-md line-clamp-3 sm:line-clamp-none">
                    {property.description}
                  </p>

                  {/* Property Details */}
                  <motion.div
                    className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-white/90"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25, duration: 0.45 }}
                  >
                    <div className="flex items-center gap-2 drop-shadow-sm">
                      <LandPlot size={20} /> {property.area.toLocaleString()} м²
                    </div>
                  </motion.div>

                  {/* Action Buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row items-start gap-4 mt-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.45 }}
                  >
                    <button
                      onClick={() => handleViewDetails(property._id)}
                      className="px-8 py-3 bg-zolGold text-white rounded-full font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 hover:shadow-[0_0_15px_rgba(212,175,55,0.6)]"
                    >
                      Дэлгэрэнгүй харах
                    </button>
                    <button
                      onClick={() => router.push('/contact')}
                      className="group flex items-center gap-2 px-8 py-3 font-semibold bg-transparent border-2 border-zolGold rounded-full text-white hover:bg-zolGold hover:shadow-lg transition-all"
                    >
                      Агенттай холбогдох
                      <MoveRight
                        size={20}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                  </motion.div>
                </motion.div>
              </motion.div>
            )
        )}
      </AnimatePresence>

      {/* Navigation Thumbnails (Desktop) */}
      <div className="absolute bottom-8 right-8 z-30 hidden sm:flex items-center gap-3">
        {sliderProperties.map((property, index) => (
          <motion.div
            key={property._id}
            onClick={() => handleSlideChange(index)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200 ${
              currentSlide === index
                ? "border-zolGold scale-110 shadow-lg"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={property.images?.[0] || assets.fallback_property_image}
              alt={`Thumbnail ${index + 1}`}
              width={80}
              height={50}
              className="object-cover h-[50px]"
            />
          </motion.div>
        ))}
      </div>

      {/* Navigation Dots (Mobile) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex sm:hidden gap-2">
        {sliderProperties.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? "bg-zolGold scale-110" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;
