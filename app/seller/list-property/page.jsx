// /app/list-property/page.jsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { UploadCloud, X } from 'lucide-react';
import Image from 'next/image';

const ListPropertyPage = () => {
    const { isSeller, isLoading: isAuthLoading } = useAppContext();
    const router = useRouter();

    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        address: '',
        type: 'House',
        status: 'Зарагдана',
        price: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        features: '',
    });
    
    // --- MODIFIED: Added state for video files ---
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]); // <-- NEW STATE FOR VIDEOS
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthLoading && !isSeller) {
            toast.error("Нэвтрэх эрх алга.");
            router.push('/');
        }
    }, [isAuthLoading, isSeller, router]);
    
    const priceLabel = propertyData.status === 'Түрээслүүлнэ' ? 'Түрээс (₮ / сар)' : 'Үнэ (₮)';
    const pricePlaceholder = propertyData.status === 'Түрээслүүлнэ' ? 'жишээ нь, 2,500,000' : 'жишээ нь, 500,000,000';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (images.length + files.length > 8) { // Set your image limit
            toast.error("Та хамгийн ихдээ 8 зураг оруулах боломжтой.");
            return;
        }
        setImages(prev => [...prev, ...files]);
    };
    
    // --- NEW: Handler for video changes ---
    const handleVideoChange = (e) => {
        const files = Array.from(e.target.files);
        if (videos.length + files.length > 2) { // Set your video limit
            toast.error("Та хамгийн ихдээ 2 видео оруулах боломжтой.");
            return;
        }
        setVideos(prev => [...prev, ...files]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    // --- NEW: Handler to remove a video ---
    const handleRemoveVideo = (indexToRemove) => {
        setVideos(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error("Доод тал нь нэг зураг оруулна уу.");
            return;
        }
        setIsSubmitting(true);
        const formData = new FormData();
        
        // Append all text data
        Object.entries(propertyData).forEach(([key, value]) => formData.append(key, value));
        
        // Append all image files under the key "images"
        images.forEach(imageFile => formData.append('images', imageFile));
        
        // --- NEW: Append all video files under the key "videos" ---
        videos.forEach(videoFile => formData.append('videos', videoFile));

        try {
            const response = await fetch('/api/property', { method: 'POST', body: formData });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Сервер ${response.status} алдаатай хариу өглөө`);
            }
            const result = await response.json();
            if (result.success) {
                toast.success('Үл хөдлөх хөрөнгийг амжилттай бүртгэлээ!');
                router.push(`/property/${result.property._id}`); // Redirect to the new property page
            } else {
                toast.error(result.message || 'Үл хөдлөх хөрөнгө бүртгэхэд алдаа гарлаа.');
            }
        } catch (error) {
            toast.error(error.message || 'Гэнэтийн алдаа гарлаа.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isAuthLoading) {
        return <p className="text-center p-8 font-semibold text-green-900">Борлуулагчийн статусыг шалгаж байна...</p>;
    }

    // --- Main JSX Form ---
    return isSeller ? (
        <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="space-y-4 mb-10">
                <h1 className="text-3xl font-bold text-green-900">Үл хөдлөх хөрөнгөө бүртгүүлэх</h1>
                <p className="text-gray-600">Үл хөдлөх хөрөнгөө зах зээлд гаргахын тулд доорх мэдээллийг бөглөнө үү.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Text and Select Inputs (No changes here) */}
                <input name="title" value={propertyData.title} onChange={handleChange} placeholder="Гарчиг (жишээ нь, Хан-Уул дүүрэгт 3 өрөө байр)" className="input-style md:col-span-2" required />
                <input name="address" value={propertyData.address} onChange={handleChange} placeholder="Байршлын дэлгэрэнгүй хаяг" className="input-style md:col-span-2" required />
                <textarea name="description" value={propertyData.description} onChange={handleChange} placeholder="Үл хөдлөх хөрөнгийн дэлгэрэнгүй тайлбар" className="input-style md:col-span-2" rows={5} required />
                
                <div>
                    <label className="input-label">Зарын төлөв</label>
                    <select name="status" value={propertyData.status} onChange={handleChange} className="input-style" required>
                        <option>Зарагдана</option>
                        <option>Түрээслүүлнэ</option>
                    </select>
                </div>
                <div>
                    <label className="input-label">{priceLabel}</label>
                    <input name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder={pricePlaceholder} className="input-style" required />
                </div>
                
                <input name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="Талбай (м²)" className="input-style" required />
                <select name="type" value={propertyData.type} onChange={handleChange} className="input-style" required>
                    <option value="" disabled>Төрөл сонгоно уу</option>
                    <option>House</option><option>Apartment</option><option>Condo</option><option>Villa</option><option>Land</option><option>Townhouse</option>
                </select>
                
                {propertyData.type !== 'Land' && (
                    <>
                        <input name="bedrooms" type="number" value={propertyData.bedrooms} onChange={handleChange} placeholder="Унтлагын өрөөний тоо" className="input-style" required={propertyData.type !== 'Land'} />
                        <input name="bathrooms" type="number" value={propertyData.bathrooms} onChange={handleChange} placeholder="Угаалгын өрөөний тоо" className="input-style" required={propertyData.type !== 'Land'} />
                    </>
                )}
                
                <input name="features" value={propertyData.features} onChange={handleChange} placeholder="Онцлог шинж чанарууд (таслалаар тусгаарлана уу)" className="input-style md:col-span-2" />

                {/* --- Image Upload Section --- */}
                <div className="md:col-span-2">
                    <label className="input-label mb-2">Зураг (8 хүртэл)</label>
                    <div className="upload-box">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <label htmlFor="image-upload" className="upload-label">
                            <span>Зураг сонгох</span>
                            <input id="image-upload" type="file" className="sr-only" multiple onChange={handleImageChange} accept="image/*" />
                        </label>
                        <p className="text-xs text-gray-500">PNG, JPG 10MB-аас бага</p>
                    </div>
                </div>
                {images.length > 0 && (
                    <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
                        {images.map((file, index) => (
                            <div key={index} className="relative group">
                                <Image src={URL.createObjectURL(file)} alt={`preview ${index}`} width={112} height={112} className="h-28 w-28 rounded-md object-cover border-2" />
                                <button type="button" onClick={() => handleRemoveImage(index)} className="remove-button"><X size={16} /></button>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* --- NEW: Video Upload Section --- */}
                <div className="md:col-span-2">
                    <label className="input-label mb-2">Видео (2 хүртэл)</label>
                    <div className="upload-box">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                        <label htmlFor="video-upload" className="upload-label">
                            <span>Видео сонгох</span>
                            <input id="video-upload" type="file" className="sr-only" multiple onChange={handleVideoChange} accept="video/*" />
                        </label>
                        <p className="text-xs text-gray-500">MP4, MOV 50MB-аас бага</p>
                    </div>
                </div>
                {videos.length > 0 && (
                    <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {videos.map((file, index) => (
                            <div key={index} className="relative group">
                                <video src={URL.createObjectURL(file)} className="h-32 w-full rounded-md object-cover border-2" controls />
                                <button type="button" onClick={() => handleRemoveVideo(index)} className="remove-button"><X size={16} /></button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <button type="submit" disabled={isSubmitting} className="submit-button">
                {isSubmitting ? "Илгээж байна..." : "Миний үл хөдлөх хөрөнгийг бүртгэх"}
            </button>
            
            {/* --- Reusable Styles --- */}
            <style jsx>{`
                .input-label { @apply block text-sm font-medium text-green-900; }
                .input-style { @apply block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6 transition; }
                .upload-box { @apply mt-2 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10; }
                .upload-label { @apply relative cursor-pointer rounded-md bg-white font-semibold text-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-600 focus-within:ring-offset-2 hover:text-yellow-500; }
                .remove-button { @apply absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md; }
                .submit-button { @apply mt-10 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105; }
            `}</style>
        </form>
    ) : null;
};

export default ListPropertyPage;