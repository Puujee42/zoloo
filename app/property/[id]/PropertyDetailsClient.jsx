// /app/property/[id]/PropertyDetailsClient.jsx
'use client';

import React, { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { BedDouble, Bath, LandPlot, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function PropertyDetailsClient({ property, relatedProperties }) {
  // --- Image Gallery State ---
  // No changes to logic.
  const [selectedImage, setSelectedImage] = useState(property?.images?.[0] || '/fallback-image.png');

  // --- Price Formatting Helper ---
  // Updated to use the Mongolian currency symbol for consistency.
  const formatPrice = (price) => {
    if (typeof price !== 'number') return "Үнэ тохиролцоно";
    return `${price.toLocaleString()}₮`;
  };

  return (
    <div className="bg-gray-50 min-h-screen"> {/* Changed background for better contrast */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Navbar />
        {/* --- Main Property Section --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* --- Image Gallery --- */}
          <div className="lg:col-span-2">
            <div className="aspect-w-16 aspect-h-10 w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
              <img src={selectedImage} alt={property.title} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="mt-4 grid grid-cols-5 gap-3">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  // Themed active and hover states for thumbnails
                  className={`aspect-square w-full rounded-lg overflow-hidden border-2 transition-all ${selectedImage === image ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100 hover:border-amber-400'}`}
                >
                  <img src={image} alt={`${property.title} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* --- Property Info & Agent Card --- */}
          <div className="space-y-8 lg:col-span-1">
            {/* Basic Info Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-3xl font-bold tracking-tight text-green-900">{property.title}</h1>
              <div className="mt-2 flex items-center gap-2 text-gray-600">
                <MapPin size={16} />
                <p>{property.address}</p>
              </div>
              <p className="text-4xl font-extrabold text-green-900 mt-4">{formatPrice(property.price)}</p>
            
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-4 text-center border-t border-b mt-6 py-4">
                <div className="flex flex-col items-center gap-1"><BedDouble className="text-green-800"/> <span className="font-medium text-sm text-gray-700">{property.bedrooms} Ор</span></div>
                <div className="flex flex-col items-center gap-1"><Bath className="text-green-800"/> <span className="font-medium text-sm text-gray-700">{property.bathrooms} Угаалгын өрөө</span></div>
                <div className="flex flex-col items-center gap-1"><LandPlot className="text-green-800"/> <span className="font-medium text-sm text-gray-700">{property.area.toLocaleString()} м²</span></div>
              </div>

              {/* Description */}
              <div className="mt-6">
                <h3 className="font-bold text-lg text-green-900 mb-2">Тодорхойлолт</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
              </div>

              {/* Features */}
              {property.features && property.features.length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <h3 className="font-bold text-lg text-green-900 mb-4">Онцлог шинж чанарууд</h3>
                  <div className="flex flex-wrap gap-3">
                    {property.features.map(feature => (
                      <span key={feature} className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">{feature}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Agent/Contact Card */}
            <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-lg">
                <h3 className="font-semibold text-green-900 mb-4 text-xl">Бүртгэсэн</h3>
                <div className="flex items-center space-x-4">
                    <img src={property.userId?.image || '/default-agent.png'} alt={property.userId?.name || 'Агент'} className="h-16 w-16 rounded-full object-cover border-2 border-amber-500" />
                    <div>
                        <div className="font-bold text-lg text-green-900">{property.userId?.name || 'Манай агент'}</div>
                        <div className="text-sm text-gray-500">Pro Realty Group</div>
                    </div>
                </div>
                <div className="mt-6 space-y-3">
                    <button className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-105">Танилцах цаг товлох</button>
                    <button className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 rounded-lg transition-all">Агенттай холбогдох</button>
                </div>
            </div>
          </div>
        </div>

        {/* --- Related Properties Section --- */}
        <div className="mt-24 border-t pt-16">
          <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">Төстэй үл хөдлөх хөрөнгө</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {relatedProperties.map(p => (
              <PropertyCard key={p._id} property={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}