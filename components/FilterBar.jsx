'use client'

import React, { useState } from 'react';
import { Search } from 'lucide-react';

const FilterBar = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        status: 'all', // 'all', 'For Sale', 'For Rent'
        minPrice: '',
        maxPrice: '',
        bedrooms: 'any', // 'any', '1', '2', '3', '4', '5+'
        bathrooms: 'any', // 'any', '1', '2', '3', '4', '5+'
    });

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

    // Reusable style for input and select fields
    const inputStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-zolGold focus:ring-zolGold sm:text-sm h-11 px-3 transition-colors duration-200";

    return (
        <div className="bg-white p-5 rounded-xl shadow-lg mb-8 border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                
                {/* Байрны төлөв */}
                <div className="lg:col-span-1">
                    <label className="block text-sm font-medium text-zolDark/80 mb-2">Төлөв</label>
                    <div className="flex rounded-md">
                        <button type="button" onClick={() => handleStatusChange('all')} className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 rounded-l-md border ${filters.status === 'all' ? 'bg-zolGreen text-white border-zolGreen' : 'bg-gray-100 text-zolDark hover:bg-zolGold/10 hover:border-zolGold/50 border-gray-200'}`}>Бүгд</button>
                        <button type="button" onClick={() => handleStatusChange('For Sale')} className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 border-t border-b ${filters.status === 'For Sale' ? 'bg-zolGreen text-white border-zolGreen' : 'bg-gray-100 text-zolDark hover:bg-zolGold/10 hover:border-zolGold/50 border-gray-200'}`}>Зарах</button>
                        <button type="button" onClick={() => handleStatusChange('For Rent')} className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 rounded-r-md border ${filters.status === 'For Rent' ? 'bg-zolGreen text-white border-zolGreen' : 'bg-gray-100 text-zolDark hover:bg-zolGold/10 hover:border-zolGold/50 border-gray-200'}`}>Түрээс</button>
                    </div>
                </div>

                {/* Үнэ */}
                <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="minPrice" className="block text-sm font-medium text-zolDark/80 mb-2">Доод үнэ (₮)</label>
                        <input type="number" name="minPrice" id="minPrice" value={filters.minPrice} onChange={handleChange} className={inputStyle} placeholder="100,000" />
                    </div>
                    <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-zolDark/80 mb-2">Дээд үнэ (₮)</label>
                        <input type="number" name="maxPrice" id="maxPrice" value={filters.maxPrice} onChange={handleChange} className={inputStyle} placeholder="500,000" />
                    </div>
                </div>

                {/* Өрөө ба угаалгын өрөө */}
                <div className="lg:col-span-1 grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-zolDark/80 mb-2">Унтлагын</label>
                        <select name="bedrooms" id="bedrooms" value={filters.bedrooms} onChange={handleChange} className={inputStyle}>
                            <option value="any">Бүгд</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option><option value="5">5+</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-zolDark/80 mb-2">Угаалгын</label>
                        <select name="bathrooms" id="bathrooms" value={filters.bathrooms} onChange={handleChange} className={inputStyle}>
                            <option value="any">Бүгд</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option><option value="5">5+</option>
                        </select>
                    </div>
                </div>

                {/* Хайх Товчлуур */}
                <div className="lg:col-span-1">
                    <button 
                        onClick={handleApplyFilters} 
                        className="w-full h-11 flex items-center justify-center gap-2 bg-zolGold text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 transition-all duration-300 transform hover:scale-[1.03] shadow-sm"
                    >
                        <Search size={18} />
                        Шүүх
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;