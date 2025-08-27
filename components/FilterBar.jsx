'use client'

import React, { useState, useEffect } from 'react';
import { 
  Search, ChevronDown, CheckSquare, Square, Tag, MapPin, Banknote,
  BedDouble, Building, School, PlayCircle, Repeat, FileText, ListFilter, LandPlot 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Улаанбаатарын дүүргүүдийн жагсаалт
const ulaanbaatarDistricts = [
  "Багануур", "Багахангай", "Баянгол", "Баянзүрх",
  "Чингэлтэй", "Хан-Уул", "Налайх", "Сонгинохайрхан", "Сүхбаатар"
];

const FilterBar = ({ onFilterChange, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    q: '',
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
    type: initialFilters.type || 'all',
    minArea: '',
    maxArea: '',
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  useEffect(() => {
    if (initialFilters.type) {
      setFilters(prev => ({ ...prev, type: initialFilters.type }));
    }
  }, [initialFilters.type]);

  const statusOptions = [
    { value: 'all', label: 'Бүгд' },
    { value: 'Зарагдана', label: 'Зарах' },
    { value: 'Түрээслүүлнэ', label: 'Түрээс' }
  ];

  const typeOptions = [
    { value: 'all', label: 'Бүх төрөл' },
    { value: 'Apartment', label: 'Орон сууц' },
    { value: 'House', label: 'Зуслангийн байшин' },
    { value: 'Land', label: 'Газар' },
    { value: 'Car', label: 'Автомашин' },
    { value: 'Barter', label: 'Бартер' }
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
    onFilterChange(filters);
  };

  // --- Reusable Styles ---
  const inputStyle = "block w-full rounded-xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-sm focus:border-zolGold focus:ring-2 focus:ring-zolGold/50 sm:text-sm h-11 px-3 text-zolDark placeholder-gray-400 transition-all duration-200";
  const labelStyle = "flex items-center gap-2 text-sm font-semibold text-zolDark/90 mb-2";
  const checkboxLabelStyle = "flex items-center gap-2 text-sm font-medium text-zolDark/80 cursor-pointer select-none transition-all hover:text-zolDark";

  return (
    <motion.div
      className="relative bg-white/60 backdrop-blur-xl border border-gray-100 rounded-2xl shadow-lg p-6 md:p-8 mb-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-8 gap-6 items-end">
        
        {/* Search */}
        <div className="lg:col-span-2">
          <label htmlFor="q" className={labelStyle}>
            <Search size={16} className="text-zolGreen" /> Хайх
          </label>
          <input type="text" name="q" id="q" value={filters.q} 
            onChange={handleChange} className={inputStyle} 
            placeholder="3 өрөө байр..." />
        </div>

        {/* Status */}
        <div className="lg:col-span-1">
          <label className={labelStyle}><Tag size={16} className="text-zolGreen" /> Төлөв</label>
          <div className="flex rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm">
            {statusOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleStatusChange(option.value)}
                className={`flex-1 py-2 px-3 text-sm font-medium transition-colors duration-200 
                  ${filters.status === option.value ? 'bg-zolGreen text-white' : 'hover:bg-zolGold/10'}`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className="lg:col-span-1">
          <label htmlFor="type" className={labelStyle}><ListFilter size={16} className="text-zolGreen"/> Төрөл</label>
          <select id="type" name="type" value={filters.type} onChange={handleChange} className={inputStyle}>
            {typeOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        {/* District */}
        <div className="lg:col-span-1">
          <label htmlFor="duureg" className={labelStyle}><MapPin size={16} className="text-zolGreen"/> Дүүрэг</label>
          <select id="duureg" name="duureg" value={filters.duureg} onChange={handleChange} className={inputStyle}>
            <option value="all">Бүх дүүрэг</option>
            {ulaanbaatarDistricts.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {/* Price Range */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="minPrice" className={labelStyle}><Banknote size={16} className="text-zolGreen" /> Доод үнэ</label>
            <input type="number" name="minPrice" id="minPrice" value={filters.minPrice} onChange={handleChange} className={inputStyle} placeholder="₮100,000" />
          </div>
          <div>
            <label htmlFor="maxPrice" className={labelStyle}><Banknote size={16} className="text-zolGreen" /> Дээд үнэ</label>
            <input type="number" name="maxPrice" id="maxPrice" value={filters.maxPrice} onChange={handleChange} className={inputStyle} placeholder="₮500 сая" />
          </div>
        </div>

        {/* Apply Button */}
        <div className="lg:col-span-1">
          <button 
            onClick={handleApplyFilters} 
            className="w-full h-11 flex items-center justify-center gap-2 bg-gradient-to-r from-zolGold to-yellow-400 text-black font-semibold rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
          >
            <Search size={18} /> Шүүх
          </button>
        </div>
      </div>

      {/* Advanced Toggle */}
      <div className="mt-6 text-center">
        <button onClick={() => setShowAdvanced(!showAdvanced)} 
          className="flex items-center justify-center gap-2 mx-auto text-sm font-semibold text-zolGreen hover:text-zolGold transition-colors">
          Нэмэлт шүүлтүүр
          <motion.div animate={{ rotate: showAdvanced ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown size={18} />
          </motion.div>
        </button>
      </div>

      {/* Advanced Section */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div
            className="mt-6 pt-6 border-t grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 items-start"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.2, 1, 0.2, 1] }}
          >
            {/* Area Range */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="minArea" className={labelStyle}><LandPlot size={16} className="text-zolGreen" /> Доод (м²)</label>
                <input type="number" name="minArea" id="minArea" value={filters.minArea} onChange={handleChange} className={inputStyle} placeholder="50" />
              </div>
              <div>
                <label htmlFor="maxArea" className={labelStyle}><LandPlot size={16} className="text-zolGreen" /> Дээд (м²)</label>
                <input type="number" name="maxArea" id="maxArea" value={filters.maxArea} onChange={handleChange} className={inputStyle} placeholder="120" />
              </div>
            </div>

            {/* Room Count & Floor */}
            <div>
              <label htmlFor="roomCount" className={labelStyle}><BedDouble size={16} className="text-zolGreen" /> Өрөөний тоо</label>
              <input type="number" name="roomCount" id="roomCount" value={filters.roomCount} onChange={handleChange} className={inputStyle} placeholder="3" />
            </div>
            <div>
              <label htmlFor="davhar" className={labelStyle}><Building size={16} className="text-zolGreen" /> Давхар</label>
              <input type="number" name="davhar" id="davhar" value={filters.davhar} onChange={handleChange} className={inputStyle} placeholder="5" />
            </div>

            {/* Checkboxes */}
            <div className="md:col-span-4 lg:col-span-4 mt-4 pt-4 border-t grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-6">
              {[
                { key: 'surguuli', label: 'Сургууль', icon: <School size={16} /> },
                { key: 'oirhonTogloomiinTalbai', label: 'Талбайтай', icon: <PlayCircle size={16} /> },
                { key: 'zeel', label: 'Зээл', icon: <Banknote size={16} /> },
                { key: 'lizing', label: 'Лизинг', icon: <FileText size={16} /> },
                { key: 'barter', label: 'Бартер', icon: <Repeat size={16} /> },
              ].map(({ key, label, icon }) => (
                <label key={key} className={checkboxLabelStyle}>
                  <input type="checkbox" name={key} checked={filters[key]} onChange={handleChange} className="hidden" />
                  {filters[key] ? <CheckSquare className="text-zolGold" /> : <Square className="text-gray-300" />}
                  <span className="flex items-center gap-1">{icon} {label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FilterBar;
