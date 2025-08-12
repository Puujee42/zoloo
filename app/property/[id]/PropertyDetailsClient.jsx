// Recommended file path: /app/property/[id]/PropertyDetailsClient.jsx
'use client';

import React, { useState } from 'react';
import PropertyCard from '@/components/PropertyCard'; // Use the new PropertyCard
import { BedDouble, Bath, LandPlot, Phone, Mail, MapPin } from 'lucide-react'; // Import relevant icons

export default function PropertyDetailsClient({ property, relatedProperties }) {
  // --- State for the image gallery ---
  // If property or images are somehow missing, provide a fallback to prevent errors.
  const [selectedImage, setSelectedImage] = useState(property?.images?.[0] || '/fallback-image.png');

  // --- Helper to format price ---
  const formatPrice = (price) => {
    if (typeof price !== 'number') return "Price Upon Request";
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* --- Main Property Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* --- Image Gallery (takes up 2 of 3 columns) --- */}
          <div className="lg:col-span-2">
            <div className="aspect-w-16 aspect-h-10 w-full overflow-hidden rounded-lg border border-gray-200">
              <img src={selectedImage} alt={property.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square w-full rounded-md overflow-hidden border-2 transition-all ${selectedImage === image ? 'border-blue-600 scale-110' : 'border-transparent hover:border-blue-400'}`}
                >
                  <img src={image} alt={`${property.title} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- Property Info & Agent Card (takes up 1 of 3 columns) --- */}
          <div className="space-y-8 lg:col-span-1">
            {/* Core Info */}
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{property.title}</h1>
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <p>{property.address}</p>
              </div>
              <p className="text-4xl font-semibold text-blue-700 mt-4">{formatPrice(property.price)}</p>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-3 gap-4 text-center border-t border-b py-4">
              <div className="flex flex-col items-center"><BedDouble className="text-gray-500"/> <span className="mt-1 font-medium">{property.bedrooms} Beds</span></div>
              <div className="flex flex-col items-center"><Bath className="text-gray-500"/> <span className="mt-1 font-medium">{property.bathrooms} Baths</span></div>
              <div className="flex flex-col items-center"><LandPlot className="text-gray-500"/> <span className="mt-1 font-medium">{property.area.toLocaleString()} sqft</span></div>
            </div>
            
            {/* Description */}
            <div className="prose text-gray-600">
              <h3 className="font-semibold text-gray-900">Description</h3>
              <p>{property.description}</p>
            </div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {property.features.map(feature => (
                    <span key={feature} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1.5 rounded-full">{feature}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Agent/Contact Card */}
            <div className="p-6 border border-gray-200 rounded-lg bg-gray-50 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4">Listed By</h3>
                <div className="flex items-center space-x-4">
                    {/* Note: property.userId.image should be populated in your data loader */}
                    <img src={property.userId?.image || '/default-agent.png'} alt={property.userId?.name || 'Agent'} className="h-16 w-16 rounded-full object-cover" />
                    <div>
                        <div className="font-bold text-lg text-gray-900">{property.userId?.name || 'Our Agent'}</div>
                        <div className="text-sm text-gray-600">Pro Realty Group</div>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-105">Schedule a Tour</button>
                    <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg transition-all">Contact Agent</button>
                </div>
            </div>
          </div>
        </div>

        {/* --- Similar Properties Section --- */}
        <div className="mt-24 border-t pt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProperties.map(p => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}