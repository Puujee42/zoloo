'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
// --- ChevronDown icon нэмэгдсэн ---
import { Search, Home, ChevronDown } from 'lucide-react';

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

    if (onSearchComplete) {
      onSearchComplete();
    }
  };

  return (
    // --- 1. Дэвсгэр болон хүрээг шинэчилсэн ---
    <div className="bg-zolGreen p-6 md:p-8 rounded-xl shadow-2xl border border-zolGold/40">
      <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
        
        {/* Keyword Input */}
        <div className="relative col-span-1 md:col-span-2 lg:col-span-2">
          <label htmlFor="search-term" className="sr-only">Хайх</label>
          {/* --- 2. Icon-ы өнгийг zolGold болгосон --- */}
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zolGold" size={20} />
          <input
            type="text"
            id="search-term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Хаяг, байршил, эсвэл түлхүүр үгээр хайх..."
            className="w-full h-14 bg-white/5 text-white placeholder:text-white/60 border border-white/20 rounded-lg pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-zolGold focus:border-zolGold/50 transition-colors"
          />
        </div>

        {/* Property Type Select */}
        <div className="relative col-span-1">
          <label htmlFor="property-type" className="sr-only">Төрөл</label>
          <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-zolGold" size={20} />
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full h-14 bg-white/5 text-white border border-white/20 rounded-lg pl-12 pr-10 appearance-none focus:outline-none focus:ring-2 focus:ring-zolGold focus:border-zolGold/50 cursor-pointer transition-colors"
          >
            <option className="bg-zolGreen text-white" value="All">Бүх төрөл</option>
            <option className="bg-zolGreen text-white" value="House">Зуслан</option>
            <option className="bg-zolGreen text-white" value="Apartment">Орон сууц</option>
            <option className="bg-zolGreen text-white" value="Car">Автомашин</option>
            <option className="bg-zolGreen text-white" value="Barter">Бартер</option>
            <option className="bg-zolGreen text-white" value="Land">Газар</option>
          </select>
          {/* --- 3. Custom dropdown сум нэмсэн --- */}
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zolGold pointer-events-none" size={20} />
        </div>

        {/* Search Button */}
        {/* --- 4. Хайх товчлуурыг шинэчилсэн --- */}
        <button
          type="submit"
          className="col-span-1 h-14 bg-zolGold text-white font-semibold text-lg rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-[1.03] shadow-md"
        >
          Хайх
        </button>
      </form>
    </div>
  );
};

export default SearchBar;