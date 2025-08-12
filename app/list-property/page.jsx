// Recommended file path: /app/list-property/page.jsx
'use client'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { UploadCloud, X } from "lucide-react"; // Icons for UI

const ListPropertyPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // State for all property data based on your schema
    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        address: '',
        type: 'House', // Default value
        status: 'For Sale', // Default value
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        features: '', // Will be a comma-separated string
    });
    
    // Separate state for image files
    const [images, setImages] = useState([]);

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
    
    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData();

        // Append all text/number data to formData
        for (const key in propertyData) {
            formData.append(key, propertyData[key]);
        }
        // Append all image files
        images.forEach(image => {
            formData.append('images', image);
        });

        // --- THIS IS THE UPDATED/FIXED BLOCK ---
        try {
            const response = await fetch('/api/property', {
                method: 'POST',
                body: formData,
            });

            // Check if the response is successful and is of type JSON before parsing
            const contentType = response.headers.get("content-type");
            if (!response.ok) {
                // If the server sent an error, try to get the message as plain text.
                const textError = await response.text();
                // This will give a more detailed error, e.g., "Server responded with 500: Internal Server Error"
                throw new Error(`Server responded with ${response.status}: ${textError}`);
            }

            // If we get here, the response is OK and likely JSON
            const result = await response.json();

            if (result.success) {
                toast.success('Property Listed Successfully!');
                router.push('/seller-dashboard');
            } else {
                toast.error(result.message || 'Something went wrong.');
            }
        } catch (error) {
            // This will now display the much more informative error message from the 'throw' above
            toast.error(error.message);
            console.error("Submission failed:", error);
        } finally {
            setIsLoading(false);
        }
        // --- END OF THE UPDATED/FIXED BLOCK ---
    };

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto">
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold text-gray-900">List Your Property</h1>
                        <p className="text-gray-600">Fill out the details below to put your property on the market.</p>
                    </div>

                    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        {/* Column 1 */}
                        <input name="title" value={propertyData.title} onChange={handleChange} placeholder="Property Title (e.g., Modern Downtown Condo)" className="input-style" required />
                        <input name="address" value={propertyData.address} onChange={handleChange} placeholder="Property Address" className="input-style" required />
                        <textarea name="description" value={propertyData.description} onChange={handleChange} placeholder="Property Description" className="input-style md:col-span-2" rows={4} required />
                        <input name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder="Price (USD)" className="input-style" required />
                        <input name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="Area (sqft)" className="input-style" required />
                        <input name="bedrooms" type="number" value={propertyData.bedrooms} onChange={handleChange} placeholder="Bedrooms" className="input-style" required />
                        <input name="bathrooms" type="number" value={propertyData.bathrooms} onChange={handleChange} placeholder="Bathrooms" className="input-style" required />
                        <select name="type" value={propertyData.type} onChange={handleChange} className="input-style" required>
                            <option>House</option>
                            <option>Apartment</option>
                            <option>Condo</option>
                            <option>Villa</option>
                            <option>Land</option>
                            <option>Townhouse</option>
                        </select>
                        <select name="status" value={propertyData.status} onChange={handleChange} className="input-style" required>
                            <option>For Sale</option>
                            <option>For Rent</option>
                        </select>
                        <input name="features" value={propertyData.features} onChange={handleChange} placeholder="Features (comma-separated, e.g., Pool, Garage)" className="input-style md:col-span-2" />

                        {/* Image Uploader */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Property Images</label>
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                <div className="text-center">
                                    <UploadCloud className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500">
                                            <span>Upload files</span>
                                            <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Image Previews */}
                        {images.length >  tribulations(
                            <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                {images.map((file, index) => (
                                    <div key={index} className="relative group">
                                        <img src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-24 w-24 rounded-md object-cover" />
                                        <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit" disabled={isLoading} className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-400">
                        {isLoading ? 'Submitting...' : 'List My Property'}
                    </button>
                </form>
            </div>
            <Footer />
            {/* Simple CSS in JS for reused input styles */}
            <style jsx>{`
                .input-style {
                    @apply block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6;
                }
            `}</style>
        </>
    );
};

export default ListPropertyPage;