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
                // Fetch data from our new API route
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
    }, [query]); // Re-run the effect whenever the query changes

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl md:text-4xl font-bold text-green-900">Хайлтын үр дүн</h1>
                <p className="mt-2 text-gray-600">
                    {isLoading ? "Үр дүнг хайж байна..." : `${properties.length} үл хөдлөх хөрөнгө олдлоо`}
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
                <div className="text-center py-20">
                    <SearchX className="mx-auto h-16 w-16 text-gray-400" />
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">Илэрц олдсонгүй</h2>
                    <p className="mt-2 text-gray-500">Таны хайлтад тохирох үл хөдлөх хөрөнгө олдсонгүй. Хайлтын үгээ өөрчлөөд дахин оролдоно уу.</p>
                </div>
            )}
        </div>
    );
}

// The main page component must use Suspense to handle useSearchParams
const SearchPage = () => {
    return (
        <>
            <Navbar />
            <main className="bg-gray-50 min-h-screen">
                <Suspense fallback={<div>Loading...</div>}>
                    <SearchResults />
                </Suspense>
            </main>
            <Footer />
        </>
    );
};

export default SearchPage;