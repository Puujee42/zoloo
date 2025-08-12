// /app/list-property/page.jsx
'use client'

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';
import { UploadCloud, X } from "lucide-react"; // Icons for the UI

const ListPropertyPage = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // State for all property text/number data based on your schema
    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        address: '',
        type: 'House',       // Default value
        status: 'For Sale',  // Default value
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
            toast.error("Та хамгийн ихдээ 10 зураг оруулах боломжтой.");
            return;
        }
        setImages(prev => [...prev, ...files]);
    };
    
    const handleRemoveImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error('Please upload at least one image.');
            return;
        }
        setIsLoading(true);

        const formData = new FormData();
        for (const key in propertyData) {
            formData.append(key, propertyData[key]);
        }
        images.forEach(image => {
            formData.append('images', image);
        });

        try {
            const response = await fetch('/api/property', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const textError = await response.text();
                throw new Error(`Server responded with ${response.status}: ${textError}`);
            }

            const result = await response.json();

            if (result.success) {
                toast.success('Үл хөдлөх хөрөнгийг амжилттай бүртгэлээ!');
                router.push('/seller-dashboard'); 
            } else {
                toast.error(result.message || 'An unknown error occurred.');
            }
        } catch (error) {
            toast.error(error.message);
            console.error("Submission failed:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Reusable styles for form inputs for a consistent look
    const inputStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50 text-gray-800";

    return (
        <>
            <Navbar />
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto bg-white p-8 sm:p-10 rounded-xl shadow-lg border border-gray-200">
                        {/* --- Form Header --- */}
                        <div className="text-center mb-10">
                            <h1 className="text-3xl md:text-4xl font-bold text-green-900">Үл хөдлөх хөрөнгөө бүртгүүлэх</h1>
                            <p className="mt-3 text-gray-600">Үл хөдлөх хөрөнгөө зах зээлд гаргахын тулд доорх мэдээллийг бөглөнө үү.</p>
                        </div>

                        {/* --- Form Fields Grid --- */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="md:col-span-2">
                                <label htmlFor="title" className="sr-only">Гарчиг</label>
                                <input id="title" name="title" value={propertyData.title} onChange={handleChange} placeholder="Үл хөдлөх хөрөнгийн гарчиг" className={inputStyle} required />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="address" className="sr-only">Хаяг</label>
                                <input id="address" name="address" value={propertyData.address} onChange={handleChange} placeholder="Үл хөдлөх хөрөнгийн хаяг" className={inputStyle} required />
                            </div>
                            <div className="md:col-span-2">
                                <label htmlFor="description" className="sr-only">Тодорхойлолт</label>
                                <textarea id="description" name="description" value={propertyData.description} onChange={handleChange} placeholder="Үл хөдлөх хөрөнгийн тодорхойлолт" className={inputStyle} rows={4} required />
                            </div>
                            <input name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder="Үнэ (₮)" className={inputStyle} required />
                            <input name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="Талбай (м.кв)" className={inputStyle} required />
                            <input name="bedrooms" type="number" value={propertyData.bedrooms} onChange={handleChange} placeholder="Унтлагын өрөө" className={inputStyle} required />
                            <input name="bathrooms" type="number" value={propertyData.bathrooms} onChange={handleChange} placeholder="Угаалгын өрөө" className={inputStyle} required />
                            <select name="type" value={propertyData.type} onChange={handleChange} className={inputStyle} required>
                                <option>Байшин</option>
                                <option>Орон сууц</option>
                                <option>Кондо</option>
                                <option>Вилла</option>
                                <option>Газар</option>
                                <option>Таунхаус</option>
                            </select>
                            <select name="status" value={propertyData.status} onChange={handleChange} className={inputStyle} required>
                                <option>Зарагдана</option>
                                <option>Түрээслүүлнэ</option>
                            </select>
                            <div className="md:col-span-2">
                                <input name="features" value={propertyData.features} onChange={handleChange} placeholder="Онцлог (таслалаар тусгаарлана, жишээ нь, Усан сан, Гараж)" className={inputStyle} />
                            </div>
                            
                            {/* --- Image Uploader --- */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-green-900 mb-2">Үл хөдлөх хөрөнгийн зураг</label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                                    <div className="text-center">
                                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-amber-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-amber-600 focus-within:ring-offset-2 hover:text-amber-500">
                                                <span>Файл оруулах</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">эсвэл чирч тавина уу</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-500">PNG, JPG, GIF 10MB хүртэл</p>
                                    </div>
                                </div>
                            </div>

                            {/* --- Image Previews --- */}
                            {images.length > 0 && (
                                <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                                    {images.map((file, index) => (
                                        <div key={index} className="relative group">
                                            <img src={URL.createObjectURL(file)} alt={`preview ${index}`} className="h-28 w-28 rounded-md object-cover border-2 border-gray-200" />
                                            <button type="button" onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* --- Submit Button --- */}
                        <button type="submit" disabled={isLoading} className="mt-12 w-full bg-amber-500 text-green-900 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105 hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100">
                            {isLoading ? 'Илгээж байна...' : 'Миний үл хөдлөх хөрөнгийг бүртгэх'}
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ListPropertyPage;