// components/SearchBar.jsx
'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// MODIFICATION: Component now accepts isOpen and onClose props
const SearchBar = ({ isOpen, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const searchRef = useRef(null); // Ref for the search bar container

    // MODIFICATION: Handle outside click to close the search bar
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
        // Navigate to the search results page
        router.push(`/search-results?q=${encodeURIComponent(searchTerm)}`);
        
        // Close the search bar after navigation
        setTimeout(() => {
            onClose();
            setIsLoading(false);
            setSearchTerm('');
        }, 300); // Give a small delay for navigation to start
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
                    {/* The ref is attached to the main container */}
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
                        
                        {/* The close button is now part of the search bar, but doesn't need to be inside the form */}
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