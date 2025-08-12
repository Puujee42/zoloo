// /app/property/[id]/page.jsx (or the client component it uses)
'use client'

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import PropertyCard from "@/components/PropertyCard"; // Reusable card
import { BedDouble, Bath, LandPlot, Heart, Phone } from "lucide-react"; // Modern icons

// A small sub-component for displaying key stats to keep the main return clean
const StatItem = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-2 text-center">
        <div className="text-green-700">{icon}</div>
        <span className="font-medium text-gray-800">{label}</span>
    </div>
);

export default function PropertyDetailsPage({ property, relatedProperties }) {
    const { favorites, toggleFavorite } = useAppContext();
    const [isFavorited, setIsFavorited] = useState(false);

    // This is a fallback while data is fetched by the parent server component
    if (!property) {
        return <Loading />;
    }

    // State for the main image gallery display
    const [selectedImage, setSelectedImage] = useState(property.images[0]);

    // Checks if the current property is in the favorites list
    useEffect(() => {
        setIsFavorited(favorites.includes(property._id));
    }, [favorites, property._id]);

    const handleFavoriteClick = () => {
        toggleFavorite(property._id);
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    {/* --- Main Grid for Property Details --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* --- Image Gallery (Left Side) --- */}
                        <div className="lg:col-span-2">
                            <div className="aspect-w-16 aspect-h-10 w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 mb-4">
                                <Image
                                    src={selectedImage}
                                    alt={property.title}
                                    width={1280}
                                    height={800}
                                    className="h-full w-full object-cover"
                                    priority
                                />
                            </div>
                            <div className="grid grid-cols-5 gap-3">
                                {property.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        className={`aspect-square w-full rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === image ? 'border-amber-500 scale-105 shadow-md' : 'border-transparent hover:border-amber-400'}`}
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

                        {/* --- Property Info (Right Side) --- */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">
                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-green-900">{property.title}</h1>
                            <p className="text-lg text-gray-600">{property.address}</p>
                            <p className="text-5xl font-extrabold text-green-900">${property.price.toLocaleString()}</p>
                            
                            {/* Key Stats using the StatItem component */}
                            <div className="grid grid-cols-3 gap-4 text-center border-t border-b border-gray-200 py-5">
                                <StatItem icon={<BedDouble size={28}/>} label={`${property.bedrooms} Ор`} />
                                <StatItem icon={<Bath size={28}/>} label={`${property.bathrooms} Угаалгын өрөө`} />
                                <StatItem icon={<LandPlot size={28}/>} label={`${property.area.toLocaleString()} м.кв`} />
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className="font-bold text-lg text-green-900 mb-2">Энэ үл хөдлөх хөрөнгийн тухай</h3>
                                <p className="text-gray-700 leading-relaxed">{property.description}</p>
                            </div>

                            {/* Features */}
                            {property.features && property.features.length > 0 && (
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-bold text-lg text-green-900 mb-3">Онцлог ба тав тухтай байдал</h3>
                                    <div className="flex flex-wrap gap-3">
                                    {property.features.map(feature => (
                                        <span key={feature} className="bg-green-100 text-green-800 text-sm font-semibold px-4 py-2 rounded-full">{feature}</span>
                                    ))}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex items-center gap-4 pt-4">
                                <button className="flex-1 inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-green-900 font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105">
                                    <Phone size={18} />
                                    Танилцах цаг товлох
                                </button>
                                <button 
                                    onClick={handleFavoriteClick} 
                                    aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                                    className={`p-3 rounded-lg border-2 transition-colors ${isFavorited ? 'bg-red-100 border-red-500 text-red-500' : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-pink-400 hover:text-pink-500'}`}
                                >
                                    <Heart fill={isFavorited ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- Related Properties Section --- */}
                    <div className="mt-24 border-t border-gray-200 pt-16">
                        <h2 className="text-3xl font-bold text-green-900 mb-8">Танд таалагдаж болох төстэй үл хөдлөх хөрөнгө</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {relatedProperties && relatedProperties.map(prop => (
                                <PropertyCard key={prop._id} property={prop} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};