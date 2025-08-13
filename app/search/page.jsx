// /app/search/page.jsx
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PropertyCard from '@/components/PropertyCard';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import { SearchX } from 'lucide-react';

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
            {/* --- 1. Гарчгийг Playfair фонттой болгосон --- */}
            <div className="text-center mb-16">
                <h1 className="font-playfair text-4xl md:text-5xl font-bold text-zolGreen">Хайлтын үр дүн</h1>
                <p className="mt-2 text-zolDark/70">
                    {isLoading ? "Үр дүнг хайж байна..." : `${properties.length} үл хөдлөх хөрөнгө олдлоо.`}
                </p>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {Array.from({ length: 8 }).map((_, index) => <PropertyCardSkeleton key={index} />)}
                </div>
            ) : properties.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {properties.map((property) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            ) : (
                // --- 2. "Илэрц олдсонгүй" хэсгийг шинэчилсэн ---
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center">
                    <SearchX size={48} className="text-zolGold/50 mb-4" strokeWidth={1.5}/>
                    <h2 className="text-2xl font-semibold text-zolDark">Илэрц олдсонгүй</h2>
                    <p className="mt-2 text-zolDark/70">Таны хайлтад тохирох үл хөдлөх хөрөнгө олдсонгүй. Хайлтын үгээ өөрчлөөд дахин оролдоно уу.</p>
                </div>
            )}
        </div>
    );
}

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
            {/* --- 3. Дэвсгэрийг zolGreen/5 болгосон --- */}
            <main className="bg-zolGreen/5 min-h-screen">
                {/* --- 4. Fallback-г гоёмсог болгосон --- */}
                <Suspense fallback={<SearchLoading />}>
                    <SearchResults />
                </Suspense>
            </main>
            <Footer />
        </>
    );
};

export default SearchPage;