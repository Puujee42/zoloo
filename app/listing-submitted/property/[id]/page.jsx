// Recommended file path: /app/property/[id]/page.jsx (or a client component it uses)
'use client'

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import PropertyCard from "@/components/PropertyCard"; // The reusable card
import { BedDouble, Bath, LandPlot, Heart, Phone } from "lucide-react"; // Modern icons

// The component should receive the specific property and related ones as props
// This data would be fetched on the server in a real App Router setup
export default function PropertyDetailsPage({ property, relatedProperties }) {

    const { favorites, toggleFavorite } = useAppContext();
    const [isFavorited, setIsFavorited] = useState(false);
    
    // Fallback while data is being fetched by the server component parent
    if (!property) {
        return <Loading />;
    }

    // Set the initial image for the main gallery view
    const [selectedImage, setSelectedImage] = useState(property.images[0]);

    // Check if the current property is in the favorites list
    useEffect(() => {
        setIsFavorited(favorites.includes(property._id));
    }, [favorites, property._id]);

    const handleFavoriteClick = () => {
        toggleFavorite(property._id);
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* --- Main Property Details Grid --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* --- Image Gallery (Left Side) --- */}
                    <div className="lg:col-span-2">
                        <div className="aspect-w-16 aspect-h-10 w-full overflow-hidden rounded-lg border border-gray-200 mb-4">
                            <Image
                                src={selectedImage}
                                alt={property.title}
                                width={1280}
                                height={800}
                                className="h-full w-full object-cover"
                                priority
                            />
                        </div>
                        <div className="grid grid-cols-5 gap-2">
                            {property.images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(image)}
                                    className={`aspect-square w-full rounded-md overflow-hidden border-2 transition-all ${selectedImage === image ? 'border-blue-600 scale-110' : 'border-transparent hover:border-blue-400'}`}
                                >
                                    <Image
                                        src={image}
                                        alt={`${property.title} thumbnail ${index + 1}`}
                                        width={200}
                                        height={200}
                                        className="h-full w-full object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* --- Property Information (Right Side) --- */}
                    <div className="space-y-6">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">{property.title}</h1>
                        <p className="text-lg text-gray-600">{property.address}</p>
                        <p className="text-5xl font-bold text-blue-700">${property.price.toLocaleString()}</p>
                        
                        {/* Key Specs */}
                        <div className="grid grid-cols-3 gap-4 text-center border-t border-b py-4">
                            <div className="flex flex-col items-center"><BedDouble className="text-gray-500"/> <span className="mt-1 font-medium">{property.bedrooms} Beds</span></div>
                            <div className="flex flex-col items-center"><Bath className="text-gray-500"/> <span className="mt-1 font-medium">{property.bathrooms} Baths</span></div>
                            <div className="flex flex-col items-center"><LandPlot className="text-gray-500"/> <span className="mt-1 font-medium">{property.area.toLocaleString()} sqft</span></div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="font-semibold text-gray-900 mb-2">About this property</h3>
                            <p className="text-gray-700 leading-relaxed">{property.description}</p>
                        </div>

                         {/* Features */}
                         {property.features && property.features.length > 0 && (
                            <div className="border-t pt-6">
                                <h3 className="font-semibold text-gray-900 mb-3">Features & Amenities</h3>
                                <div className="flex flex-wrap gap-2">
                                {property.features.map(feature => (
                                    <span key={feature} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1.5 rounded-full">{feature}</span>
                                ))}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex items-center gap-4 pt-4">
                            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                                Schedule a Tour
                            </button>
                            <button onClick={handleFavoriteClick} className={`p-3 rounded-lg border-2 transition-colors ${isFavorited ? 'bg-red-100 border-red-500 text-red-500' : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-red-400'}`}>
                                <Heart fill={isFavorited ? 'currentColor' : 'none'} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- Similar Properties Section --- */}
                <div className="mt-24 border-t pt-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Similar Properties You Might Like</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Use the reusable PropertyCard component */}
                        {relatedProperties && relatedProperties.map(prop => (
                            <PropertyCard key={prop._id} property={prop} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

// Note: This component now expects to receive `property` and `relatedProperties`
// as props from a server component that handles the data fetching.
// e.g., /app/property/[id]/page.jsx would fetch the data and pass it to this client component.