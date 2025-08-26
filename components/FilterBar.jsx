// components/FilterBar.jsx
'use client'

import React, { useState } from 'react';
import { 
    Search, ChevronDown, CheckSquare, Square, Tag, MapPin, Banknote,
    BedDouble, Building, School, PlayCircle, Repeat, FileText 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Улаанбаатарын дүүргүүдийн жагсаалт
const ulaanbaatarDistricts = [
    "Багануур", "Багахангай", "Баянгол", "Баянзүрх",
    "Чингэлтэй", "Хан-Уул", "Налайх", "Сонгинохайрхан", "Сүхбаатар"
];

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        status: 'all',
        minPrice: '',
        maxPrice: '',
        duureg: 'all',
        roomCount: '',
        davhar: '',
        surguuli: false,
        oirhonTogloomiinTalbai: false,
        zeel: false,
        lizing: false,
        barter: false,
    });
    
    const [showAdvanced, setShowAdvanced] = useState(false);

    const statusOptions = [
        { value: 'all', label: 'Бүгд' },
        { value: 'Зарагдана', label: 'Зарах' },
        { value: 'Түрээслүүлнэ', label: 'Түрээс' }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };
    
    const handleStatusChange = (status) => {
        setFilters(prev => ({ ...prev, status }));
    };

    const handleApplyFilters = () => {
        // Энэ функц нь parent component-руу шүүлтүүрийн state-г дамжуулна
        onFilterChange(filters);
    };

    // --- Reusable Styles ---
    const inputStyle = "block w-full rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm shadow-sm focus:border-zolGold focus:ring-2 focus:ring-zolGold/60 sm:text-sm h-11 px-3 text-zolDark placeholder-gray-400 transition-all duration-200";
    const labelStyle = "flex items-center gap-2 text-sm font-semibold text-zolDark/90 mb-2";
    const checkboxLabelStyle = "flex items-center gap-2 text-sm font-medium text-zolDark/80 cursor-pointer select-none transition-colors hover:text-zolDark";

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.07 } }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <motion.div
            className="relative bg-white/70 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-xl p-6 md:p-8 mb-10"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
                {/* Status */}
                <motion.div className="lg:col-span-1" variants={itemVariants}>
                    <label className={labelStyle}><Tag size={16} className="text-zolGreen" /><span>Төлөв</span></label>
                    <div className="flex rounded-lg overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">{statusOptions.map((option) => (<button key={option.value} type="button" onClick={() => handleStatusChange(option.value)} className={`flex-1 py-2 px-3 text-sm font-medium transition-colors duration-200 ${filters.status === option.value ? 'bg-zolGreen text-white' : 'hover:bg-zolGold/10'}`}>{option.label}</button>))}</div>
                </motion.div>

                {/* District */}
                <motion.div className="lg:col-span-1" variants={itemVariants}>
                    <label htmlFor="duureg" className={labelStyle}><MapPin size={16} className="text-zolGreen"/><span>Дүүрэг</span></label>
                    <select id="duureg" name="duureg" value={filters.duureg} onChange={handleChange} className={inputStyle}>
                        <option value="all">Бүх дүүрэг</option>
                        {ulaanbaatarDistricts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                </motion.div>

                {/* Price Range */}
                <motion.div className="lg:col-span-2 grid grid-cols-2 gap-6" variants={itemVariants}>
                    <div>
                        <label htmlFor="minPrice" className={labelStyle}><Banknote size={16} className="text-zolGreen" /><span>Доод үнэ (₮)</span></label>
                        <input type="number" name="minPrice" id="minPrice" value={filters.minPrice} onChange={handleChange} className={inputStyle} placeholder="100,000" />
                    </div>
                    <div>
                        <label htmlFor="maxPrice" className={labelStyle}><Banknote size={16} className="text-zolGreen" /><span>Дээд үнэ (₮)</span></label>
                        <input type="number" name="maxPrice" id="maxPrice" value={filters.maxPrice} onChange={handleChange} className={inputStyle} placeholder="500,000,000" />
                    </div>
                </motion.div>
                
                {/* Apply Button */}
                <motion.div className="lg:col-span-1" variants={itemVariants}>
                     <button onClick={handleApplyFilters} className="w-full h-11 flex items-center justify-center gap-2 bg-zolGold text-black font-semibold rounded-lg shadow-md hover:bg-zolGold/90 transition-all transform hover:-translate-y-0.5">
                        <Search size={18} /> Шүүх
                    </button>
                </motion.div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="mt-6 text-center">
                <button onClick={() => setShowAdvanced(!showAdvanced)} className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold text-zolGreen hover:text-zolGold transition-colors">
                    Нэмэлт шүүлтүүр
                    <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.3 }}>
                        <ChevronDown size={18} />
                    </motion.div>
                </button>
            </div>

            {/* Advanced Filters Section */}
            <AnimatePresence>
                {showAdvanced && (
                    <motion.div
                        className="mt-6 pt-6 border-t grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 items-start"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.2, 1, 0.2, 1] }}
                    >
                        {/* Room Count & Floor */}
                        <div>
                            <label htmlFor="roomCount" className={labelStyle}><BedDouble size={16} className="text-zolGreen" /><span>Өрөөний тоо</span></label>
                            <input type="number" name="roomCount" id="roomCount" value={filters.roomCount} onChange={handleChange} className={inputStyle} placeholder="3" />
                        </div>
                        <div>
                            <label htmlFor="davhar" className={labelStyle}><Building size={16} className="text-zolGreen" /><span>Давхар</span></label>
                            <input type="number" name="davhar" id="davhar" value={filters.davhar} onChange={handleChange} className={inputStyle} placeholder="5" />
                        </div>

                        {/* Checkboxes Group */}
                        <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6">
                            <label className={checkboxLabelStyle}>
                                <input type="checkbox" name="surguuli" checked={filters.surguuli} onChange={handleChange} className="hidden" />
                                {filters.surguuli ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-300" />}
                                <School size={16} className="text-zolDark/80" />
                                <span className={filters.surguuli ? 'text-zolDark' : ''}>Сургууль</span>
                            </label>
                             <label className={checkboxLabelStyle}>
                                <input type="checkbox" name="oirhonTogloomiinTalbai" checked={filters.oirhonTogloomiinTalbai} onChange={handleChange} className="hidden" />
                                {filters.oirhonTogloomiinTalbai ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-300" />}
                                <PlayCircle size={16} className="text-zolDark/80" />
                                <span className={filters.oirhonTogloomiinTalbai ? 'text-zolDark' : ''}>Талбайтай</span>
                            </label>
                            <label className={checkboxLabelStyle}>
                                <input type="checkbox" name="zeel" checked={filters.zeel} onChange={handleChange} className="hidden" />
                                {filters.zeel ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-300" />}
                                <Banknote size={16} className="text-zolDark/80" />
                                <span className={filters.zeel ? 'text-zolDark' : ''}>Зээл</span>
                            </label>
                            <label className={checkboxLabelStyle}>
                                <input type="checkbox" name="lizing" checked={filters.lizing} onChange={handleChange} className="hidden" />
                                {filters.lizing ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-300" />}
                                <FileText size={16} className="text-zolDark/80" />
                                <span className={filters.lizing ? 'text-zolDark' : ''}>Лизинг</span>
                            </label>
                             <label className={checkboxLabelStyle}>
                                <input type="checkbox" name="barter" checked={filters.barter} onChange={handleChange} className="hidden" />
                                {filters.barter ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-300" />}
                                <Repeat size={16} className="text-zolDark/80" />
                                <span className={filters.barter ? 'text-zolDark' : ''}>Бартер</span>
                            </label>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FilterBar;