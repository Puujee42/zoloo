'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import { assets } from "@/assets/assets";
// --- 1. Import Search and X icons ---
import { Home, Building2, Heart, LayoutDashboard, ChevronDown, Map, PlusCircle, Search, X } from "lucide-react";
// --- 2. Import the SearchBar component ---
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isSeller, router, user, isLoading } = useAppContext();
  const { openSignIn } = useClerk();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  // --- 3. Add state to control the search modal's visibility ---
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const propertyTypes = [
    { name: ' Зуслан ', path: '/all-properties?type=House' },
    { name: 'Орон сууц', path: '/all-properties?type=Apartment' },
    { name: ' Автомашин ', path: '/all-properties?type=Car' },
    { name: ' Бартер ', path: '/all-properties?type=Barter' },
    { name: 'Газрын талбай', path: '/all-properties?type=Land' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  // --- 4. Effect to handle 'Escape' key and body scroll for the modal ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsSearchOpen(false);
    };
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  if (isLoading) {
    // Skeleton loader remains the same
    return <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 border-b bg-white animate-pulse">...</nav>;
  }

  return (
    // --- 5. Wrap everything in a React Fragment to accommodate the modal at the same level ---
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 border-b border-gray-200 bg-white text-green-900 sticky top-0 z-40">
        <Link href="/">
          <Image className="cursor-pointer w-28 md:w-32" src={assets.logo} alt="logo" width={128} height={40}/>
        </Link>

        <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="hover:text-yellow-500 transition-colors">Нүүр</Link>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(p => !p)} className="flex items-center gap-1 hover:text-yellow-500 transition-colors">
              Үл хөдлөх <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-3 w-48 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-100">
                <Link href="/all-properties" className="block px-4 py-2 text-sm font-bold text-green-800 hover:bg-yellow-50 hover:text-yellow-600" onClick={() => setIsDropdownOpen(false)}>Бүх үл хөдлөх</Link>
                <div className="h-px bg-gray-200 my-1"></div>
                {propertyTypes.map((type) => (
                  <Link key={type.name} href={type.path} className="block px-4 py-2 text-sm text-gray-600 hover:bg-yellow-50 hover:text-yellow-600" onClick={() => setIsDropdownOpen(false)}>{type.name}</Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className="hover:text-yellow-500 transition-colors">Бидний тухай</Link>
          <Link href="/contact" className="hover:text-yellow-500 transition-colors">Холбоо барих</Link>
        </div>

        <div className="flex items-center gap-3">
          {/* --- 6. Add the Search Button --- */}
          <button onClick={() => setIsSearchOpen(true)} className="p-2 rounded-full hover:bg-yellow-400/20 text-green-800 hover:text-yellow-600 transition-colors">
            <Search size={20} />
          </button>
          
          {user ? (
            <>
              {isSeller && (
                <button onClick={() => router.push('/seller')} className="hidden sm:flex items-center gap-2 text-sm border-2 border-green-800 text-green-800 px-4 py-2 rounded-full hover:bg-green-800 hover:text-white font-semibold transition-colors">
                  <LayoutDashboard size={16} /> Худалдагчийн самбар
                </button>
              )}
              <UserButton afterSignOutUrl="/" />
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <button onClick={openSignIn} className="text-sm font-semibold text-green-800 hover:text-yellow-600 transition-colors">Нэвтрэх</button>
              <button onClick={() => openSignIn({ redirectUrl: '/submit-property' })} className="flex items-center gap-2 text-sm bg-yellow-400 text-black font-bold px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors transform hover:scale-105">
                <PlusCircle size={16} /> Зар оруулах
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* --- 7. The Search Modal --- */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 md:pt-32 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)} // Close when clicking the backdrop
        >
          <div 
            className="relative w-full max-w-4xl p-4 bg-transparent"
            onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
          >
            <SearchBar onSearchComplete={() => setIsSearchOpen(false)} />
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-0 right-4 sm:right-0 text-white bg-green-800 rounded-full p-2 hover:bg-yellow-500 hover:text-black transition-colors"
              aria-label="Хайх цонхыг хаах"
            >
              <X size={24} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;