'use client';

import {React, useState, useEffect } from 'react';
import PropertyCard from '@/components/PropertyCard';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import FilterBar from '@/components/FilterBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SearchX, RotateCcw, Loader } from 'lucide-react'; // Loader icon нэмсэн
import { motion, AnimatePresence } from "framer-motion";

// Animation Variants (centralized)
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, ease: "easeOut" }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

// 🔹 Loading Skeleton Grid
const LoadingGrid = () => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
  >
    {Array.from({ length: 8 }).map((_, index) => (
      <motion.div key={index} variants={itemVariants}>
        <PropertyCardSkeleton shimmer />
      </motion.div>
    ))}
  </motion.div>
);

// 🔹 Properties Grid
const PropertyGrid = ({ properties }) => (
  <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="show"
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
  >
    {properties.map((property) => (
      <motion.div
        key={property._id}
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 250 }}
      >
        <PropertyCard property={property} />
      </motion.div>
    ))}
  </motion.div>
);

// 🔹 Empty State
const EmptyState = ({ onReset }) => (
  <motion.div
    key="empty"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
    className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center shadow-sm"
    aria-live="polite"
  >
    <SearchX size={48} className="text-gray-400 mb-4" />
    <h2 className="text-2xl font-semibold text-zolDark">Үл хөдлөх хөрөнгө олдсонгүй</h2>
    <p className="mt-2 text-zolDark/70">Илүү их үр дүн харахын тулд шүүлтүүрээ өөрчилж үзнэ үү.</p>
    <button
      onClick={onReset}
      className="mt-6 flex items-center gap-2 bg-zolGreen text-white px-4 py-2 rounded-lg shadow hover:bg-zolGreen/90 transition"
    >
      <RotateCcw size={18} /> Шүүлтүүрийг арилгах
    </button>
  </motion.div>
);

export default function PropertyListPage() {
  // ШИНЭЧЛЭЛ: AppContext-ээс биш, хуудас өөрөө зарын мэдээллээ удирдана.
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({}); // Анхны утга нь хоосон объект

  // ШИНЭЧЛЭЛ: `useEffect` hook ашиглан шүүлтүүр өөрчлөгдөх бүрд API-гаас датаг дахин татдаг болсон.
  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams();

        // Утгатай шүүлтүүр бүрийг URL параметрт нэмнэ.
        // Хоосон, 'all', эсвэл false утгыг алгасна.
        Object.entries(filters).forEach(([key, value]) => {
          if (value && value !== 'all' && value !== false) {
            params.append(key, value);
          }
        });
        
        const queryString = params.toString();
        
        // **ЧУХАЛ**: Энэ API endpoint-г өөрийнхтэйгөө тааруулаарай.
        const response = await fetch(`/api/search?${queryString}`);
        const result = await response.json();

        if (result.success) {
          setProperties(result.data);
        } else {
          console.error("Failed to fetch properties:", result.error);
          setProperties([]); // Алдаа гарвал хоосон харуулах
        }
      } catch (error) {
        console.error("An error occurred while fetching properties:", error);
        setProperties([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [filters]); // `filters` state өөрчлөгдөх бүрд энэ useEffect дахин ажиллана

  // FilterBar-аас ирсэн шинэ шүүлтүүрийг хүлээн авч, state-г шинэчлэх функц
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // Шүүлтүүрийг арилгаж, бүх зарыг дахин татаж харуулна
  const handleResetFilters = () => setFilters({});

  return (
    <div className="bg-zolGreen/5 min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-zolGreen"
        >
          Бүх Зар
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg text-zolDark/70 mb-8"
        >
          Хүссэн гэрээ олохын тулд доорх шүүлтүүрийг ашиглана уу.
        </motion.p>

        {/* onFilterChange prop-г FilterBar-т дамжуулж байна */}
        <FilterBar onFilterChange={handleFilterChange} />

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingGrid />
            ) : properties.length > 0 ? (
              // ШИНЭЧЛЭЛ: `filteredProperties`-ийн оронд `properties` state-г шууд ашиглана
              <PropertyGrid properties={properties} />
            ) : (
              <EmptyState onReset={handleResetFilters} />
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}