// /app/search/page.jsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import { SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// A separate component to handle the logic, wrapped in Suspense
const SearchResults = () => {
    const searchParams = useSearchParams();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const query = searchParams.toString();

    useEffect(() => {
        const fetchProperties = async () => {
            setIsLoading(true);
            try {
                const res = await fetch(`/api/search?${query}`);
                const data = await res.json();
                if (data.success) {
                    setProperties(data.data);
                } else {
                    setProperties([]);
                }
            } catch (error) {
                console.error("Failed to fetch search results:", error);
                setProperties([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProperties();
    }, [query]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* --- 1. Animated heading --- */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-center mb-16"
            >
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-zolGreen">
                    Хайлтын үр дүн
                </h1>
                <p className="mt-2 text-zolDark/70">
                    {isLoading ? "Үр дүнг хайж байна..." : `${properties.length} үл хөдлөх хөрөнгө олдлоо.`}
                </p>
            </motion.div>

            {/* --- 2. Animate content --- */}
            {isLoading ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {Array.from({ length: 8 }).map((_, index) => <PropertyCardSkeleton key={index} />)}
                </motion.div>
            ) : properties.length > 0 ? (
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                >
                    {properties.map((property) => (
                        <motion.div
                            key={property._id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 }
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <PropertyCard property={property} />
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <AnimatePresence mode="wait">
                    <motion.div
                        key="no-results"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center"
                    >
                        <SearchX size={48} className="text-zolGold/50 mb-4" strokeWidth={1.5}/>
                        <h2 className="text-2xl font-semibold text-zolDark">Илэрц олдсонгүй</h2>
                        <p className="mt-2 text-zolDark/70">
                            Таны хайлтад тохирох үл хөдлөх хөрөнгө олдсонгүй. Хайлтын үгээ өөрчлөөд дахин оролдоно уу.
                        </p>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

// Fallback component for Suspense
const SearchLoading = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-16">
                <div className="h-12 bg-gray-200 rounded-md w-1/2 mx-auto animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded-md w-1/4 mx-auto mt-4 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {Array.from({ length: 8 }).map((_, index) => <PropertyCardSkeleton key={index} />)}
            </div>
        </div>
    );
};

const SearchPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-zolGreen/5 min-h-screen">
                <Suspense fallback={<SearchLoading />}>
                    <SearchResults />
                </Suspense>
            </main>
            <Footer />
        </>
    );
};

export default SearchPage;
