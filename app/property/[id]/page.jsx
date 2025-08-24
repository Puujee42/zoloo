// /app/property/[id]/page.jsx
import React from 'react';
import Link from 'next/link';
import { getPropertyById, getProperties } from '@/lib/data';
import PropertyDetailsClient from './PropertyDetailsClient';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchX } from 'lucide-react';


export default async function PropertyPage({ params: { id } }) {
  const [property, allProperties] = await Promise.all([
    getPropertyById(id),
    getProperties({ limit: 4 })
  ]);

  // --- "Not Found" fallback ---
  if (!property) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[75vh] bg-gradient-to-br from-zolGreen/10 via-white to-zolGold/5 p-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-xl border border-gray-100 max-w-lg text-center"
          >
            {/* Icon */}
            <div className="flex justify-center items-center mx-auto h-20 w-20 rounded-full bg-red-100 shadow-inner">
              <SearchX className="h-10 w-10 text-red-500" />
            </div>

            {/* Title */}
            <h1 className="font-playfair mt-6 text-3xl md:text-4xl font-bold text-zolGreen">
              Үл хөдлөх хөрөнгө олдсонгүй
            </h1>

            {/* Subtitle */}
            <p className="mt-3 text-zolDark/70 leading-relaxed">
              Таны хайж буй үл хөдлөх хөрөнгө одоогоор байхгүй эсвэл зах зээлээс хасагдсан байна. 
              Өөр боломжуудыг үзнэ үү.
            </p>

            {/* CTA Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-8">
              <Link
                href="/all-properties"
                className="inline-block bg-zolGold text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-zolGold/90 transition-all"
              >
                Бүх үл хөдлөх хөрөнгийг үзэх
              </Link>
            </motion.div>
          </motion.div>
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
