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

  // useMemo is used to efficiently filter favorite properties.
  // It only re-calculates when 'properties' or 'favorites' change.
  const favoriteProperties = useMemo(() => {
    if (isLoading || !properties) return [];
    return properties.filter(property => favorites.includes(property._id));
  }, [properties, favorites, isLoading]);

  // Handles removing an item from favorites, preventing the card's link from firing.
  const handleRemoveFavorite = (e, propertyId) => {
    e.stopPropagation(); // Prevents the click from navigating to the property page.
    e.preventDefault();  // Prevents any default link behavior.
    toggleFavorite(propertyId);
  };

  const renderContent = () => {
    // --- Loading State: Shows skeleton cards for better UX ---
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <PropertyCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    // --- Populated State: Displays the grid of favorite properties ---
    if (favoriteProperties.length > 0) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {favoriteProperties.map(property => (
            <div key={property._id} className="relative group">
              <button
                onClick={(e) => handleRemoveFavorite(e, property._id)}
                className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full text-gray-700 hover:bg-red-500 hover:text-white transition-all duration-300"
                title="Дуртай зүйлсээс устгах"
              >
                <X size={16} />
              </button>
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      );
    }

    // --- Empty State: A welcoming message when no favorites are saved ---
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg bg-white">
        <Heart size={48} className="mx-auto text-green-200" strokeWidth={1.5} />
        <h2 className="mt-4 text-xl font-semibold text-green-900">Таны дуртай зүйлсийн жагсаалт хоосон байна</h2>
        <p className="mt-2 text-gray-600">Хайгуул хийж эхлээд дуртай үл хөдлөх хөрөнгөө энд харахын тулд хадгална уу.</p>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
          {/* --- Page Header --- */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10">
            <div>
              <h1 className="text-3xl font-bold text-green-900">Миний хадгалсан үл хөдлөх хөрөнгө</h1>
              <p className="mt-1 text-gray-600">
                {!isLoading && (favoriteProperties.length > 0
                  ? `Танд ${favoriteProperties.length} хадгалсан үл хөдлөх хөрөнгө байна.`
                  : "Та одоогоор ямар ч үл хөдлөх хөрөнгө хадгалаагүй байна.")}
              </p>
            </div>
            <button 
              onClick={() => router.push('/all-properties')} 
              className="mt-4 sm:mt-0 bg-amber-500 text-green-900 font-bold py-2.5 px-6 rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow"
            >
              Бүх үл хөдлөх хөрөнгийг харах
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