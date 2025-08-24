import React from 'react';

/**
 * A skeleton loader component that mimics the layout of the PropertyCard.
 * It uses a pulsing animation to indicate that data is being loaded.
 */
const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image Placeholder */}
      <div className="w-full h-56 bg-gray-300"></div>
      
      {/* Content Placeholder */}
      <div className="p-5">
        {/* Price Placeholder */}
        <div className="h-6 w-1/2 bg-gray-300 rounded mb-2"></div>
        
        {/* Title Placeholder */}
        <div className="h-5 w-3/4 bg-gray-200 rounded"></div>
        
        {/* Address Placeholder */}
        <div className="h-4 w-full bg-gray-200 rounded mt-2"></div>
        
        {/* Specs Placeholder */}
        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <div className="h-5 w-12 bg-gray-300 rounded"></div>
          <div className="h-5 w-12 bg-gray-300 rounded"></div>
          <div className="h-5 w-16 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCardSkeleton;