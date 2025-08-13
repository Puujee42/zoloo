'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { assets } from '@/assets/assets';
import { BedDouble, Bath, LandPlot, MapPin, Info } from 'lucide-react';

/**
 * A reusable card component to display property information and a map view.
 */
const PropertyCard = ({ property, showMapInitially = false }) => {
  const router = useRouter();
  const [isMapVisible, setIsMapVisible] = useState(showMapInitially);

  if (!property) return null;

  const {
    _id,
    images,
    videos,
    price = "Үнэ асууна уу",
    title = "Гарчиггүй үл хөдлөх",
    address = "Хаяг байхгүй",
    bedrooms = 0,
    bathrooms = 0,
    area = "N/A",
    status = 'Зарагдаж байна'
  } = property;

    // Determine the first media item to display (video or image)
    const firstMedia = videos?.[0] ? { type: 'video', src: videos[0] } : { type: 'image', src: images?.[0] || assets.fallback_property_image };

  // --- Google Maps Embed URL for the in-card map ---
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  // --- Google Maps Search URL (opens in a new tab) ---
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  // Navigate to property details page on card click (if not in map view)
  const handleCardClick = (e) => {
        // Prevent navigation if a button or link inside the card was clicked
        if (e.target.closest('button') || e.target.tagName === 'A') {
          return;
        }
        if (_id) {
          router.push(`/property/${_id}`);
          window.scrollTo(0, 0);
        }
    };

  // Toggle between details view and map view
  const toggleView = (e) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    setIsMapVisible(prev => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl flex flex-col h-full cursor-pointer"
    >
      {/* Property Media - Images and Videos */}
        <div className="relative overflow-hidden h-56">
          {/* Conditionally render video or image */}
          {firstMedia.type === 'video' ? (
            <video
              src={firstMedia.src}
              alt={title}
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
              <Image
                  src={firstMedia.src}
                  alt={title}
                  fill
                  className="object-cover"
              />
          )}
        <span className="absolute top-4 left-4 bg-green-900/70 text-white px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm">
          {status}
        </span>
      </div>
      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {isMapVisible ? (
          // Map View
          <>
            <h3 className="text-lg font-semibold text-green-900 truncate" title={title}>
              {title}
            </h3>
            <div className="flex-grow mt-2 rounded-md overflow-hidden border border-gray-300">
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
            <button
              onClick={toggleView}
              className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <Info size={16} /> Дэлгэрэнгүй харах
            </button>
          </>
        ) : (
          // Details View
          <>
            <p className="text-xl font-bold text-green-900">
              {typeof price === 'number' ? `${price.toLocaleString()}₮` : price}
            </p>
            <h3 className="text-lg font-semibold text-green-900 truncate mt-1" title={title}>
              {title}
            </h3>
            
            {/* Address as a Google Maps Link */}
            <a
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevent the card click
              className="text-sm text-gray-600 mt-1 flex-grow hover:underline"
              title="Газрын зураг дээр харах"
            >
              {address}
            </a>

            <div className="flex items-center justify-between text-gray-700 mt-4 border-t pt-4 text-sm">
              <PropertyDetail icon={<BedDouble size={18} />} value={bedrooms} label="өрөө" />
              <PropertyDetail icon={<Bath size={18} />} value={bathrooms} label="угаалгын өрөө" />
              <PropertyDetail icon={<LandPlot size={18} />} value={area} label="м²" />
            </div>

            {/* Map View Toggle Button */}
            <button
              onClick={toggleView}
              className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              <MapPin size={16} /> Газрын зураг харах
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Helper component for displaying small details
const PropertyDetail = ({ icon, value, label }) => (
  <div className="flex items-center gap-2" title={`${value} ${label}`}>
    <span className="text-green-800">{icon}</span>
    <span className="font-medium">
      {typeof value === 'number' ? value.toLocaleString() : value} {label}
    </span>
  </div>
);

export default PropertyCard;