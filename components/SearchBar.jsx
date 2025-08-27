// components/SearchBar.jsx
'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchRef = useRef(null); // SearchBar-ийн container-д зориулсан ref

    // Гадуур товших үед хаах логик
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);


    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) return;

        setIsLoading(true);
        
        // --- ЭНЭ ХЭСЭГТ ӨӨРЧЛӨЛТ ОРОВ ---
        // Тусдаа хуудас руу үсрэхийн оронд, одоогийн URL-г шинэчилнэ.
        // Энэ нь /all-properties хуудсыг дахин render хийж, шинэ `q` параметрийг ашиглахыг өдөөнө.
        router.push(`/all-properties?q=${encodeURIComponent(searchTerm)}`);
        
        // Хайлтын цонхыг хааж, утгыг цэвэрлэнэ
        setTimeout(() => {
            onClose();
            setIsLoading(false);
            setSearchTerm('');
        }, 300); // Шилжилт эхлэхэд бага зэрэг хугацаа өгөх
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-start justify-center pt-24 md:pt-32 p-4 bg-black/40 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        ref={searchRef}
                        className="relative w-full max-w-2xl"
                        initial={{ y: -50, scale: 0.95 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: -50, scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Хайх утгаа энд бичнэ үү..."
                                className="w-full h-16 pl-16 pr-16 rounded-full border-2 border-zolGold/30 bg-white text-lg text-zolDark shadow-2xl focus:outline-none focus:ring-4 focus:ring-zolGold/40 transition-all"
                                autoFocus
                            />
                            <div className="absolute left-6 top-1/2 -translate-y-1/2">
                                <Search size={24} className="text-gray-400" />
                            </div>
                            <button
                                type="submit"
                                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 rounded-full bg-zolGold text-white hover:bg-opacity-90 transition-transform hover:scale-110"
                                disabled={isLoading}
                                aria-label="Хайх"
                            >
                                {isLoading ? <Loader className="animate-spin" /> : <Search />}
                            </button>
                        </form>
                        
                        <button
                          onClick={onClose}
                          className="absolute -top-4 -right-4 h-10 w-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-black hover:rotate-90 transition-transform shadow-lg border"
                          aria-label="Хайх цонхыг хаах"
                        >
                            <X size={24} />
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default SearchBar;