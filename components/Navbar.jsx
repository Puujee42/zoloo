'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import { assets } from "@/assets/assets";
// Import modern icons
import { Home, Building2, Heart, LayoutDashboard, ChevronDown } from "lucide-react";

const Navbar = () => {
  const { isSeller, router, user, isLoading } = useAppContext();
  const { openSignIn } = useClerk();

  // State to manage the visibility of the properties dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  // Ref to the dropdown container to detect outside clicks
  const dropdownRef = useRef(null);

  const propertyTypes = [
    { name: 'Houses', path: '/all-properties?type=House' },
    { name: 'Apartments', path: '/all-properties?type=Apartment' },
    { name: 'Condos', path: '/all-properties?type=Condo' },
    { name: 'Villas', path: '/all-properties?type=Villa' },
    { name: 'Land', path: '/all-properties?type=Land' },
  ];

  // Effect to handle clicks outside of the dropdown menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    // Add the event listener to the whole document
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  // Loading skeleton state
  if (isLoading) {
    return (
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 border-b border-gray-200 bg-white">
        <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
        <div className="hidden md:flex items-center gap-8">
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-9 bg-gray-200 rounded-md w-20 animate-pulse"></div>
          <div className="h-9 bg-gray-200 rounded-md w-24 animate-pulse"></div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-4 border-b border-gray-200 bg-white text-gray-800">
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
        width={128}
        height={40}
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <Link href="/" className="hover:text-blue-600 transition-colors">
          Home
        </Link>
        
        {/* --- CLICK-BASED PROPERTIES DROPDOWN --- */}
        <div 
          className="relative"
          ref={dropdownRef} // Attach the ref to the dropdown container
        >
          {/* This button toggles the dropdown's visibility */}
          <button 
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="flex items-center gap-1 hover:text-blue-600 transition-colors"
          >
            Properties
            <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Conditionally render the dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10 border border-gray-100">
              <Link 
                  href="/all-properties" 
                  className="block px-4 py-2 text-sm font-bold text-gray-800 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  All Properties
                </Link>
                <div className="h-px bg-gray-200 my-1"></div>
              {propertyTypes.map((type) => (
                <Link 
                  key={type.name} 
                  href={type.path} 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  {type.name}
                </Link>
              ))}
            </div>
          )}
        </div>
        {/* --- END OF DROPDOWN --- */}

        <Link href="/about" className="hover:text-blue-600 transition-colors">
          About Us
        </Link>
        <Link href="/contact" className="hover:text-blue-600 transition-colors">
          Contact
        </Link>
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            {isSeller && (
              <button
                onClick={() => router.push('/seller')}
                className="hidden sm:flex items-center gap-2 text-sm border border-gray-300 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <LayoutDashboard size={16} />
                Seller Dashboard
              </button>
            )}
            <UserButton afterSignOutUrl="/">
              <UserButton.MenuItems>
                <UserButton.Action 
                  label="Home" 
                  labelIcon={<Home className="h-4 w-4"/>}
                  onClick={() => router.push('/')} 
                />
                <UserButton.Action 
                  label="All Properties" 
                  labelIcon={<Building2 className="h-4 w-4"/>}
                  onClick={() => router.push('/all-properties')} 
                />
                <UserButton.Action 
                  label="My Favorites" 
                  labelIcon={<Heart className="h-4 w-4"/>}
                  onClick={() => router.push('/favorites')} 
                />
                {isSeller && (
                  <UserButton.Action 
                    label="Seller Dashboard" 
                    labelIcon={<LayoutDashboard className="h-4 w-4"/>}
                    onClick={() => router.push('/seller')} 
                  />
                )}
              </UserButton.MenuItems>
            </UserButton>
          </>
        ) : (
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={openSignIn}
              className="text-sm font-medium hover:text-blue-600 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => router.push('/sign-up')}
              className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;