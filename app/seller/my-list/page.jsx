// Recommended file path: /app/seller/my-listings/page.jsx (or similar)

'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { Pencil, Trash2 } from "lucide-react"; // Modern icons for actions

const MyListingsPage = () => {
    const router = useRouter();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSellerProperties = async () => {
            setIsLoading(true);
            try {
                // Use the new, correct API route
                const response = await fetch('/api/property/seller-list');
                const data = await response.json();

                if (data.success) {
                    setProperties(data.properties);
                } else {
                    toast.error(data.message || "Failed to fetch listings.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching your listings.");
                console.error("Fetch listings error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSellerProperties();
    }, []); // Runs once on component mount

    const getStatusBadge = (status) => {
        const baseClasses = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";
        switch (status) {
            case 'For Sale': return <span className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20`}>{status}</span>;
            case 'For Rent': return <span className={`${baseClasses} bg-blue-50 text-blue-700 ring-blue-600/20`}>{status}</span>;
            case 'Sold': return <span className={`${baseClasses} bg-gray-50 text-gray-600 ring-gray-500/10`}>{status}</span>;
            default: return <span className={`${baseClasses} bg-yellow-50 text-yellow-800 ring-yellow-600/20`}>{status}</span>;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Properties</h1>
                <button
                    onClick={() => router.push('/list-property')}
                    className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    + List New Property
                </button>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900">You haven't listed any properties yet.</h2>
                    <p className="mt-2 text-gray-600">Get started by listing your first property today.</p>
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
                                                <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={property.title}>{property.title}</div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs" title={property.address}>{property.address}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">${property.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(property.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(property.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-4" title="Edit Property"><Pencil size={18} /></button>
                                        <button className="text-red-600 hover:text-red-900" title="Delete Property"><Trash2 size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyListingsPage;