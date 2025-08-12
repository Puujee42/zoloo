// components/Navbar.jsx

'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import { assets } from "@/assets/assets";
// Import modern icons
import { Home, Building2, Heart, LayoutDashboard, ChevronDown, Map, PlusCircle } from "lucide-react";

const Navbar = () => {
  const { isSeller, router, user, isLoading } = useAppContext();
  const { openSignIn } = useClerk();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const propertyTypes = [
    { name: 'Байшин', path: '/all-properties?type=House' },
    { name: 'Орон сууц', path: '/all-properties?type=Apartment' },
    { name: 'Кондо', path: '/all-properties?type=Condo' },
    { name: 'Вилла', path: '/all-properties?type=Villa' },
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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // A simple skeleton loader can be used while authenticating
  if (isLoading) {
    return (
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 border-b bg-white">
        <div className="h-8 w-32 bg-gray-200 rounded-md animate-pulse"></div>
        <div className="flex items-center gap-8">
          <div className="h-5 w-16 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-5 w-24 bg-gray-200 rounded-md animate-pulse"></div>
          <div className="h-5 w-20 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
        <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse"></div>
      </nav>
    );
  }

  return (
    // --- 1. Main Navbar: Clean white background with a subtle border ---
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 py-4 border-b border-gray-200 bg-white text-green-900 sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <Image
          className="cursor-pointer w-28 md:w-32"
          src={assets.logo}
          alt="logo"
          width={128}
          height={40}
        />
      </Link>

      {/* --- 2. Desktop Navigation: Rich green text with gold hover effect --- */}
      <div className="hidden lg:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-yellow-500 transition-colors">
          Нүүр
        </Link>
        
        {/* Properties Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="flex items-center gap-1 hover:text-yellow-500 transition-colors"
          >
            Үл хөдлөх
            <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>
          {isDropdownOpen && (
            // --- 3. Dropdown Menu: Styled with gold hover effects ---
            <div className="absolute top-full mt-3 w-48 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-100">
              <Link href="/all-properties" className="block px-4 py-2 text-sm font-bold text-green-800 hover:bg-yellow-50 hover:text-yellow-600" onClick={() => setIsDropdownOpen(false)}>
                  Бүх үл хөдлөх
              </Link>
              <div className="h-px bg-gray-200 my-1"></div>
              {propertyTypes.map((type) => (
                <Link key={type.name} href={type.path} className="block px-4 py-2 text-sm text-gray-600 hover:bg-yellow-50 hover:text-yellow-600" onClick={() => setIsDropdownOpen(false)}>
                  {type.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <Link href="/about" className="hover:text-yellow-500 transition-colors">
          Бидний тухай
        </Link>
        <Link href="/contact" className="hover:text-yellow-500 transition-colors">
          Холбоо барих
        </Link>
        <Link href="/map-view" className="flex items-center gap-2 hover:text-yellow-500 transition-colors">
          <Map size={16} />
          Газрын зураг
        </Link>
      </div>

      {/* --- 4. User Actions: Branded buttons for better UX --- */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            {isSeller && (
              <button
                onClick={() => router.push('/seller')}
                // --- 5. Seller Button: Styled as a secondary action ---
                className="hidden sm:flex items-center gap-2 text-sm border-2 border-green-800 text-green-800 px-4 py-2 rounded-full hover:bg-green-800 hover:text-white font-semibold transition-colors"
              >
                <LayoutDashboard size={16} />
                Худалдагчийн самбар
              </button>
            )}
            <UserButton afterSignOutUrl="/" />
          </>
        ) : (
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={openSignIn}
              className="text-sm font-semibold text-green-800 hover:text-yellow-600 transition-colors"
            >
              Нэвтрэх
            </button>
            <button
              onClick={() => openSignIn({ redirectUrl: '/submit-property' })}
              // --- 6. "Submit Property" Button: Styled as a primary CTA ---
              className="flex items-center gap-2 text-sm bg-yellow-400 text-black font-bold px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors transform hover:scale-105"
            >
              <PlusCircle size={16} />
              Зар оруулах
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;