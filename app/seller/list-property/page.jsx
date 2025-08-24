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
        number: '',
        images: '',
        videos: '', // Added for videos
    });

    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]); // New state for videos
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!isAuthLoading && !isSeller) {
            toast.error("Энэ хуудаст хандах эрхгүй байна.");
            router.push('/');
        }
    }, [isAuthLoading, isSeller, router]);

    const priceLabel = propertyData.status === 'Түрээслүүлнэ' ? 'Түрээс (₮ / сар)' : 'Үнэ (₮)';
    const pricePlaceholder = propertyData.status === 'Түрээслүүлнэ' ? '2,500,000' : '500,000,000';

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPropertyData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e, setFiles, fileType, maxFiles) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prevFiles => {
            if (prevFiles.length + selectedFiles.length > maxFiles) {
                toast.error(`Та хамгийн ихдээ ${maxFiles} ${fileType} оруулах боломжтой.`);
                return prevFiles;
            }
            return [...prevFiles, ...selectedFiles];
        });
    };

    const handleRemoveFile = (indexToRemove, setFiles) => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (images.length === 0) {
            toast.error("Доод тал нь нэг зураг оруулна уу.");
            return;
        }
        setIsSubmitting(true);
        const formData = new FormData();

        Object.entries(propertyData).forEach(([key, value]) => formData.append(key, value));
        images.forEach(imageFile => formData.append('images', imageFile));
        videos.forEach(videoFile => formData.append('videos', videoFile)); // Append video files

        try {
            const response = await fetch('/api/property', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Сервер ${response.status} алдаатай хариу өглөө`);
            }
            const result = await response.json();
            if (result.success) {
                toast.success('Үл хөдлөх хөрөнгийг амжилттай бүртгэлээ!');
                router.push(`/property/${result.property._id}`);
            } else {
                throw new Error(result.message || 'Үл хөдлөх хөрөнгө бүртгэхэд алдаа гарлаа.');
            }
        } catch (error) {
            toast.error(error.message || 'Гэнэтийн алдаа гарлаа.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Reusable Styles ---
    const inputLabel = "block text-sm font-medium text-zolDark mb-1";
    const inputStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-zolGold focus:ring-zolGold sm:text-sm h-11 px-3 transition-colors duration-200";
    const uploadBox = "mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-zolGold/50 px-6 py-10 bg-white hover:bg-zolGold/5 transition-colors";
    const uploadLabel = "relative cursor-pointer rounded-md font-semibold text-zolGreen focus-within:outline-none focus-within:ring-2 focus-within:ring-zolGold focus-within:ring-offset-2 hover:text-zolGold";
    const removeButton = "absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700";
    const submitButton = "mt-10 w-full bg-zolGold text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none";

    if (isAuthLoading) {
        return <div className="flex items-center justify-center min-h-screen"><p className="text-center p-8 font-semibold text-zolGreen">Борлуулагчийн статусыг шалгаж байна...</p></div>;
    }

    return isSeller ? (
        <div className="bg-zolGreen/5 min-h-screen py-10">
            <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-200">
                <div className="space-y-2 mb-10 text-center">
                    <h1 className="font-playfair text-4xl font-bold text-zolGreen">Зар оруулах</h1>
                    <p className="text-zolDark/70">Үл хөдлөх хөрөнгийн мэдээллээ дэлгэрэнгүй бөглөнө үү.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Basic Info */}
                    <div className="md:col-span-2"><label className={inputLabel}>Гарчиг</label><input name="title" value={propertyData.title} onChange={handleChange} placeholder="Жишээ нь: Хан-Уулд 3 өрөө байр" className={inputStyle} required /></div>
                    <div className="md:col-span-2"><label className={inputLabel}>Дэлгэрэнгүй хаяг</label><input name="address" value={propertyData.address} onChange={handleChange} placeholder="Байршил, хороо, гудамж..." className={inputStyle} required /></div>
                    <div className="md:col-span-2"><label className={inputLabel}>дугаар</label><textarea name="number" value={propertyData.number} onChange={handleChange} placeholder="99918122" className={inputStyle} rows={5} required /></div>
                    <div className="md:col-span-2"><label className={inputLabel}>Тайлбар</label><textarea name="description" value={propertyData.description} onChange={handleChange} placeholder="Онцлог, давуу тал, орчин..." className={inputStyle} rows={5} required /></div>

                    {/* Details */}
                    <div><label className={inputLabel}>Төлөв</label><select name="status" value={propertyData.status} onChange={handleChange} className={inputStyle} required><option>Зарагдана</option><option>Түрээслүүлнэ</option></select></div>
                    <div><label className={inputLabel}>{priceLabel}</label><input name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder={pricePlaceholder} className={inputStyle} required /></div>
                    <div><label className={inputLabel}>Талбай (м²)</label><input name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="120" className={inputStyle} required /></div>
                    <div><label className={inputLabel}>Төрөл</label><select name="type" value={propertyData.type} onChange={handleChange} className={inputStyle} required><option>House</option><option>Apartment</option><option>Land</option><option>Car</option><option>Barter</option></select></div>

                    {propertyData.type !== 'Land' && propertyData.type !== 'Car' && (
                        <>
                        </>
                    )}

                    <div className="md:col-span-2"><label className={inputLabel}>Нэмэлт онцлог</label><input name="features" value={propertyData.features} onChange={handleChange} placeholder="Жишээ нь: Гаражтай, Тагттай, Харуул хамгаалалттай" className={inputStyle} /></div>

                    {/* Image Upload */}
                    <div className="md:col-span-2"><label className={inputLabel}>Зураг (8 хүртэл)</label><div className={uploadBox}><UploadCloud className="mx-auto h-12 w-12 text-gray-400" /><label htmlFor="image-upload" className={uploadLabel}><span>Зураг сонгох</span><input id="image-upload" type="file" className="sr-only" multiple onChange={(e) => handleFileChange(e, setImages, 'зураг', 8)} accept="image/*" /></label><p className="text-xs text-gray-500">PNG, JPG (10MB-аас бага)</p></div></div>
                    {images.length > 0 && <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">{images.map((file, index) => (<div key={index} className="relative group"><Image src={URL.createObjectURL(file)} alt={`preview ${index}`} width={112} height={112} className="h-28 w-28 rounded-md object-cover border-2" /><button type="button" onClick={() => handleRemoveFile(index, setImages)} className={removeButton}><X size={16} /></button></div>))}</div>}

                    {/* Video Upload */}
                    <div className="md:col-span-2"><label className={inputLabel}>Видео (2 хүртэл)</label><div className={uploadBox}><UploadCloud className="mx-auto h-12 w-12 text-gray-400" /><label htmlFor="video-upload" className={uploadLabel}><span>Видео сонгох</span><input id="video-upload" type="file" className="sr-only" multiple onChange={(e) => handleFileChange(e, setVideos, 'видео', 2)} accept="video/*" /></label><p className="text-xs text-gray-500">MP4, MOV (100MB-аас бага)</p></div></div>
                    {videos.length > 0 && <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{videos.map((file, index) => (<div key={index} className="relative group"><video src={URL.createObjectURL(file)} width="112" height="112" className="h-28 w-28 rounded-md object-cover border-2" autoPlay loop muted playsInline /> <button type="button" onClick={() => handleRemoveFile(index, setVideos)} className={removeButton}><X size={16} /></button></div>))}</div>}

                </div>

                <button type="submit" disabled={isSubmitting} className={submitButton}>
                    {isSubmitting ? "Илгээж байна..." : "Зар оруулах"}
                </button>
            </form>
        </div>
    ) : null;
};

export default ListPropertyPage;