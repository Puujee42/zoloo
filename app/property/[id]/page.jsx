// Recommended file path: /app/property/[id]/page.jsx

import React from 'react';
// Import the new data-fetching functions for properties
import { getPropertyById, getProperties } from '@/lib/data'; 
import PropertyDetailsClient from './PropertyDetailsClient'; // The new name for your client component
import Navbar from '@/components/Navbar';

export default async function PropertyPage({ params }) {
  const { id } = params;

  // Fetch the main property and a list of other properties in parallel for efficiency
  const [property, allProperties] = await Promise.all([
    getPropertyById(id),
    getProperties(4) // Fetch 4 properties for a "Similar Properties" section
  ]);

  // If the main property isn't found, show a styled "not found" page.
  if (!property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-3xl font-bold text-gray-800">Property Not Found</h1>
        <p className="mt-2 text-gray-600">The property you are looking for does not exist or has been taken off the market.</p>
      </div>
    );
  }

  // Filter the current property out of the list to create a "related" properties list.
  // Using .toString() is the safest way to compare MongoDB ObjectIDs.
  const relatedProperties = allProperties.filter(
    p => p._id.toString() !== property._id.toString()
  );

  // Render the Client Component and pass the fetched data down as props
  return (
    <>
      <Navbar />
      <PropertyDetailsClient 
        property={property} 
        relatedProperties={relatedProperties} 
      />
    </>
  );
}