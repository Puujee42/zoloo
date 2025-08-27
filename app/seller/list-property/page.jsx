'use client'

import {React, in_stock, useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { UploadCloud, X, CheckSquare, Square, Loader } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Улаанбаатарын дүүргүүдийн жагсаалт
const ulaanbaatarDistricts = [
    "Багануур", "Багахангай", "Баянгол", "Баянзүрх",
    "Чингэлтэй", "Хан-Уул", "Налайх", "Сонгинохайрхан", "Сүхбаатар"
];

const ListPropertyPage = () => {
    const { isSeller, isLoading: isAuthLoading } = useAppContext();
    const router = useRouter();

    const [propertyData, setPropertyData] = useState({
        title: '',
        description: '',
        address: '',
        type: 'Apartment',
        status: 'Зарагдана',
        price: '',
        area: '',
        number: '',
        features: '',
        duureg: 'Баянзүрх',
        khoroo: '',
        davhar: '',
        roomCount: '',
        oirhonTogloomiinTalbai: false,
        surguuli: false,
        zeel: false,
        barter: false,
        lizing: false,
    });

    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
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
        const { name, value, type, checked } = e.target;
        setPropertyData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
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
        videos.forEach(videoFile => formData.append('videos', videoFile));

        try {
            const response = await fetch('/api/property', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || `Сервер ${response.status} алдаатай хариу өглөө`);
            }

            if (result.success) {
                toast.success('Үл хөдлөх хөрөнгийг амжилттай бүртгэлээ!');
                router.push(`/property/${result.property._id}`);
            } else {
                throw new Error(result.error || 'Үл хөдлөх хөрөнгө бүртгэхэд алдаа гарлаа.');
            }
        } catch (error) {
            toast.error(error.message || 'Гэнэтийн алдаа гарлаа.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // --- Reusable Styles using your tailwind.config.js colors ---
    const inputLabel = "block text-sm font-medium text-zolDark mb-1";
    const inputStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-zolGold focus:ring-zolGold sm:text-sm h-11 px-3 transition-colors duration-200 bg-white";
    const uploadBox = "mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-10 bg-white hover:border-zolGold/70 transition-colors duration-300";
    const uploadLabel = "relative cursor-pointer rounded-md font-semibold text-zolGreen focus-within:outline-none focus-within:ring-2 focus-within:ring-zolGold focus-within:ring-offset-2 hover:text-zolGold";
    const removeButton = "absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700";
    const submitButton = "mt-10 w-full bg-zolGold text-white font-semibold py-3 px-8 rounded-lg transition-all transform hover:opacity-90 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2";
    const checkboxLabel = "flex items-center gap-2 text-sm text-zolDark cursor-pointer";

    if (isAuthLoading) {
        return <div className="flex items-center justify-center min-h-screen"><p className="text-center p-8 font-semibold text-zolGreen">Борлуулагчийн статусыг шалгаж байна...</p></div>;
    }

    const showBuildingDetails = propertyData.type === 'Apartment' || propertyData.type === 'House';

    return isSeller ? (
        <div className="bg-zolGreen/5 min-h-screen py-10">
            <motion.form
                onSubmit={onSubmitHandler}
                className="max-w-4xl mx-auto p-4 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-200"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="space-y-2 mb-10 text-center">
                    <h1 className="font-playfair text-4xl font-bold text-zolGreen">Зар оруулах</h1>
                    <p className="text-zolDark/70">Үл хөдлөх хөрөнгийн мэдээллээ дэлгэрэнгүй бөглөнө үү.</p>
                </motion.div>

                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Basic Info */}
                    <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Гарчиг</label><input name="title" value={propertyData.title} onChange={handleChange} placeholder="Жишээ нь: Хан-Уулд 3 өрөө байр" className={inputStyle} required /></motion.div>
                    <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Дэлгэрэнгүй хаяг</label><input name="address" value={propertyData.address} onChange={handleChange} placeholder="Хороолол, байр, гудамжны нэр..." className={inputStyle} required /></motion.div>
                    <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Утасны дугаар</label><input name="number" type="tel" value={propertyData.number} onChange={handleChange} placeholder="99118822" className={inputStyle} required /></motion.div>
                    <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Тайлбар</label><textarea name="description" value={propertyData.description} onChange={handleChange} placeholder="Онцлог, давуу тал, орчин..." className={`${inputStyle} h-auto`} rows={4} required /></motion.div>

                    {/* Details */}
                    <motion.div variants={itemVariants}><label className={inputLabel}>Төлөв</label><select name="status" value={propertyData.status} onChange={handleChange} className={inputStyle} required><option>Зарагдана</option><option>Түрээслүүлнэ</option></select></motion.div>
                    <motion.div variants={itemVariants}><label className={inputLabel}>{priceLabel}</label><input name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder={pricePlaceholder} className={inputStyle} required /></motion.div>
                    <motion.div variants={itemVariants}><label className={inputLabel}>Талбай (м²)</label><input name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="120" className={inputStyle} required /></motion.div>
                    <motion.div variants={itemVariants}>
                        <label className={inputLabel}>Төрөл</label>
                        <select name="type" value={propertyData.type} onChange={handleChange} className={inputStyle} required>
                            <option value="Apartment">Орон сууц</option>
                            <option value="House">Зуслангийн байшин</option>
                            <option value="Land">Газар</option>
                            <option value="Car">Автомашин</option>
                            <option value="Barter">Бартер</option>
                        </select>
                    </motion.div>

                    <motion.div variants={itemVariants}><label className={inputLabel}>Дүүрэг</label><select name="duureg" value={propertyData.duureg} onChange={handleChange} className={inputStyle} required>{ulaanbaatarDistricts.map(d => <option key={d} value={d}>{d}</option>)}</select></motion.div>
                    <motion.div variants={itemVariants}><label className={inputLabel}>Хороо</label><input name="khoroo" type="text" value={propertyData.khoroo} onChange={handleChange} placeholder="Жишээ нь: 1-р хороо" className={inputStyle} required /></motion.div>

                    <AnimatePresence>
                        {showBuildingDetails && (
                           <>
                                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="contents">
                                    <div className='md:col-span-1'><label className={inputLabel}>Давхар</label><input name="davhar" type="number" value={propertyData.davhar} onChange={handleChange} placeholder="9" className={inputStyle} required /></div>
                                    <div className='md:col-span-1'><label className={inputLabel}>Өрөөний тоо</label><input name="roomCount" type="number" value={propertyData.roomCount} onChange={handleChange} placeholder="3" className={inputStyle} required /></div>
                                </motion.div>
                           </>
                        )}
                    </AnimatePresence>

                    <motion.div variants={itemVariants} className="md:col-span-2 border-t pt-6 mt-4 flex items-center flex-wrap gap-x-8 gap-y-4">
                         <label className={checkboxLabel}>
                             <input type="checkbox" name="surguuli" checked={propertyData.surguuli} onChange={handleChange} className="hidden" />
                             {propertyData.surguuli ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-400" />}
                             <span>Ойрхон сургуультай</span>
                         </label>
                         <label className={checkboxLabel}>
                             <input type="checkbox" name="oirhonTogloomiinTalbai" checked={propertyData.oirhonTogloomiinTalbai} onChange={handleChange} className="hidden" />
                             {propertyData.oirhonTogloomiinTalbai ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-400" />}
                             <span>Ойрхон тоглоомын талбайтай</span>
                         </label>
                    </motion.div>

                    <motion.div variants={itemVariants} className="md:col-span-2 border-t pt-6">
                        <h3 className="text-base font-semibold text-zolGreen mb-4">Төлбөрийн нөхцөл</h3>
                        <div className="flex items-center flex-wrap gap-x-8 gap-y-4">
                            <label className={checkboxLabel}>
                                <input type="checkbox" name="zeel" checked={propertyData.zeel} onChange={handleChange} className="hidden" />
                                {propertyData.zeel ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-400" />}
                                <span>Зээлээр авах боломжтой</span>
                            </label>
                            <label className={checkboxLabel}>
                                <input type="checkbox" name="barter" checked={propertyData.barter} onChange={handleChange} className="hidden" />
                                {propertyData.barter ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-400" />}
                                <span>Бартер хийх боломжтой</span>
                            </label>
                            <label className={checkboxLabel}>
                                <input type="checkbox" name="lizing" checked={propertyData.lizing} onChange={handleChange} className="hidden" />
                                {propertyData.lizing ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-400" />}
                                <span>Лизингээр авах боломжтой</span>
                            </label>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="md:col-span-2 pt-6 border-t"><label className={inputLabel}>Нэмэлт онцлог (таслалаар тусгаарлана)</label><input name="features" value={propertyData.features} onChange={handleChange} placeholder="Жишээ нь: Гаражтай, Тагттай, Харуул хамгаалалттай" className={inputStyle} /></motion.div>

                    <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Зураг (8 хүртэл)</label><div className={uploadBox}><UploadCloud className="mx-auto h-12 w-12 text-gray-400" /><label htmlFor="image-upload" className={uploadLabel}><span>Зураг сонгох</span><input id="image-upload" type="file" className="sr-only" multiple onChange={(e) => handleFileChange(e, setImages, 'зураг', 8)} accept="image/*" /></label><p className="text-xs text-gray-500">PNG, JPG (10MB-аас бага)</p></div></motion.div>
                    {images.length > 0 && <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">{images.map((file, index) => (<motion.div key={index} className="relative group" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}><Image src={URL.createObjectURL(file)} alt={`preview ${index}`} width={112} height={112} className="h-28 w-28 rounded-md object-cover border-2" /><button type="button" onClick={() => handleRemoveFile(index, setImages)} className={removeButton}><X size={16} /></button></motion.div>))}</div>}
                    
                    <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Видео (2 хүртэл)</label><div className={uploadBox}><UploadCloud className="mx-auto h-12 w-12 text-gray-400" /><label htmlFor="video-upload" className={uploadLabel}><span>Видео сонгох</span><input id="video-upload" type="file" className="sr-only" multiple onChange={(e) => handleFileChange(e, setVideos, 'видео', 2)} accept="video/*" /></label><p className="text-xs text-gray-500">MP4, MOV (100MB-аас бага)</p></div></motion.div>
                    {videos.length > 0 && <div className="md:col-span-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">{videos.map((file, index) => (<motion.div key={index} className="relative group" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}><video src={URL.createObjectURL(file)} width="112" height="112" className="h-28 w-28 rounded-md object-cover border-2" autoPlay loop muted playsInline /> <button type="button" onClick={() => handleRemoveFile(index, setVideos)} className={removeButton}><X size={16} /></button></motion.div>))}</div>}
                
                </motion.div>

                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={submitButton}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    variants={itemVariants}
                >
                    {isSubmitting ? (
                        <>
                            <Loader className="animate-spin" />
                            <span>Илгээж байна...</span>
                        </>
                    ) : "Зар оруулах"}
                </motion.button>
            </motion.form>
        </div>
    ) : null;
};

export default ListPropertyPage;