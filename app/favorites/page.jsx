// /app/favorites/page.jsx
'use client'

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import PropertyCardSkeleton from "@/components/PropertyCardSkeleton"; // Import the skeleton
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Heart, X } from "lucide-react";

const FavoritesPage = () => {
  const router = useRouter();
  const { properties, favorites, toggleFavorite, isLoading } = useAppContext();

  // Filter the main properties list to get only the favorited ones
  const favoriteProperties = !isLoading ? properties.filter(property => favorites.includes(property._id)) : [];

  const handleRemoveFavorite = (e, propertyId) => {
    e.stopPropagation(); // Prevent the card's own click event
    toggleFavorite(propertyId);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[60vh]">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Saved Properties</h1>
            <p className="mt-1 text-gray-600">
              {!isLoading && (favoriteProperties.length > 0
                ? `You have ${favoriteProperties.length} saved properties.`
                : "You haven't saved any properties yet.")}
            </p>
          </div>
          <button 
            onClick={() => router.push('/all-properties')} 
            className="mt-4 sm:mt-0 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Properties
          </button>
        </div>

        {/* --- Grid for Saved Properties --- */}
        {isLoading ? (
            // --- IMPROVED LOADING STATE ---
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {/* Show a few skeletons to indicate loading */}
              {Array.from({ length: 4 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
        ) : favoriteProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {favoriteProperties.map(property => (
              <div key={property._id} className="relative group">
                <button
                  onClick={(e) => handleRemoveFavorite(e, property._id)}
                  className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-lg text-gray-700 hover:bg-red-500 hover:text-white transition-all"
                  title="Remove from favorites"
                >
                  <X size={16} />
                </button>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          // --- Empty State ---
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <Heart size={48} className="mx-auto text-gray-400" />
            <h2 className="mt-4 text-xl font-semibold text-gray-900">Your Favorites List is Empty</h2>
            <p className="mt-2 text-gray-600">Start exploring and save properties you love to see them here.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default FavoritesPage;