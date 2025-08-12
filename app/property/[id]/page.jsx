// /app/property/[id]/page.jsx

import React from 'react';
import Link from 'next/link';
import { getPropertyById, getProperties } from '@/lib/data'; 
import PropertyDetailsClient from './PropertyDetailsClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Home, X } from 'lucide-react'; // Icons for the "Not Found" state

export default async function PropertyPage({ params }) {
  const { id } = params;

  // Fetch the main property and a list of other properties in parallel for efficiency.
  const [property, allProperties] = await Promise.all([
    getPropertyById(id),
    getProperties({ limit: 4 }) // Fetch 4 properties for the "Similar Properties" section
  ]);

  // --- STYLED NOT FOUND STATE ---
  // If the main property isn't found, show a styled "not found" page consistent with the brand.
  if (!property) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-gray-50 p-4">
          <div className="bg-white p-10 rounded-xl shadow-lg border border-gray-200">
            <div className="flex justify-center items-center mx-auto h-20 w-20 rounded-full bg-red-100">
              <Home className="h-10 w-10 text-red-600" />
              <X className="h-6 w-6 text-red-600 absolute ml-2 mb-2" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-green-900">Үл хөдлөх хөрөнгө олдсонгүй</h1>
            <p className="mt-3 text-gray-600 max-w-md">
              Таны хайж буй үл хөдлөх хөрөнгө байхгүй эсвэл зах зээлээс хасагдсан байна.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-block bg-amber-500 text-green-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105"
              >
                Нүүр хуудас руу буцах
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Filter the current property out of the list to create a "related" properties list.
  // Using .toString() is the safest way to compare MongoDB ObjectIDs.
  const relatedProperties = allProperties
    .filter(p => p._id.toString() !== property._id.toString())
    // Ensure we still have 4 properties if the current one was in the initial fetch
    .slice(0, 4);

  // Render the Client Component and pass the fetched data down as props.
  // The client component is now wrapped in the page layout.
  return (
    <>
      <PropertyDetailsClient 
        property={property} 
        relatedProperties={relatedProperties} 
      />
    </>
  );
}