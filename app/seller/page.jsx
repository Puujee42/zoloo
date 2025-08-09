// FILE: /app/seller/page.jsx

'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { assets } from "@/assets/assets";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

// This is the Add Product form component, moved inside for simplicity
const AddProductForm = () => {
    const { getToken } = useAppContext();
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Model');
    const [price, setPrice] = useState('');
    const [offerPrice, setOfferPrice] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('price', price);
        formData.append('offerPrice', offerPrice);

        const validFiles = files.filter(file => file);
        if (validFiles.length === 0) {
            toast.error("Please select at least one image.");
            setIsUploading(false);
            return;
        }

        for (let i = 0; i < validFiles.length; i++) {
            formData.append('images', validFiles[i]);
        }

        try {
            const token = await getToken();
            
            // --- This URL must match your API route's file path ---
            const { data } = await axios.post('/api/product/add', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (data.success) {
                toast.success(data.message);
                setFiles([]);
                setName('');
                setDescription('');
                setCategory('Model');
                setPrice('');
                setOfferPrice('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'An unexpected error occurred.');
            console.error("Upload failed:", error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex-1 min-h-screen">
            <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg mx-auto">
                <h1 className="text-2xl font-bold">Add a New Product</h1>
                <div>
                    <p className="text-base font-medium">Product Image (up to 4)</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {[...Array(4)].map((_, index) => (
                            <label key={index} htmlFor={`image${index}`}>
                                <input onChange={(e) => {
                                    const updatedFiles = [...files];
                                    updatedFiles[index] = e.target.files[0];
                                    setFiles(updatedFiles);
                                }} type="file" id={`image${index}`} hidden />
                                <Image
                                    className="w-24 h-24 cursor-pointer object-cover aspect-square border rounded"
                                    src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                                    alt="upload placeholder"
                                    width={100}
                                    height={100}
                                />
                            </label>
                        ))}
                    </div>
                </div>
                
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
                    <input id="product-name" type="text" placeholder="e.g., Wireless Headphones" className="outline-none md:py-2.5 py-2 px-3 rounded border" onChange={(e) => setName(e.target.value)} value={name} required />
                </div>

                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
                    <textarea id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border resize-none" placeholder="Describe your product..." onChange={(e) => setDescription(e.target.value)} value={description} required ></textarea>
                </div>

                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="category">Category</label>
                        <select id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border" onChange={(e) => setCategory(e.target.value)} value={category}>
                            <option value="Model">Model</option>
                            <option value="Headphone">Headphone</option>
                            <option value="Watch">Watch</option>
                            <option value="Smartphone">Smartphone</option>
                            <option value="Laptop">Laptop</option>
                            <option value="Camera">Camera</option>
                            <option value="Accessories">Accessories</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Product Price</label>
                        <input id="product-price" type="number" placeholder="$20" className="outline-none md:py-2.5 py-2 px-3 rounded border" onChange={(e) => setPrice(e.target.value)} value={price} required />
                    </div>
                    <div className="flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input id="offer-price" type="number" placeholder="$15" className="outline-none md:py-2.5 py-2 px-3 rounded border" onChange={(e) => setOfferPrice(e.target.value)} value={offerPrice} required />
                    </div>
                </div>
                <button type="submit" disabled={isUploading} className="px-8 py-2.5 bg-orange-600 text-white font-medium rounded disabled:bg-gray-400">
                    {isUploading ? "Uploading..." : "ADD PRODUCT"}
                </button>
            </form>
        </div>
    );
};


// This is the wrapper component that protects the page
const ProtectedSellerPage = () => {
    const { isSeller, isLoading } = useAppContext();
    const router = useRouter();

    useEffect(() => {
        // Wait until the user data is fully loaded
        if (!isLoading) {
            // If it's done loading and the user is NOT a seller, redirect them
            if (!isSeller) {
                toast.error("Access Denied: You are not a seller.");
                router.push('/'); // Redirect to the homepage
            }
        }
    }, [isLoading, isSeller, router]);

    // While loading, show a neutral message
    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p>Verifying seller status...</p>
            </div>
        );
    }

    // If loading is done and they are a seller, show the form.
    // Otherwise, render null while the redirect happens.
    return isSeller ? <AddProductForm /> : null;
};

export default ProtectedSellerPage;