// Recommended file path: /app/all-properties/page.jsx (or a similar client page route)
'use client'

import React from 'react'
import { useAppContext } from '@/context/AppContext'
import PropertyCard from '@/components/PropertyCard' // Reusable card component
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton' // Reusable skeleton loader
import Navbar from '@/components/Navbar'

export default function PropertyListPage() {
  // Use the new properties and loading state from the context
  const { properties, isLoading } = useAppContext()

  // --- Professional Loading State ---
  // Show the page structure with skeleton placeholders while loading
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:p-8 py-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">All Properties</h1>
        <p className="text-gray-600 mb-8">Loading our collection of available homes...</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Render 8 skeleton cards */}
          {Array.from({ length: 8 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  // --- No Properties Found State ---
  if (!properties || properties.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:p-8 py-8 text-center">
        <h1 className="text-2xl font-bold">No Properties Found</h1>
        <p className="mt-2 text-gray-600">There are currently no properties listed. Please check back later.</p>
      </div>
    )
  }

  // --- Main Display ---
  // Once loaded, map over the properties and render a PropertyCard for each
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:p-8 py-8">
      <Navbar />
      <h1 className="text-3xl font-bold mb-2 text-gray-800">All Properties</h1>
      <p className="text-gray-600 mb-8">Explore our curated collection of available homes and apartments.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {properties.map(property => (
          // Use the reusable PropertyCard component
          // It handles its own styling and navigation logic
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  )
}