// components/FilterBar.jsx
'use client'

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        status: 'all',
        minPrice: '',
        maxPrice: '',
        bedrooms: 'any',
        bathrooms: 'any',
    });

    const statusOptions = [
        { value: 'all', label: 'Бүгд' },
        { value: 'Зарагдана', label: 'Зарах' },
        { value: 'Түрээслүүлнэ', label: 'Түрээс' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };
    
    const handleStatusChange = (status) => {
        setFilters(prev => ({ ...prev, status }));
    };

    const handleApplyFilters = () => {
        onFilterChange(filters);
    };

    const inputStyle =
        "block w-full rounded-lg border border-gray-200 bg-white/60 backdrop-blur-sm shadow-sm focus:border-zolGold focus:ring-2 focus:ring-zolGold/60 sm:text-sm h-11 px-3 text-zolDark placeholder-gray-400 transition-all duration-200";

    const filterBarVariants = {
        hidden: { y: -30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.8, 0.25, 1],
                when: "beforeChildren",
                staggerChildren: 0.12,
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.45, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="relative bg-white/70 backdrop-blur-lg border border-gray-100 rounded-2xl shadow-xl p-6 md:p-8 mb-10"
            variants={filterBarVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Decorative subtle gold glow */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent)] rounded-2xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 items-end relative z-10">
                
                {/* Status */}
                <motion.div className="lg:col-span-1" variants={itemVariants}>
                    <label className="block text-sm font-semibold text-zolDark/80 mb-2">Төлөв</label>
                    <div className="flex rounded-lg overflow-hidden border border-gray-200">
                        {statusOptions.map((option) => (
                            <motion.button
                                key={option.value}
                                type="button"
                                onClick={() => handleStatusChange(option.value)}
                                className={`flex-1 py-2 px-4 text-sm font-medium transition-all duration-200 
                                    ${filters.status === option.value
                                        ? 'bg-zolGreen text-white shadow-inner'
                                        : 'bg-gray-50 hover:bg-zolGold/10 text-zolDark'}
                                `}
                                whileHover={{ y: -2 }}
                                transition={{ type: 'spring', stiffness: 250 }}
                            >
                                {option.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* Price */}
                <motion.div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6" variants={itemVariants}>
                    <div>
                        <label htmlFor="minPrice" className="block text-sm font-semibold text-zolDark/80 mb-2">Доод үнэ (₮)</label>
                        <input type="number" name="minPrice" id="minPrice" value={filters.minPrice} onChange={handleChange} className={inputStyle} placeholder="100,000" />
                    </div>
                    <div>
                        <label htmlFor="maxPrice" className="block text-sm font-semibold text-zolDark/80 mb-2">Дээд үнэ (₮)</label>
                        <input type="number" name="maxPrice" id="maxPrice" value={filters.maxPrice} onChange={handleChange} className={inputStyle} placeholder="500,000" />
                    </div>
                </motion.div>

                {/* Apply Button */}
                <motion.div className="lg:col-span-1" variants={itemVariants}>
                    <motion.button 
                        onClick={handleApplyFilters} 
                        className="w-full h-11 flex items-center justify-center gap-2 bg-zolGold text-black font-semibold py-2 px-4 rounded-lg shadow-md hover:shadow-lg hover:shadow-zolGold/30 transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    >
                        <Search size={18} />
                        Шүүх
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default FilterBar;
