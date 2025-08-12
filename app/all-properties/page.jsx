'use client'
import React, { useState, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from '@/components/PropertyCard';
import PropertyCardSkeleton from '@/components/PropertyCardSkeleton';
import FilterBar from '@/components/FilterBar';
import Navbar from '@/components/Navbar';

export default function PropertyListPage() {
    // Destructure properties and loading state from the global app context.
    const { properties, isLoading } = useAppContext();

    // State to hold the current filter settings from the FilterBar component.
    const [filters, setFilters] = useState(null);

    // useMemo re-calculates the filtered properties only when dependencies change.
    const filteredProperties = useMemo(() => {
        if (!properties || !filters) {
            return properties;
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
    
    // Renders the appropriate content based on the loading and filtered data state.
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <PropertyCardSkeleton key={index} />
                    ))}
                </div>
            );
        }

        if (filteredProperties.length > 0) {
            return (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {filteredProperties.map(property => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            );
        }

        // Message shown when no properties match the selected filters.
        return (
            <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900">Үл хөдлөх хөрөнгө олдсонгүй</h2>
                <p className="mt-2 text-gray-600">Илүү их үр дүн олохын тулд шүүлтүүрээ тохируулж үзнэ үү.</p>
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-2 text-green-900">Бүх үл хөдлөх хөрөнгө</h1>
                <p className="text-gray-600 mb-8">Төгс гэрээ олохын тулд доорх шүүлтүүрүүдийг ашиглана уу.</p>

                {/* --- The FilterBar component with the onFilterChange handler --- */}
                <FilterBar onFilterChange={handleFilterChange} />
                
                <div className="mt-10">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}