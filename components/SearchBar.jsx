'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Home, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, ease: "easeOut", duration: 0.6 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  },
};

const SearchBar = ({ onSearchComplete }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [propertyType, setPropertyType] = useState('All');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm) params.append('q', searchTerm);
    if (propertyType && propertyType !== 'All') params.append('type', propertyType);

    router.push(`/all-properties??${params.toString()}`);
    if (onSearchComplete) onSearchComplete();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-zolGreen p-6 md:p-8 rounded-xl shadow-2xl border border-zolGold/40"
    >
      <motion.form 
        onSubmit={handleSearch}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center"
      >
        {/* Keyword Input */}
        <motion.div variants={itemVariants} className="relative col-span-1 md:col-span-2 lg:col-span-2">
          <label htmlFor="search-term" className="sr-only">Хайх</label>
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zolGold" size={20} />
          <input
            type="text"
            id="search-term"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Хаяг, байршил, эсвэл түлхүүр үгээр хайх..."
            className="w-full h-14 bg-white/5 text-white placeholder:text-white/60 
                       border border-white/20 rounded-lg pl-12 pr-4 
                       focus:outline-none focus:ring-2 focus:ring-zolGold 
                       focus:border-zolGold/50 transition-all duration-300"
          />
        </motion.div>

        {/* Property Type Select */}
        <motion.div variants={itemVariants} className="relative col-span-1">
          <label htmlFor="property-type" className="sr-only">Төрөл</label>
          <Home className="absolute left-4 top-1/2 -translate-y-1/2 text-zolGold" size={20} />
          <select
            id="property-type"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full h-14 bg-white/5 text-white border border-white/20 
                       rounded-lg pl-12 pr-10 appearance-none cursor-pointer
                       focus:outline-none focus:ring-2 focus:ring-zolGold 
                       focus:border-zolGold/50 transition-all duration-300"
          >
            <option className="bg-zolGreen text-white" value="All">Бүх төрөл</option>
            <option className="bg-zolGreen text-white" value="House">Зуслан</option>
            <option className="bg-zolGreen text-white" value="Apartment">Орон сууц</option>
            <option className="bg-zolGreen text-white" value="Car">Автомашин</option>
            <option className="bg-zolGreen text-white" value="Barter">Бартер</option>
            <option className="bg-zolGreen text-white" value="Land">Газар</option>
          </select>
          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zolGold pointer-events-none" size={20} />
        </motion.div>

        {/* Search Button */}
        <motion.div variants={itemVariants}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 6px 18px rgba(0,0,0,0.25)" }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full h-14 bg-zolGold text-white font-semibold text-lg 
                       rounded-lg transition-all duration-300 shadow-md"
          >
            Хайх
          </motion.button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
};

export default SearchBar;
