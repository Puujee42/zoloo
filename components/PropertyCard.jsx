'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { assets } from '@/assets/assets';
// MODIFICATION: Import the PlayCircle icon
import { BedDouble, Bath, LandPlot, MapPin, Info, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyCard = ({ property, showMapInitially = false }) => {
  const router = useRouter();
  const [isMapVisible, setIsMapVisible] = useState(showMapInitially);

  if (!property) return null;

  const {
    _id,
    images,
    videos, // MODIFICATION: Destructure the videos array
    price = "Үнэ асууна уу",
    title = "Гарчиггүй үл хөдлөх",
    address = "Хаяг байхгүй",
    bedrooms = 0,
    bathrooms = 0,
    area = "N/A",
    status = 'Зарагдаж байна'
  } = property;

  // --- VIDEO HANDLING LOGIC ---
  // 1. Check if there are any videos.
  const hasVideo = videos && videos.length > 0;
  // 2. Determine which media to show. Prioritize video.
  const mediaUrl = hasVideo ? videos[0] : (images?.[0] || assets.fallback_property_image);
  // 3. Determine the type of media for conditional rendering.
  const mediaType = hasVideo ? 'video' : 'image';

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  const handleCardClick = (e) => {
    if (e.target.closest('button') || e.target.tagName === 'A') {
      return;
    }
    if (_id) {
      router.push(`/property/${_id}`);
      window.scrollTo(0, 0);
    }
  };

  const toggleView = (e) => {
    e.stopPropagation();
    setIsMapVisible(prev => !prev);
  };

  return (
    <motion.div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* --- MODIFIED Property Media Section --- */}
      <div className="relative overflow-hidden h-56">
        <motion.div
          initial={{ scale: 1.05 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="h-full w-full"
        >
          {/* Conditionally render video or image */}
          {mediaType === 'video' ? (
            <video
              src={mediaUrl}
              autoPlay
              loop
              muted
              playsInline // Essential for autoplay on mobile browsers
              className="w-full h-full object-cover transition-transform duration-500"
            />
          ) : (
            <Image
              src={mediaUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-500"
            />
          )}
        </motion.div>
        <span className="absolute top-4 left-4 bg-green-900/70 text-white px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm">
          {status}
        </span>
        {/* Add a visual indicator if a video is present */}
        {hasVideo && (
            <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm" title="Видео бичлэгтэй">
                <PlayCircle size={20} />
            </div>
        )}
      </div>

      {/* Content with Animated Views (No changes needed here) */}
      <div className="p-5 flex flex-col flex-grow">
        <AnimatePresence mode="wait">
          {isMapVisible ? (
            <motion.div
              key="map"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col flex-grow"
            >
              <h3 className="text-lg font-semibold text-green-900 truncate" title={title}>
                {title}
              </h3>
              <div className="flex-grow mt-2 rounded-md overflow-hidden border border-gray-300 h-40">
                <iframe
                  src={googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${title}-ийн газрын зураг`}
                ></iframe>
              </div>
              <motion.button
                onClick={toggleView}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                <Info size={16} /> Дэлгэрэнгүй харах
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col flex-grow"
            >
              <p className="text-xl font-bold text-green-900">
                {typeof price === 'number' ? `${price.toLocaleString()}₮` : price}
              </p>
              <h3 className="text-lg font-semibold text-green-900 truncate mt-1" title={title}>
                {title}
              </h3>

              <div className="flex items-center justify-between text-gray-700 mt-4 border-t pt-4 text-sm">
                <PropertyDetail icon={<LandPlot size={18} />} value={area} label="м²" />
              </div>

              <motion.button
                onClick={toggleView}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                <MapPin size={16} /> Газрын зураг харах
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// Helper component
const PropertyDetail = ({ icon, value, label }) => (
  <div className="flex items-center gap-2" title={`${value} ${label}`}>
    <span className="text-green-800">{icon}</span>
    <span className="font-medium">
      {typeof value === 'number' ? value.toLocaleString() : value} {label}
    </span>
  </div>
);

export default PropertyCard;