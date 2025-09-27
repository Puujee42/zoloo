// /components/HeaderSlider.jsx

'use client'

import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { LandPlot, MoveRight, ChevronLeft, ChevronRight, DollarSign, CalendarDays } from "lucide-react";
import { assets } from '@/assets/assets';
import { motion, AnimatePresence } from "framer-motion";

const HeaderSlider = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();
  
  // Sort properties by creation date to get the latest ones, and take the first 5.
  const latestProperties = properties
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
    
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide every 5 seconds, pause on hover
  useEffect(() => {
    if (latestProperties.length <= 1 || isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % latestProperties.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [latestProperties.length, isHovered]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };
  
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % latestProperties.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + latestProperties.length) % latestProperties.length);

  const handleViewDetails = (propertyId) => {
    router.push(`/property/${propertyId}`);
  };

  // Enhanced Skeleton Loader with luxury shimmer
  if (isLoading) {
    return (
      <div 
        className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden rounded-2xl mt-6 shadow-2xl bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-zolGold/5 via-transparent to-zolGreen/5 animate-shimmer"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-16">
          <div className="h-12 w-3/4 bg-gray-400/50 rounded-lg mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-400/50 rounded-lg mb-6"></div>
          <div className="flex items-center gap-6">
            <div className="h-6 w-20 bg-gray-400/50 rounded-md"></div>
            <div className="h-6 w-24 bg-gray-400/50 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!latestProperties || latestProperties.length === 0) {
    return (
        <div className="w-full h-[50vh] flex flex-col items-center justify-center text-zolDark/50 text-xl font-poppins rounded-2xl bg-gray-50 mt-6 border">
            <h2 className="text-2xl font-semibold mb-2">Шинэ зар олдсонгүй</h2>
            <p>одоогоор харуулах шинээр нэмэгдсэн зар байхгүй байна.</p>
        </div>
    );
  }

  return (
    <div 
      className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden rounded-2xl mt-6 shadow-2xl border border-zolGold/10 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            className="absolute inset-0 w-full h-full"
            initial={{ opacity: 0, scale: 1.05, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.98, x: -50 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* Background Image with enhanced parallax zoom */}
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.15 }}
              animate={{ scale: isHovered ? 1.1 : 1.15 }}
              transition={{ duration: 10, ease: "easeInOut" }}
            >
              <Image
                src={latestProperties[currentSlide]?.images?.[0] || assets.fallback_property_image}
                alt={latestProperties[currentSlide].title}
                fill
                className="z-0 object-cover"
                priority
              />
            </motion.div>

            {/* Enhanced Overlay with gold-green gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-br from-zolGold/10 via-transparent to-zolGreen/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.3 : 0 }}
              transition={{ duration: 0.4 }}
            />

            {/* Content - Staggered luxury entrance */}
            <motion.div
              className="relative z-20 flex flex-col justify-end h-full p-8 md:p-16 text-white"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.15 } }
              }}
            >
              <motion.h1 
                className="font-playfair font-bold text-3xl md:text-5xl max-w-3xl leading-tight drop-shadow-2xl"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {latestProperties[currentSlide].title}
              </motion.h1>

              <motion.p 
                className="mt-4 max-w-2xl text-lg text-white/95 drop-shadow-lg line-clamp-2"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                {latestProperties[currentSlide].description}
              </motion.p>

              {/* Details Section */}
              <motion.div
                className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-white/90"
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <motion.div 
                  className="flex items-center gap-2 drop-shadow-md"
                  whileHover={{ scale: 1.05, color: "#D4AF37" }}
                >
                  <LandPlot size={20} className="text-zolGold" />
                  {latestProperties[currentSlide].area.toLocaleString()} м²
                </motion.div>
                {latestProperties[currentSlide].price && (
                  <motion.div 
                    className="flex items-center gap-2 drop-shadow-md"
                    whileHover={{ scale: 1.05, color: "#32CD32" }}
                  >
                    <DollarSign size={20} className="text-zolGreen"/>
                    {latestProperties[currentSlide].price.toLocaleString()}₮
                  </motion.div>
                )}
                 <motion.div 
                    className="flex items-center gap-2 drop-shadow-md opacity-80"
                    whileHover={{ scale: 1.05, opacity: 1 }}
                  >
                    <CalendarDays size={18} />
                    {new Date(latestProperties[currentSlide].createdAt).toLocaleDateString()}
                  </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row items-start gap-4 mt-8"
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(212, 175, 55, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleViewDetails(latestProperties[currentSlide]._id)}
                  className="px-8 py-3 bg-gradient-to-r from-zolGold to-zolGreen text-white rounded-full font-semibold text-lg shadow-lg relative overflow-hidden transition-all duration-300"
                >
                  <span className="relative z-10">Дэлгэрэнгүй</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push('/contact')}
                  className="group flex items-center gap-2 px-8 py-3 font-semibold bg-transparent border-2 border-white rounded-full text-white shadow-md transition-all duration-300"
                >
                  Холбогдох
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <MoveRight size={20} />
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.div 
        className="absolute inset-0 z-30 flex items-center justify-between px-4 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          onClick={prevSlide}
          className="p-3 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full text-white pointer-events-auto"
          whileHover={{ scale: 1.1, boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous Slide"
        >
          <ChevronLeft size={28} />
        </motion.button>
        <motion.button
          onClick={nextSlide}
          className="p-3 bg-black/30 backdrop-blur-sm hover:bg-black/50 rounded-full text-white pointer-events-auto"
          whileHover={{ scale: 1.1, boxShadow: "0 5px 15px rgba(0,0,0,0.3)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next Slide"
        >
          <ChevronRight size={28} />
        </motion.button>
      </motion.div>

      {/* Navigation Progress Bar & Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {latestProperties.map((_, index) => (
          <button
            key={index}
            onClick={() => handleSlideChange(index)}
            className="w-10 h-1.5 rounded-full relative overflow-hidden bg-white/20 backdrop-blur-sm transition-colors hover:bg-white/40"
            aria-label={`Go to slide ${index + 1}`}
          >
             <AnimatePresence>
              {currentSlide === index && (
                <motion.div 
                  key={`progress-${currentSlide}`} // Add key to re-trigger animation
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-zolGold to-zolGreen"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1, originX: 0 }}
                  transition={{ duration: 4.8, ease: "linear" }}
                />
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;