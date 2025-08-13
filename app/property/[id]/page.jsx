// /app/property/[id]/page.jsx

import React from 'react';
import Link from 'next/link';
import { getPropertyById, getProperties } from '@/lib/data';
import PropertyDetailsClient from './PropertyDetailsClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// --- Icon-г SearchX болгож шинэчилсэн ---
import { SearchX } from 'lucide-react';

export default async function PropertyPage({ params: { id } }) {
  const [property, allProperties] = await Promise.all([
    getPropertyById(id),
    getProperties({ limit: 4 })
  ]);

  // --- "Олдсонгүй" хэсгийг брэндийн загварт нийцүүлэн шинэчилсэн ---
  if (!property) {
    return (
      <>
        <Navbar />
        {/* --- Дэвсгэрийг zolGreen/5 болгосон --- */}
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center bg-zolGreen/5 p-4">
          <div className="bg-white p-10 rounded-xl shadow-2xl border border-gray-100">
            {/* --- Icon-ыг шинэчилсэн --- */}
            <div className="flex justify-center items-center mx-auto h-20 w-20 rounded-full bg-red-100">
              <SearchX className="h-10 w-10 text-red-500" />
            </div>
            {/* --- Гарчгийг Playfair фонттой болгосон --- */}
            <h1 className="font-playfair mt-6 text-3xl font-bold text-zolGreen">Үл хөдлөх хөрөнгө олдсонгүй</h1>
            <p className="mt-3 text-zolDark/80 max-w-md">
              Таны хайж буй үл хөдлөх хөрөнгө байхгүй эсвэл зах зээлээс хасагдсан байна.
            </p>
            <div className="mt-8">
              {/* --- Товчлуурыг zolGold болгосон --- */}
              <Link
                href="/"
                className="inline-block bg-zolGold text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
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

  const relatedProperties = allProperties
    .filter(p => p._id.toString() !== property._id.toString())
    .slice(0, 4);

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