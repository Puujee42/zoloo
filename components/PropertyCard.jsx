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
    price = "Үнэ асууна уу",
    title = "Гарчиггүй үл хөдлөх",
    address = "Хаяг байхгүй",
    bedrooms = 0,
    bathrooms = 0,
    area = "N/A",
    status = 'Зарагдаж байна'
  } = property;

  const imageSrc =
    images?.[0] && typeof images[0] === 'string'
      ? images[0]
      : assets.fallback_property_image;
      
  // --- URL FOR THE EMBEDDED IFRAME ---
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

  // --- NEW URL FOR THE EXTERNAL LINK ---
  // This URL opens the standard Google Maps search in a new tab.
  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleCardClick = () => {
    if (!isMapVisible && _id) {
      router.push(`/property/${_id}`);
      window.scrollTo(0, 0);
    }
  };

  const toggleView = (e) => {
    e.stopPropagation();
    setIsMapVisible(prev => !prev);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl flex flex-col h-full cursor-pointer"
    >
      {/* Property Image */}
      <div className="relative overflow-hidden h-56">
        <Image
          src={imageSrc}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-4 left-4 bg-green-900/70 text-white px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm">
          {status}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        {isMapVisible ? (
          // --- MAP VIEW (No change here) ---
          <>
            <h3 className="text-lg font-semibold text-green-900 truncate" title={title}>
              {title}
            </h3>
            <div className="flex-grow mt-2 rounded-md overflow-hidden border">
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
          // --- DETAILS VIEW ---
          <>
            <p className="text-xl font-bold text-green-900">
              {typeof price === 'number' ? `${price.toLocaleString()}₮` : price}
            </p>
            <h3 className="text-lg font-semibold text-green-900 truncate mt-1" title={title}>
              {title}
            </h3>
            
            {/* --- THIS IS THE MODIFIED PART --- */}
            {/* The address is now a link that opens Google Maps in a new tab. */}
            <a 
              href={googleMapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()} // Prevents the main card click from firing.
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

            {/* This button still toggles the in-card map */}
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