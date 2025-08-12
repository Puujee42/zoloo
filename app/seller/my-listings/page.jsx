// /app/seller/my-listings/page.jsx

'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { Pencil, Trash2, ListX } from "lucide-react"; // Added icon for empty state

const MyListingsPage = () => {
    const router = useRouter();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSellerProperties = async () => {
            setIsLoading(true);
            try {
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
    }, []);

    const getStatusBadge = (status) => {
        const baseClasses = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";
        switch (status) {
            case 'For Sale': 
                return <span className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20`}>{status}</span>;
            // Changed blue to amber
            case 'For Rent': 
                return <span className={`${baseClasses} bg-amber-50 text-amber-800 ring-amber-600/20`}>{status}</span>;
            case 'Sold': 
                return <span className={`${baseClasses} bg-gray-100 text-gray-600 ring-gray-500/20`}>{status}</span>;
            default: 
                return <span className={`${baseClasses} bg-yellow-50 text-yellow-800 ring-yellow-600/20`}>{status}</span>;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                {/* Themed heading */}
                <h1 className="text-3xl font-bold text-green-900">Миний зарууд</h1>
                {/* Themed button */}
                <button
                    onClick={() => router.push('/seller/list-property')}
                    className="bg-amber-500 text-green-900 font-bold py-2 px-5 rounded-lg hover:bg-amber-600 transition-colors shadow-sm"
                >
                    + Шинэ зар нэмэх
                </button>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-lg bg-white">
                    <ListX size={48} className="mx-auto text-green-300" strokeWidth={1.5} />
                    {/* Themed empty state text */}
                    <h2 className="mt-4 text-xl font-semibold text-green-900">Та одоогоор ямар ч зар оруулаагүй байна.</h2>
                    <p className="mt-2 text-gray-600">Өнөөдөр анхны зараа оруулж эхэлнэ үү.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Үл хөдлөх хөрөнгө</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Үнэ</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Төлөв</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Оруулсан огноо</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Үйлдэл</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {properties.map((property) => (
                                <tr key={property._id} className="hover:bg-gray-50/70 transition-colors">
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
                                    {/* Themed price text */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-green-900 font-bold">₮{property.price.toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(property.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(property.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {/* Themed action buttons */}
                                        <button className="text-amber-600 hover:text-amber-800 mr-4 transition-colors" title="Засах"><Pencil size={18} /></button>
                                        <button className="text-red-600 hover:text-red-800 transition-colors" title="Устгах"><Trash2 size={18} /></button>
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