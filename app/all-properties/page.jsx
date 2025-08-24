'use client';

import React, { useState, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from '@/components/PropertyCard';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import FilterBar from '@/components/FilterBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchX } from 'lucide-react';
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function PropertyListPage() {
  const { properties, isLoading } = useAppContext();
  const [filters, setFilters] = useState(null);

  const filteredProperties = useMemo(() => {
    if (!properties) return [];
    if (!filters) return properties;

    return properties.filter(property => {
      const { status, minPrice, maxPrice, bedrooms, bathrooms } = filters;

      const statusMatch = status === 'all' || property.status === status;
      const minPriceMatch = !minPrice || property.price >= parseInt(minPrice, 10);
      const maxPriceMatch = !maxPrice || property.price <= parseInt(maxPrice, 10);
      const bedsMatch = bedrooms === 'any' || property.bedrooms >= parseInt(bedrooms, 10);
      const bathsMatch = bathrooms === 'any' || property.bathrooms >= parseInt(bathrooms, 10);

      return statusMatch && minPriceMatch && maxPriceMatch && bedsMatch && bathsMatch;
    });
  }, [properties, filters]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <motion.div key={index} variants={itemVariants}>
              <PropertyCardSkeleton />
            </motion.div>
          ))}
        </motion.div>
      );
    }

    if (filteredProperties.length > 0) {
      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {filteredProperties.map((property, i) => (
            <motion.div
              key={property._id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 250 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      );
    }

    // Empty state animation
    return (
      <motion.div
        key="empty"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center shadow-sm"
      >
        <SearchX size={48} className="text-gray-400 mb-4 animate-pulse" />
        <h2 className="text-2xl font-semibold text-zolDark">Үл хөдлөх хөрөнгө олдсонгүй</h2>
        <p className="mt-2 text-zolDark/70">Илүү их үр дүн харахын тулд шүүлтүүрээ өөрчилж үзнэ үү.</p>
      </motion.div>
    );
  };

  return (
    <div className="bg-zolGreen/5 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title + Subtitle */}
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="font-playfair text-4xl md:text-5xl font-bold mb-2 text-zolGreen"
        >
          Бүх Зар
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-zolDark/70 mb-8"
        >
          Төгс гэрээ олохын тулд доорх шүүлтүүрүүдийг ашиглана уу.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <FilterBar onFilterChange={handleFilterChange} />
        </motion.div>

        <div className="mt-12">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
