
'use client'

import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { useAppContext } from '@/context/AppContext';
import Link from 'next/link';

const MapViewPage = () => {
    const { properties, isLoading } = useAppContext();
    const [selectedProperty, setSelectedProperty] = useState(null);

    // --- ЧУХАЛ: Та ЗААВАЛ Google Maps API түлхүүр авах ёстой ---
    // Google Cloud Console руу орж, төсөл үүсгэж, Maps JavaScript API-г идэвхжүүлээд,
    // API түлхүүр үүсгэнэ үү. Үүнийгээ .env.local файлд хадгална уу.
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    });

    const containerStyle = {
        width: '100%',
        height: 'calc(100vh - 80px)' // Бүтэн дэлгэцийн өндрөөс навигацийн мөрийг хассан
    };

    const center = {
        lat: 40.7128, // Анхдагчаар Нью-Йорк хот
        lng: -74.0060
    };

    if (isLoading || !isLoaded) return <div>Газрын зураг ачааллаж байна...</div>;

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
        >
            {properties.map(property => (
                // Та ирээдүйд үл хөдлөх хөрөнгийн схемдээ lat/lng нэмнэ гэж тооцоолж байна.
                // Одоогийн байдлаар бид түр орлуулах координатуудыг ашиглах болно.
                <MarkerF
                    key={property._id}
                    position={{ lat: property.lat || 40.7128 + Math.random() * 0.1, lng: property.lng || -74.0060 + Math.random() * 0.1 }}
                    onClick={() => setSelectedProperty(property)}
                />
            ))}

            {selectedProperty && (
                <InfoWindowF
                    position={{ lat: selectedProperty.lat || 40.7128 + Math.random() * 0.1, lng: selectedProperty.lng || -74.0060 + Math.random() * 0.1 }}
                    onCloseClick={() => setSelectedProperty(null)}
                >
                    <div className="p-2 max-w-xs">
                        <img src={selectedProperty.images[0]} alt={selectedProperty.title} className="w-full h-24 object-cover rounded-md"/>
                        <h3 className="font-bold mt-2">{selectedProperty.title}</h3>
                        <p className="text-blue-600 font-semibold">${selectedProperty.price.toLocaleString()}</p>
                        <Link href={`/property/${selectedProperty._id}`} className="text-blue-600 hover:underline">Дэлгэрэнгүйг харах</Link>
                    </div>
                </InfoWindowF>
            )}
        </GoogleMap>
    );
};

export default MapViewPage;
