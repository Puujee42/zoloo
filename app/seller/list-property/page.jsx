// /app/list-property/page.jsx

'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { UploadCloud, X } from 'lucide-react';

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
    const [images, setImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // No changes to this logic
    useEffect(() => {
        if (!isAuthLoading && !isSeller) {
            toast.error("Нэвтрэх эрх алга.");
            router.push('/');
        }
    }, [isAuthLoading, isSeller, router]);
    
    // No changes to this logic
    const priceLabel = propertyData.status === 'Түрээслүүлнэ' ? 'Түрээс (₮ / сар)' : 'Үнэ (₮)';
    const pricePlaceholder = propertyData.status === 'Түрээслүүлнэ' ? 'жишээ нь, 2,500,000' : 'жишээ нь, 500,000,000';

    // All handler functions remain exactly the same
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

    const handleRemoveImage = (indexToRemove) => {
        setImages(prev => prev.filter((_, index) => index !== indexToRemove));
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
        images.forEach(image => formData.append('images', image));

        try {
            const response = await fetch('/api/property', { method: 'POST', body: formData });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Сервер ${response.status} алдаатай хариу өглөө: ${errorText}`);
            }
            const result = await response.json();
            if (result.success) {
                toast.success('Үл хөдлөх хөрөнгийг амжилттай бүртгэлээ!');
                router.push('/seller/my-listings');
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

    return isSeller ? (
        <form onSubmit={onSubmitHandler} className="max-w-4xl mx-auto p-4 sm:p-6">
            <div className="space-y-4 mb-10">
                {/* --- Themed heading --- */}
                <h1 className="text-3xl font-bold text-green-900">Үл хөдлөх хөрөнгөө бүртгүүлэх</h1>
                <p className="text-gray-600">Үл хөдлөх хөрөнгөө зах зээлд гаргахын тулд доорх мэдээллийг бөглөнө үү.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <input name="title" value={propertyData.title} onChange={handleChange} placeholder="Үл хөдлөх хөрөнгийн гарчиг" className="input-style md:col-span-2" required />
                <input name="address" value={propertyData.address} onChange={handleChange} placeholder="Үл хөдлөх хөрөнгийн бүтэн хаяг" className="input-style md:col-span-2" required />
                <textarea name="description" value={propertyData.description} onChange={handleChange} placeholder="Үл хөдлөх хөрөнгийн дэлгэрэнгүй тодорхойлолт" className="input-style md:col-span-2" rows={5} required />
                
                <div>
                    {/* --- Themed label --- */}
                    <label className="block text-sm font-medium text-green-900 mb-1">Зарын төлөв</label>
                    <select name="status" value={propertyData.status} onChange={handleChange} className="input-style" required>
                        <option>Зарагдана</option>
                        <option>Түрээслүүлнэ</option>
                    </select>
                </div>
                <div>
                    {/* --- Themed label --- */}
                    <label className="block text-sm font-medium text-green-900 mb-1">{priceLabel}</label>
                    <input name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder={pricePlaceholder} className="input-style" required />
                </div>
                
                <input name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="Талбай (м.кв)" className="input-style" required />
                <select name="type" value={propertyData.type} onChange={handleChange} className="input-style" required>
                    <option value="" disabled>Үл хөдлөх хөрөнгийн төрлийг сонгоно уу</option>
                    <option>Байшин</option><option>Орон сууц</option><option>Кондо</option><option>Вилла</option><option>Газар</option><option>Таунхаус</option>
                </select>
                
                {propertyData.type !== 'Land' && (
                    <>
                        <input name="bedrooms" type="number" value={propertyData.bedrooms} onChange={handleChange} placeholder="Унтлагын өрөө" className="input-style" required={propertyData.type !== 'Land'} />
                        <input name="bathrooms" type="number" value={propertyData.bathrooms} onChange={handleChange} placeholder="Угаалгын өрөө" className="input-style" required={propertyData.type !== 'Land'} />
                    </>
                )}
                
                <input name="features" value={propertyData.features} onChange={handleChange} placeholder="Онцлог (жишээ нь, Усан сан, Гараж)" className="input-style md:col-span-2" />

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-green-900 mb-2">Үл хөдлөх хөрөнгийн зураг</label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                        <div className="text-center">
                            <UploadCloud className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                {/* --- Themed file upload link --- */}
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

            {/* --- Themed submit button --- */}
            <button type="submit" disabled={isSubmitting} className="mt-10 w-full bg-amber-500 hover:bg-amber-600 text-green-900 font-bold py-3 px-8 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isSubmitting ? "Илгээж байна..." : "Миний үл хөдлөх хөрөнгийг бүртгэх"}
            </button>
            <style jsx>{`
                .input-style {
                    /* --- Themed focus ring --- */
                    @apply block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6 transition;
                }
            `}</style>
        </form>
    ) : null;
};

export default ListPropertyPage;