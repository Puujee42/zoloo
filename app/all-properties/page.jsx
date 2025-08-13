'use client';

import React, { useState, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from '@/components/PropertyCard';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import FilterBar from '@/components/FilterBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer'; // Footer-г нэмэх
import { SearchX } from 'lucide-react'; // "Олдсонгүй" хэсэгт зориулсан icon

export default function PropertyListPage() {
    const { properties, isLoading } = useAppContext();
    const [filters, setFilters] = useState(null);

    const filteredProperties = useMemo(() => {
        if (!properties) {
            return []; // Эхний ачаалалтын үед properties null байж болох тул хоосон массив буцаана
        }
        if (!filters) {
            return properties; // Шүүлтүүр хийгдээгүй бол бүгдийг буцаана
        }

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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <PropertyCardSkeleton key={index} />
                    ))}
                </div>
            );
        }

        if (filteredProperties.length > 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProperties.map(property => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            );
        }

        // --- "Олдсонгүй" мэдээллийг шинэчилсэн ---
        return (
            <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center">
                <SearchX size={48} className="text-gray-400 mb-4" />
                <h2 className="text-2xl font-semibold text-zolDark">Үл хөдлөх хөрөнгө олдсонгүй</h2>
                <p className="mt-2 text-zolDark/70">Илүү их үр дүн харахын тулд шүүлтүүрээ өөрчилж үзнэ үү.</p>
            </div>
        );
    };

    return (
        // --- 1. Дэвсгэрийг zolGreen/5 болгосон ---
        <div className="bg-zolGreen/5 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* --- 2. Гарчгийг Playfair фонттой болгосон --- */}
                <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-2 text-zolGreen">
                    Бүх Зар
                </h1>
                <p className="text-zolDark/70 mb-8">
                    Төгс гэрээ олохын тулд доорх шүүлтүүрүүдийг ашиглана уу.
                </p>

                <FilterBar onFilterChange={handleFilterChange} />
                
                <div className="mt-12">
                    {renderContent()}
                </div>
            </div>
            <Footer />
        </div>
    );
}