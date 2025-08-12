'use client'

import React, { useState } from 'react';
import { SlidersHorizontal, Search, DollarSign, BedDouble, Bath } from 'lucide-react';

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

    return (
        <div className="bg-white p-4 rounded-lg shadow-md mb-8 border">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                {/* Байрны төлөв */}
                <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Төлөв</label>
                    <div className="flex rounded-md shadow-sm">
                        <button type="button" onClick={() => handleStatusChange('all')} className={`flex-1 py-2 px-4 text-sm font-medium ${filters.status === 'all' ? 'bg-green text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 rounded-l-md`}>Бүгд</button>
                        <button type="button" onClick={() => handleStatusChange('For Sale')} className={`flex-1 py-2 px-4 text-sm font-medium ${filters.status === 'For Sale' ? 'bg-green text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border-t border-b border-gray-300`}>Зарах</button>
                        <button type="button" onClick={() => handleStatusChange('For Rent')} className={`flex-1 py-2 px-4 text-sm font-medium ${filters.status === 'For Rent' ? 'bg-green text-white' : 'bg-white text-gray-700 hover:bg-gray-50'} border border-gray-300 rounded-r-md`}>Түрээслэх</button>
                    </div>
                </div>

                {/* Үнэ */}
                <div className="md:col-span-2 grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Хамгийн бага үнэ</label>
                        <input type="number" name="minPrice" id="minPrice" value={filters.minPrice} onChange={handleChange} className="mt-1 input-style" placeholder="ж: 100,000" />
                    </div>
                    <div>
                        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Хамгийн их үнэ</label>
                        <input type="number" name="maxPrice" id="maxPrice" value={filters.maxPrice} onChange={handleChange} className="mt-1 input-style" placeholder="ж: 500,000" />
                    </div>
                </div>

                {/* Өрөө ба угаалгын өрөө */}
                <div className="md:col-span-1 grid grid-cols-2 gap-2">
                    <div>
                        <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700">Унтлагын өрөө</label>
                        <select name="bedrooms" id="bedrooms" value={filters.bedrooms} onChange={handleChange} className="mt-1 input-style">
                            <option value="any">Ямар ч</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option><option value="5">5+</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700">Угаалгын өрөө</label>
                        <select name="bathrooms" id="bathrooms" value={filters.bathrooms} onChange={handleChange} className="mt-1 input-style">
                            <option value="any">Ямар ч</option><option value="1">1+</option><option value="2">2+</option><option value="3">3+</option><option value="4">4+</option><option value="5">5+</option>
                        </select>
                    </div>
                </div>

                {/* Apply Button */}
                <div className="md:col-span-1">
                    <button onClick={handleApplyFilters} className="w-full flex items-center justify-center gap-2 bg-gold text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                        <Search size={18} />
                        Хайх
                    </button>
                </div>
            </div>
            <style jsx>{`
                .input-style {
                    @apply block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-10 px-2;
                }
            `}</style>
        </div>
    );
};

export default FilterBar;