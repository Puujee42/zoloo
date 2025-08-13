// /app/property/[id]/page.jsx (or the client component it uses)
'use client'

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import PropertyCard from "@/components/PropertyCard";
import { BedDouble, Bath, LandPlot, Heart, Phone } from "lucide-react";

// StatItem-ийг шинэчилсэн
const StatItem = ({ icon, label }) => (
    <div className="flex flex-col items-center gap-2 text-center p-2">
        <div className="text-zolGreen">{icon}</div>
        <span className="font-medium text-zolDark/90">{label}</span>
    </div>
);

export default function PropertyDetailsPage({ property, relatedProperties }) {
    const { favorites, toggleFavorite, openAppointmentModal } = useAppContext();
    const [isFavorited, setIsFavorited] = useState(false);

    if (!property) return <Loading />;

    const [selectedImage, setSelectedImage] = useState(property.images?.[0]);

    useEffect(() => {
        setIsFavorited(favorites.includes(property._id));
    }, [favorites, property._id]);

    const handleFavoriteClick = () => {
        toggleFavorite(property._id);
    };

    const handleBookTourClick = () => {
        openAppointmentModal(property);
    };

    return (
        <>
            <Navbar />
            {/* --- 1. Дэвсгэрийг zolGreen/5 болгосон --- */}
            <div className="bg-zolGreen/5">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        
                        {/* --- Зургийн Галерей --- */}
                        <div className="lg:col-span-2">
                            <div className="aspect-w-16 aspect-h-10 w-full overflow-hidden rounded-xl shadow-lg border border-gray-200 mb-4">
                                <Image
                                    src={selectedImage}
                                    alt={property.title}
                                    width={1280} height={800}
                                    className="h-full w-full object-cover"
                                    priority
                                />
                            </div>
                            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                                {property.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(image)}
                                        // --- 5. Идэвхтэй зургийн хүрээг zolGold болгосон ---
                                        className={`aspect-square w-full rounded-lg overflow-hidden border-2 transition-all duration-200 ${selectedImage === image ? 'border-zolGold scale-105 shadow-md' : 'border-transparent hover:border-zolGold/70'}`}
                                    >
                                        <Image src={image} alt={`${property.title} thumbnail ${index + 1}`} width={200} height={200} className="h-full w-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* --- 2. Мэдээллийн хэсгийг шинэчилсэн --- */}
                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 space-y-6">
                            <h1 className="font-playfair text-3xl md:text-4xl font-bold tracking-tight text-zolGreen">{property.title}</h1>
                            <p className="text-lg text-zolDark/80">{property.address}</p>
                            <p className="font-playfair text-5xl font-bold text-zolGreen">{property.price.toLocaleString()}₮</p>
                            
                            <div className="grid grid-cols-3 gap-4 text-center border-t border-b border-gray-100 py-5">
                                <StatItem icon={<BedDouble size={28}/>} label={`${property.bedrooms} Ор`} />
                                <StatItem icon={<Bath size={28}/>} label={`${property.bathrooms} Угаалгын`} />
                                <StatItem icon={<LandPlot size={28}/>} label={`${property.area.toLocaleString()} м²`} />
                            </div>

                            <div>
                                <h3 className="font-semibold text-lg text-zolDark mb-2">Энэ үл хөдлөх хөрөнгийн тухай</h3>
                                <p className="text-zolDark/90 leading-relaxed">{property.description}</p>
                            </div>

                            {property.features && property.features.length > 0 && (
                                <div className="border-t border-gray-100 pt-6">
                                    <h3 className="font-semibold text-lg text-zolDark mb-3">Онцлог ба давуу тал</h3>
                                    <div className="flex flex-wrap gap-3">
                                    {property.features.map(feature => (
                                        <span key={feature} className="bg-zolGreen/10 text-zolGreen text-sm font-medium px-4 py-2 rounded-full">{feature}</span>
                                    ))}
                                    </div>
                                </div>
                            )}

                            {/* --- 3. Товчлууруудыг шинэчилсэн --- */}
                            <div className="flex items-center gap-4 pt-4">
                                <button onClick={handleBookTourClick} className="flex-1 inline-flex items-center justify-center gap-3 bg-zolGold text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md">
                                    <Phone size={18} />
                                    Цаг товлох
                                </button>
                                <button 
                                    onClick={handleFavoriteClick} 
                                    aria-label={isFavorited ? "Хадгалснаас устгах" : "Хадгалах"}
                                    className={`p-3 rounded-lg border-2 transition-colors ${isFavorited ? 'bg-zolGold/10 border-zolGold text-zolGold' : 'bg-gray-100 border-gray-200 text-gray-600 hover:border-zolGold/70 hover:text-zolGold'}`}
                                >
                                    <Heart fill={isFavorited ? 'currentColor' : 'none'} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* --- 4. Төстэй заруудын гарчгийг шинэчилсэн --- */}
                    {relatedProperties && relatedProperties.length > 0 && (
                        <div className="mt-24 border-t border-gray-200 pt-16">
                            <h2 className="font-playfair text-3xl font-bold text-zolGreen mb-8">Танд таалагдаж болох зарууд</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {relatedProperties.map(prop => (
                                    <PropertyCard key={prop._id} property={prop} />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};