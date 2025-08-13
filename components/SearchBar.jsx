'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, MapPin, Building, DollarSign, Home } from 'lucide-react';

// Add the 'onSearchComplete' prop
const SearchBar = ({ onSearchComplete }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (searchTerm) params.append('q', searchTerm);
    if (propertyType && propertyType !== 'All') params.append('type', propertyType);
    
    router.push(`/search?${params.toString()}`);

    // Call the callback function if it exists
    if (onSearchComplete) {
      onSearchComplete();
    }
  };

  return (
    <div className="bg-green-900 p-6 md:p-8 rounded-xl shadow-2xl border border-yellow-400/30">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
        
        {/* Keyword Input */}
        <div className="relative col-span-1 md:col-span-2 lg:col-span-2">
          <label htmlFor="search-term" className="sr-only">Хайх</label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400" size={20} />
          <input
            type="text"
            id="search-term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Хаяг, байршил, эсвэл түлхүүр үгээр хайх..."
            className="w-full h-14 bg-white/10 text-white placeholder:text-gray-400 border border-gray-600 rounded-lg pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Property Type Select */}
        <div className="relative col-span-1">
          <label htmlFor="property-type" className="sr-only">Төрөл</label>
          <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-400" size={20} />
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full h-14 bg-white/10 text-white border border-gray-600 rounded-lg pl-12 pr-4 appearance-none focus:outline-none focus:ring-2 focus:ring-yellow-400 cursor-pointer"
          >
            <option value="All">Бүх төрөл</option>
            <option value="House">Зуслан</option>
            <option value="Apartment">Орон сууц</option>
            <option value="Car">Автомашин</option>
            <option value="Barter">Бартер</option>
            <option value="Land">Газар</option>
          </select>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="col-span-1 h-14 bg-yellow-400 text-black font-bold text-lg rounded-lg hover:bg-yellow-500 transition-colors transform hover:scale-105"
        >
          Хайх
        </button>
      </form>
    </div>
  );
};

export default SearchBar;