// Recommended file path: /app/seller-dashboard/page.jsx
'use client';

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading"; // Assuming you have a loading spinner component
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react"; // Icons for action buttons

const SellerDashboard = () => {
    const router = useRouter();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSellerProperties = async () => {
            try {
                // Fetch properties specifically for the logged-in seller
                const response = await fetch('/api/property/seller-list');
                const data = await response.json();

                if (data.success) {
                    setProperties(data.properties);
                } else {
                    console.error("Failed to fetch properties:", data.message);
                }
            } catch (error) {
                console.error("An error occurred while fetching properties:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSellerProperties();
    }, []); // Empty dependency array ensures this runs once on mount

    // Helper to get a styled badge for the status
    const getStatusBadge = (status) => {
        switch (status) {
            case 'For Sale':
                return <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{status}</span>;
            case 'For Rent':
                return <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">{status}</span>;
            case 'Sold':
                return <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{status}</span>;
            default:
                return <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">{status}</span>;
        }
    }

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">My Listings</h1>
                    <button 
                        onClick={() => router.push('/list-property')}
                        className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + List New Property
                    </button>
                </div>

                {isLoading ? (
                    <Loading />
                ) : properties.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed rounded-lg">
                        <h2 className="text-xl font-semibold text-gray-900">You haven't listed any properties yet.</h2>
                        <p className="mt-2 text-gray-600">Get started by listing your first property today.</p>
                        <button 
                            onClick={() => router.push('/list-property')}
                            className="mt-6 bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            List a Property
                        </button>
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow-md rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 bg-white">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Listed</th>
                                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {properties.map((property) => (
                                    <tr key={property._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <Image className="h-10 w-10 rounded-md object-cover" src={property.images[0]} alt={property.title} width={40} height={40} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900 truncate max-w-xs">{property.title}</div>
                                                    <div className="text-sm text-gray-500 truncate max-w-xs">{property.address}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">${property.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStatusBadge(property.status)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(property.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-blue-600 hover:text-blue-900 mr-4"><Pencil size={18} /></button>
                                            <button className="text-red-600 hover:text-red-900"><Trash2 size={18} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default SellerDashboard;