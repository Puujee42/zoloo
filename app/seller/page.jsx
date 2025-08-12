// Recommended file path: /app/list-property/page.jsx

'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from "react-hot-toast";
import { UploadCloud, X } from 'lucide-react'; // Modern icons

// The entire page, including auth protection and the form.
export default function ListPropertyPage() {
    const { isSeller, isLoading: isAuthLoading } = useAppContext();
    const router = useRouter();

    // --- State for the form itself ---
    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        address: '',
        type: 'House',
        status: 'For Sale',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        features: '',
    });
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // --- Authorization Check ---
    useEffect(() => {
        if (!isAuthLoading && !isSeller) {
            toast.error("Access Denied: You must be a seller to list a property.");
            router.push('/');
        }
    }, [isAuthLoading, isSeller, router]);

    // --- Form Handlers ---
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 10) {
            toast.error("You can upload a maximum of 10 images.");
            return;
        }
        setImages(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error("Please upload at least one image.");
            return;
        }
        setIsSubmitting(true);

        const formData = new FormData();
        Object.entries(propertyData).forEach(([key, value]) => {
            formData.append(key, value);
        });
        images.forEach(image => {
            formData.append('images', image);
        });

        try {
            // Note: The Clerk 'Authorization' header is typically handled automatically
            // by the middleware or a wrapper, so you might not need to add it manually.
            const response = await fetch('/api/property', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                toast.success('Property Listed Successfully!');
                router.push('/seller-dashboard'); // Redirect to dashboard
            } else {
                toast.error(result.message || 'Failed to list property.');
            }
        } catch (error) {
            toast.error('An unexpected error occurred.');
            console.error("Submission failed:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Render Logic ---
    if (isAuthLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Verifying seller status...</p>
            </div>
        );
    }
    
    // Render the form if the user is a seller
    return isSeller ? (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
                <div className="space-y-4 mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
                    <p className="text-gray-600">Fill out the details below to put your property on the market.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Property Details */}
                    <input name="title" value={propertyData.title} onChange={handleChange} placeholder="Property Title (e.g., Modern Downtown Condo)" className="input-style md:col-span-2" required />
                    <input name="address" value={propertyData.address} onChange={handleChange} placeholder="Full Property Address" className="input-style md:col-span-2" required />
                    <textarea name="description" value={propertyData.description} onChange={handleChange} placeholder="Detailed Property Description" className="input-style md:col-span-2" rows={5} required />

                    {/* Pricing and Specs */}
                    <input name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder="Price (USD)" className="input-style" required />
                    <input name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="Area (sqft)" className="input-style" required />
                    <input name="bedrooms" type="number" value={propertyData.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="input-style" required />
                    <input name="bathrooms" type="number" value={propertyData.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="input-style" required />
                    
                    {/* Category Dropdowns */}
                    <select name="type" value={propertyData.type} onChange={handleChange} className="input-style" required>
                        <option>House</option><option>Apartment</option><option>Condo</option><option>Villa</option><option>Land</option><option>Townhouse</option>
                    </select>
                    <select name="status" value={propertyData.status} onChange={handleChange} className="input-style" required>
                        <option>For Sale</option><option>For Rent</option>
                    </select>
                    
                    {/* Features */}
                    <input name="features" value={propertyData.features} onChange={handleChange} placeholder="Features (e.g., Pool, Garage, Fireplace)" className="input-style md:col-span-2" />

                    {/* Image Uploader */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Property Images (up to 10)</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <UploadCloud className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none hover:text-blue-500">
                                        <span>Upload files</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Image Previews */}
                    {images.length > 0 && (
                        <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                            {images.map((file, index) => (
                                <div key={index} className="relative group">
                                    <img src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 rounded-md object-cover" />
                                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <button type="submit" disabled={isSubmitting} className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-400">
                    {isSubmitting ? "Submitting..." : "List My Property"}
                </button>
            </form>

            <style jsx>{`
                .input-style {
                    @apply block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6 transition;
                }
            `}</style>
        </div>
    ) : null; // Render nothing while redirecting
}