// components/PropertyCard.jsx

'use client' // Ensure this is a client component if using hooks or interactivity

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { assets } from '@/assets/assets'; // For fallback images
// Import modern icons from lucide-react
import { BedDouble, Bath, LandPlot } from 'lucide-react';

// The component should now accept 'property' as its prop
const PropertyCard = ({ property }) => {
  const router = useRouter();

  // --- CRITICAL FIX: GUARD CLAUSE ---
  // If the property prop is undefined, stop rendering here to prevent errors.
  if (!property) {
    return null; 
  }

  // --- Robust Data Destructuring with Defaults ---
  // Now that we know 'property' exists, we can safely destructure it.
  const {
    _id,
    images,
    price = "Call for Price",
    title = "Untitled Property",
    address = "Address not available",
    bedrooms = 0,
    bathrooms = 0,
    area = "N/A",
    status = 'For Sale'
  } = property;

  // --- Defensive Image Source Check ---
  // Ensure a valid image URL is used; otherwise, provide a fallback.
  const imageSrc =
    images && Array.isArray(images) && images.length > 0 && typeof images[0] === 'string'
      ? images[0]
      : assets.fallback_property_image; // Make sure you have a 'fallback_property_image' in your assets

  const handleCardClick = () => {
    // Only navigate if there is a valid ID
    if (_id) {
      router.push(`/property/${_id}`);
      window.scrollTo(0, 0); // Scroll to top on navigation
    }
  };

  return (
    <div
      onClick={handleCardClick} // Uses the new click handler
      className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl cursor-pointer flex flex-col h-full"
    >
      {/* --- Image Section --- */}
      <div className="relative overflow-hidden h-56">
        <Image
          src={imageSrc}
          alt={title} // Uses 'title' from 'property'
          layout="fill" // Correct Next.js Image prop
          objectFit="cover" // Correct Next.js Image prop (via className)
          className="group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-black/60 text-white px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm">
          {status} {/* Uses 'status' from 'property' */}
        </div>
      </div>

      {/* --- Content Section --- */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Price */}
        <p className="text-xl font-bold text-blue-600">
          {typeof price === 'number' ? `$${price.toLocaleString()}` : price}
        </p>

        {/* Title & Address */}
        <h3 className="text-lg font-semibold text-gray-800 truncate mt-1" title={title}>
          {title} {/* Uses 'title' from 'property' */}
        </h3>
        <p className="text-sm text-gray-600 mt-1 truncate flex-grow" title={address}>
          {address} {/* Uses 'address' from 'property' */}
        </p>

        {/* Key Specs with Icons */}
        <div className="flex items-center justify-between text-gray-700 mt-4 border-t pt-4 text-sm">
          <div className="flex items-center gap-2" title={`${bedrooms} Bedrooms`}>
            <BedDouble size={18} className="text-gray-500" />
            <span className="font-medium">{bedrooms}</span>
          </div>
          <div className="flex items-center gap-2" title={`${bathrooms} Bathrooms`}>
            <Bath size={18} className="text-gray-500" />
            <span className="font-medium">{bathrooms}</span>
          </div>
          <div className="flex items-center gap-2" title={`${area} sqft`}>
            <LandPlot size={18} className="text-gray-500" />
            <span className="font-medium">{typeof area === 'number' ? area.toLocaleString() : area} sqft</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;