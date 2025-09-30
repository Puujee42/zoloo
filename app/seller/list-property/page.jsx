
'use client'

import { React, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { UploadCloud, X, CheckSquare, Square, Loader } from 'lucide-react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const ulaanbaatarDistricts = [ "Багануур", "Багахангай", "Баянгол", "Баянзүрх", "Чингэлтэй", "Хан-Уул", "Налайх", "Сонгинохайрхан", "Сүхбаатар" ];

// --- FIX: 'itemVariants' is now defined in the module's top-level scope. ---
// This makes it accessible to any component within this file, including FormSection.
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

// A reusable component for creating styled form sections.
const FormSection = ({ title, children }) => (
    <motion.div variants={itemVariants} className="pt-8 mt-8 border-t border-slate-200">
        <h2 className="text-xl font-semibold text-zolGreen mb-6 font-playfair">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {children}
        </div>
    </motion.div>
);

// This component handles both creating a new property and editing an existing one.
const ListPropertyPage = ({ propertyToEdit = null }) => {
    const { isSeller, isLoading: isAuthLoading } = useAppContext();
    const router = useRouter();
    const isEditMode = Boolean(propertyToEdit);

    const [propertyData, setPropertyData] = useState({
        title: '', description: '', address: '', type: 'Apartment',
        status: 'Зарагдана', price: '', area: '', number: '',
        features: '', duureg: 'Баянзүрх', khoroo: '', davhar: '',
        roomCount: '', oirhonTogloomiinTalbai: false, surguuli: false,
        zeel: false, barter: false, lizing: false,
    });

    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Effect to pre-fill the form if in edit mode
    useEffect(() => {
        if (isEditMode && propertyToEdit) {
            setPropertyData({
                title: propertyToEdit.title || '',
                description: propertyToEdit.description || '',
                address: propertyToEdit.address || '',
                type: propertyToEdit.type || 'Apartment',
                status: propertyToEdit.status || 'Зарагдана',
                price: propertyToEdit.price || '',
                area: propertyToEdit.area || '',
                number: propertyToEdit.number || '',
                features: propertyToEdit.features?.join(', ') || '',
                duureg: propertyToEdit.duureg || 'Баянзүрх',
                khoroo: propertyToEdit.khoroo || '',
                davhar: propertyToEdit.davhar || '',
                roomCount: propertyToEdit.roomCount || '',
                oirhonTogloomiinTalbai: propertyToEdit.oirhonTogloomiinTalbai || false,
                surguuli: propertyToEdit.surguuli || false,
                zeel: propertyToEdit.zeel || false,
                barter: propertyToEdit.barter || false,
                lizing: propertyToEdit.lizing || false,
            });
        }
    }, [isEditMode, propertyToEdit]);

    // Effect to handle authorization
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
        setPropertyData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleFileChange = (e, setFiles, fileType, maxFiles) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => {
            if (prev.length + selectedFiles.length > maxFiles) {
                toast.error(`Та хамгийн ихдээ ${maxFiles} ${fileType} оруулах боломжтой.`);
                return prev;
            }
            return [...prev, ...selectedFiles];
        });
    };

    const handleRemoveFile = (indexToRemove, setFiles) => {
        setFiles(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (images.length === 0 && !isEditMode) {
            toast.error("Доод тал нь нэг зураг оруулна уу.");
            return;
        }
        setIsSubmitting(true);
        const formData = new FormData();
        Object.entries(propertyData).forEach(([key, value]) => formData.append(key, value));
        images.forEach(imageFile => formData.append('images', imageFile));
        videos.forEach(videoFile => formData.append('videos', videoFile));

        try {
            const apiEndpoint = isEditMode ? `/api/property/${propertyToEdit._id}` : '/api/property';
            const apiMethod = isEditMode ? 'PUT' : 'POST';
            const response = await fetch(apiEndpoint, { method: apiMethod, body: formData });
            const result = await response.json();

            if (!response.ok) throw new Error(result.error || `Сервер ${response.status} алдаатай хариу өглөө`);
            if (!result.success) throw new Error(result.error || 'Үйлдэл амжилтгүй боллоо.');
            
            toast.success(isEditMode ? 'Зар амжилттай шинэчлэгдлээ!' : 'Зар амжилттай бүртгэгдлээ!');
            router.push(isEditMode ? '/seller/my-listings' : `/property/${result.property._id}`);
            router.refresh();

        } catch (error) {
            toast.error(error.message || 'Гэнэтийн алдаа гарлаа.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } };
    const inputLabel = "block text-sm font-semibold text-slate-700 mb-1.5";
    const inputStyle = "block w-full rounded-lg border-slate-300 shadow-sm focus:border-zolGold focus:ring-zolGold sm:text-sm h-11 px-4 transition-all duration-200 bg-slate-50/50 placeholder:text-slate-400";
    const checkboxLabel = "flex items-center gap-3 text-sm text-slate-800 cursor-pointer p-3 rounded-lg hover:bg-zolGold/10 transition-colors";
    const submitButton = "mt-10 w-full bg-zolGold text-white font-bold py-3.5 px-8 rounded-lg transition-all transform hover:shadow-lg hover:-translate-y-1 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-base";

    if (isAuthLoading) return <div className="flex items-center justify-center min-h-screen"><p className="text-center p-8 font-semibold text-zolGreen">Шалгаж байна...</p></div>;

    const showBuildingDetails = propertyData.type === 'Apartment' || propertyData.type === 'House';

    return isSeller ? (
        <div className="bg-slate-50 min-h-screen py-12 md:py-16">
            <motion.form
                onSubmit={onSubmitHandler}
                className="max-w-4xl mx-auto p-6 sm:p-10 bg-white rounded-2xl shadow-2xl shadow-slate-300/30 border border-slate-200"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants} className="text-center mb-10">
                    <h1 className="font-playfair text-4xl md:text-5xl font-bold text-zolGreen">
                        {isEditMode ? 'Зарын мэдээлэл засах' : 'Шинэ зар оруулах'}
                    </h1>
                    <p className="text-slate-500 mt-3 max-w-lg mx-auto">
                        {isEditMode ? 'Мэдээллээ доорх талбаруудад шинэчлэн хадгална уу.' : 'Танай үл хөдлөх хөрөнгийн мэдээллийг олон хүнд хүргэхэд тусалъя.'}
                    </p>
                </motion.div>

                <motion.div variants={containerVariants} className="space-y-6">
                    <FormSection title="Үндсэн мэдээлэл">
                        <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Зарын гарчиг</label><input name="title" value={propertyData.title} onChange={handleChange} placeholder="Жишээ нь: Хан-Уулд нарны хороололд 3 өрөө байр" className={inputStyle} required /></motion.div>
                        <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Дэлгэрэнгүй хаяг</label><input name="address" value={propertyData.address} onChange={handleChange} placeholder="Хороолол, байр, хаалганы код..." className={inputStyle} required /></motion.div>
                        <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Холбогдох дугаар</label><input name="number" type="tel" value={propertyData.number} onChange={handleChange} placeholder="99118822" className={inputStyle} required /></motion.div>
                        <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Нэмэлт тайлбар</label><textarea name="description" value={propertyData.description} onChange={handleChange} placeholder="Онцлог, давуу тал, орчин, засварын талаар дэлгэрэнгүй..." className={`${inputStyle} h-auto`} rows={5} required /></motion.div>
                    </FormSection>
                    
                    <FormSection title="Үзүүлэлт">
                        <motion.div variants={itemVariants}><label className={inputLabel}>Төрөл</label>
                            <select name="type" value={propertyData.type} onChange={handleChange} className={inputStyle} required>
                                <option value="Apartment">Орон сууц</option>
                                <option value="House">Хаус</option>
                                <option value="Land">Газар</option>
                                <option value="Car">Автомашин</option>
                                <option value="Barter">Бартер</option>
                            </select>
                        </motion.div>
                        <motion.div variants={itemVariants}><label className={inputLabel}>Төлөв</label><select name="status" value={propertyData.status} onChange={handleChange} className={inputStyle} required><option>Зарагдана</option><option>Түрээслүүлнэ</option></select></motion.div>
                        <motion.div variants={itemVariants}><label className={inputLabel}>{priceLabel}</label><input name="price" type="number" value={propertyData.price} onChange={handleChange} placeholder={pricePlaceholder} className={inputStyle} required /></motion.div>
                        <motion.div variants={itemVariants}><label className={inputLabel}>Талбай (м²)</label><input name="area" type="number" value={propertyData.area} onChange={handleChange} placeholder="120" className={inputStyle} required /></motion.div>
                        <motion.div variants={itemVariants}><label className={inputLabel}>Дүүрэг</label><select name="duureg" value={propertyData.duureg} onChange={handleChange} className={inputStyle} required>{ulaanbaatarDistricts.map(d => <option key={d} value={d}>{d}</option>)}</select></motion.div>
                        <motion.div variants={itemVariants}><label className={inputLabel}>Хороо</label><input name="khoroo" type="text" value={propertyData.khoroo} onChange={handleChange} placeholder="Жишээ нь: 1-р хороо" className={inputStyle} required /></motion.div>
                        <AnimatePresence>
                            {showBuildingDetails && (
                                <>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><label className={inputLabel}>Нийт давхар</label><input name="davhar" type="number" value={propertyData.davhar} onChange={handleChange} placeholder="9" className={inputStyle} required /></motion.div>
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><label className={inputLabel}>Өрөөний тоо</label><input name="roomCount" type="number" value={propertyData.roomCount} onChange={handleChange} placeholder="3" className={inputStyle} required /></motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </FormSection>

                    <FormSection title="Төлбөрийн нөхцөл ба онцлогууд">
                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <motion.label variants={itemVariants} className={checkboxLabel}><input type="checkbox" name="zeel" checked={propertyData.zeel} onChange={handleChange} className="hidden" />{propertyData.zeel ? <CheckSquare className="text-zolGold" /> : <Square className="text-slate-400" />}<span>Зээлээр авах боломжтой</span></motion.label>
                            <motion.label variants={itemVariants} className={checkboxLabel}><input type="checkbox" name="barter" checked={propertyData.barter} onChange={handleChange} className="hidden" />{propertyData.barter ? <CheckSquare className="text-zolGold" /> : <Square className="text-slate-400" />}<span>Бартер хийх боломжтой</span></motion.label>
                            <motion.label variants={itemVariants} className={checkboxLabel}><input type="checkbox" name="lizing" checked={propertyData.lizing} onChange={handleChange} className="hidden" />{propertyData.lizing ? <CheckSquare className="text-zolGold" /> : <Square className="text-slate-400" />}<span>Лизингээр авах боломжтой</span></motion.label>
                            <motion.label variants={itemVariants} className={checkboxLabel}><input type="checkbox" name="surguuli" checked={propertyData.surguuli} onChange={handleChange} className="hidden" />{propertyData.surguuli ? <CheckSquare className="text-zolGold" /> : <Square className="text-slate-400" />}<span>Сургууль ойрхон</span></motion.label>
                            <motion.label variants={itemVariants} className={checkboxLabel}><input type="checkbox" name="oirhonTogloomiinTalbai" checked={propertyData.oirhonTogloomiinTalbai} onChange={handleChange} className="hidden" />{propertyData.oirhonTogloomiinTalbai ? <CheckSquare className="text-zolGold" /> : <Square className="text-slate-400" />}<span>Тоглоомын талбай ойрхон</span></motion.label>
                        </div>
                        <motion.div variants={itemVariants} className="md:col-span-2"><label className={inputLabel}>Бусад онцлог (таслалаар тусгаарлана уу)</label><input name="features" value={propertyData.features} onChange={handleChange} placeholder="Гаражтай, Тагттай, 24 цагийн харуул хамгаалалттай..." className={inputStyle} /></motion.div>
                    </FormSection>
                    
                    <FormSection title="Зураг ба Видео">
                         {isEditMode && propertyToEdit.images?.length > 0 && (
                            <div className="md:col-span-2">
                                <label className={inputLabel}>Одоо байгаа зургууд</label>
                                <div className="p-3 border rounded-lg bg-slate-50 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                    {propertyToEdit.images.map((url, index) => (
                                        <div key={index} className="relative"><Image src={url} alt={`Одоо байгаа зураг ${index + 1}`} width={112} height={112} className="h-24 w-24 rounded-md object-cover" /></div>
                                    ))}
                                </div>
                            </div>
                        )}
                        <motion.div variants={itemVariants} className="md:col-span-2">
                            <label htmlFor="image-upload" className="cursor-pointer">
                                <div className="mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-6 py-10 bg-white hover:border-zolGold transition-colors">
                                    <UploadCloud className="mx-auto h-12 w-12 text-slate-400" />
                                    <span className="mt-2 block text-sm font-semibold text-zolGreen">Шинэ зураг нэмэх</span>
                                    <span className="text-xs text-slate-500">PNG, JPG (10MB-аас бага)</span>
                                    <input id="image-upload" type="file" className="sr-only" multiple onChange={(e) => handleFileChange(e, setImages, 'зураг', 8)} accept="image/*" />
                                </div>
                            </label>
                        </motion.div>
                        <AnimatePresence>
                            {images.length > 0 && <div className="md:col-span-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">{images.map((file, index) => (<motion.div layout key={index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} className="relative group"><Image src={URL.createObjectURL(file)} alt={`preview ${index}`} width={112} height={112} className="h-24 w-24 rounded-md object-cover" /><button type="button" onClick={() => handleRemoveFile(index, setImages)} className="absolute -top-2 -right-2 h-6 w-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md"><X size={16} /></button></motion.div>))}</div>}
                        </AnimatePresence>
                    </FormSection>
                </motion.div>

                <motion.button type="submit" disabled={isSubmitting} className={submitButton} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} variants={itemVariants}>
                    {isSubmitting && <Loader className="animate-spin" />}
                    {isSubmitting ? "Хадгалж байна..." : (isEditMode ? "Өөрчлөлтийг хадгалах" : "Зар оруулах")}
                </motion.button>
            </motion.form>
        </div>
    ) : null;
};

export default ListPropertyPage;
