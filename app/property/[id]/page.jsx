// /app/property/[id]/page.jsx

import React from 'react';
import Link from 'next/link';
import { getPropertyById, getProperties } from '@/lib/data'; // This now fetches creator info
import PropertyDetailsClient from './PropertyDetailsClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchX } from 'lucide-react';

// This is a Server Component. It fetches data and passes it to the client component.
export default async function PropertyPage({ params: { id } }) {
  // Promise.all fetches the main property and related properties concurrently
  const [property, allProperties] = await Promise.all([
    getPropertyById(id), // This function is now fixed and returns the 'creator' object
    getProperties({ limit: 5 }) // Increased limit to ensure we have 4 related ones
  ]);

  // --- "Not Found" fallback ---
  // This runs on the server if the property is not found in the database.
  if (!property) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[75vh] bg-gradient-to-br from-zolGreen/10 via-white to-zolGold/5 p-6">
          <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100 max-w-lg text-center">
            <div className="flex justify-center items-center mx-auto h-20 w-20 rounded-full bg-red-100 shadow-inner">
              <SearchX className="h-10 w-10 text-red-500" />
            </div>
            <h1 className="font-playfair mt-6 text-3xl md:text-4xl font-bold text-zolGreen">
              Үл хөдлөх хөрөнгө олдсонгүй
            </h1>
            <p className="mt-3 text-zolDark/70 leading-relaxed">
              Таны хайж буй үл хөдлөх хөрөнгө одоогоор байхгүй эсвэл зах зээлээс хасагдсан байна.
            </p>
            <div className="mt-8">
              <Link
                href="/all-properties"
                className="inline-block bg-zolGold text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-zolGold/90 transition-all"
              >
                Бүх үл хөдлөх хөрөнгийг үзэх
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Filter out the current property from the list of related properties
  const relatedProperties = allProperties
    .filter(p => p._id.toString() !== property._id.toString())
    .slice(0, 4); // Ensure we only show a maximum of 4

  // The 'property' object now contains the 'creator' field, which is passed down.
  // JSON.parse(JSON.stringify(...)) is a necessary step to pass complex objects
  // (like Mongoose documents with BSON IDs) from a Server Component to a Client Component.
  return (
    <>
      <Navbar />
      <PropertyDetailsClient
        property={JSON.parse(JSON.stringify(property))}
        relatedProperties={JSON.parse(JSON.stringify(relatedProperties))}
      />
      <Footer />
    </>
  );
}