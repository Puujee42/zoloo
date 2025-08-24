// /app/favorites/page.jsx
'use client'

import React, { useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Heart, X } from "lucide-react";

const FavoritesPage = () => {
  const router = useRouter();
  const { properties, favorites, toggleFavorite, isLoading } = useAppContext();

  const favoriteProperties = useMemo(() => {
    if (isLoading || !properties) return [];
    return properties.filter(property => favorites.includes(property._id));
  }, [properties, favorites, isLoading]);

  const handleRemoveFavorite = (e, propertyId) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(propertyId);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (favoriteProperties.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteProperties.map(property => (
            <div key={property._id} className="relative group">
              <button
                onClick={(e) => handleRemoveFavorite(e, property._id)}
                className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-md"
                title="Хадгалснаас устгах"
              >
                <X size={16} />
              </button>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      );
    }

    // --- "Хоосон байна" мэдээллийг шинэчилсэн ---
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center">
        <Heart size={48} className="mx-auto text-zolGold/50" strokeWidth={1.5} />
        <h2 className="mt-4 text-2xl font-semibold text-zolDark">Таны хадгалсан зарууд хоосон байна</h2>
        <p className="mt-2 text-zolDark/70">Дуртай үл хөдлөх хөрөнгөө энд харахын тулд хайгуул хийж, хадгална уу.</p>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      {/* --- 1. Дэвсгэрийг zolGreen/5 болгосон --- */}
      <div className="bg-zolGreen/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
            <div>
              {/* --- 2. Гарчгийг Playfair фонттой болгосон --- */}
              <h1 className="font-playfair text-4xl md:text-5xl font-bold text-zolGreen">Хадгалсан зарууд</h1>
              <p className="mt-1 text-zolDark/70">
                {!isLoading && (favoriteProperties.length > 0
                  ? `Танд ${favoriteProperties.length} хадгалсан зар байна.`
                  : "Та одоогоор ямар ч зар хадгалаагүй байна.")}
              </p>
            </div>
            {/* --- 3. Товчлуурыг zolGold болгосон --- */}
            <button 
              onClick={() => router.push('/all-properties')} 
              className="mt-4 sm:mt-0 bg-zolGold text-white font-semibold py-2.5 px-6 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
            >
              Бүх зарыг харах
            </button>
          </div>

          {renderContent()}

        </div>
      </div>
      <Footer />
    </>
  );
};

export default FavoritesPage;