'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
// --- 1. Image болон assets-г буцаан импортлосон ---
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import { LayoutDashboard, ChevronDown, PlusCircle, Search, X, Menu } from "lucide-react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isSeller, router, user, isLoading } = useAppContext();
  const { openSignIn } = useClerk();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef(null);

  const propertyTypes = [
    { name: 'Зуслан', path: '/all-properties?type=House' },
    { name: 'Орон сууц', path: '/all-properties?type=Apartment' },
    { name: 'Автомашин', path: '/all-properties?type=Car' },
    { name: 'Бартер', path: '/all-properties?type=Barter' },
    { name: 'Газрын талбай', path: '/all-properties?type=Land' },
  ];

  // useEffect hooks remain the same...
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
      }
    };
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen, isMobileMenuOpen]);


  if (isLoading) {
    return <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 h-24 border-b bg-white animate-pulse">...</nav>;
  }

  const navLinkClass = "relative font-medium text-zolDark after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-zolGold after:transition-all after:duration-300 hover:after:w-full";
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 h-24 border-b border-gray-200 bg-white text-zolDark sticky top-0 z-40">
        {/* --- 2. ЛОГО ШИНЭЧЛЭГДЛЭЭ: Зураг болон текст хамтдаа --- */}
        <Link href="/" className="flex items-center gap-3">
             <Image
            className="cursor-pointer w-36 md:w-44"
            src={assets.logo}
            alt="logo"
            width={176}
            height={55}
            priority
          />
        </Link>

        {/* --- Desktop Navigation --- */}
        <div className="hidden lg:flex items-center gap-10 text-base">
          <Link href="/" className={navLinkClass}>Нүүр</Link>
          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen(p => !p)} className={`${navLinkClass} flex items-center gap-1`}>
              Үл хөдлөх <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full mt-5 w-52 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100 animate-in fade-in zoom-in-95">
                <Link href="/all-properties" className="block px-4 py-2.5 text-sm font-bold text-zolGreen hover:bg-zolGold/10 hover:text-zolGold" onClick={() => setIsDropdownOpen(false)}>Бүх үл хөдлөх</Link>
                <div className="h-px bg-gray-200 my-1"></div>
                {propertyTypes.map((type) => (
                  <Link key={type.name} href={type.path} className="block px-4 py-2.5 text-sm text-zolDark hover:bg-zolGold/10 hover:text-zolGold" onClick={() => setIsDropdownOpen(false)}>{type.name}</Link>
                ))}
              </div>
            )}
          </div>
          <Link href="/about" className={navLinkClass}>Бидний тухай</Link>
          <Link href="/contact" className={navLinkClass}>Холбоо барих</Link>
        </div>

        {/* --- Right-Side Actions & Mobile Trigger --- */}
        <div className="flex items-center gap-2">
            {/* ... other buttons and user actions ... */}
            <button onClick={() => setIsSearchOpen(true)} className="p-3 rounded-full hover:bg-zolGold/10 text-zolDark hover:text-zolGold transition-colors">
                <Search size={22} />
            </button>
            <div className="hidden lg:flex items-center gap-4">
                {user ? (
                <div className="flex items-center gap-4">
                    {isSeller && (
                    <button onClick={() => router.push('/seller')} className="flex items-center gap-2 text-sm border-2 border-zolGreen text-zolGreen px-5 py-2.5 rounded-full hover:bg-zolGreen hover:text-white font-medium transition-all duration-300">
                        <LayoutDashboard size={18} /> Худалдагчийн самбар
                    </button>
                    )}
                    <div className="w-10 h-10"><UserButton afterSignOutUrl="/" /></div>
                </div>
                ) : (
                <div className="flex items-center gap-4">
                    <button onClick={openSignIn} className="text-base font-medium text-zolDark hover:text-zolGold transition-colors px-3 py-2">Нэвтрэх</button>
                    <button onClick={openSignIn} className="flex items-center gap-2 text-base bg-zolGold text-white font-medium px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-sm hover:shadow-md">
                    <PlusCircle size={20} /> Зар оруулах
                    </button>
                </div>
                )}
            </div>
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 lg:hidden">
                <Menu size={28} className="text-zolDark"/>
            </button>
        </div>
      </nav>

            {/* --- Mobile Menu Panel --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-lg animate-in fade-in lg:hidden">
          <div className="fixed top-0 right-0 bottom-0 h-full w-full max-w-sm bg-white shadow-2xl p-6 flex flex-col animate-in slide-in-from-right-full duration-300 text-zolDark">
            <div className="flex items-center justify-between pb-6 border-b border-gray-200">
              {/* --- Утасны цэсний лого --- */}
              <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2">
                  <Image
                      className="h-8 w-auto"
                      src={assets.logo}
                      alt="ZOL Logo"
                      width={32}
                      height={32}
                  />
                  <span className="font-playfair font-bold text-3xl text-zolGreen">
                      ZOL
                  </span>
              </Link>
              <button onClick={closeMobileMenu} className="p-2">
                <X size={28} className="text-gray-600"/>
              </button>
            </div>
            
            {/* --- Утасны цэсний линкүүд --- */}
            <div className="flex-grow mt-8 flex flex-col gap-6 text-lg font-medium">
              <Link href="/" onClick={closeMobileMenu} className="hover:text-zolGold transition-colors">Нүүр</Link>
              <Link href="/about" onClick={closeMobileMenu} className="hover:text-zolGold transition-colors">Бидний тухай</Link>
              <Link href="/contact" onClick={closeMobileMenu} className="hover:text-zolGold transition-colors">Холбоо барих</Link>

              <div className="h-px bg-gray-200 my-2"></div>

              <h3 className="text-gray-500 font-bold text-sm uppercase tracking-wider">Үл хөдлөх</h3>
              <div className="flex flex-col gap-5 pl-2">
                <Link href="/all-properties" onClick={closeMobileMenu} className="font-bold text-zolGreen hover:text-zolGold transition-colors">Бүх үл хөдлөх</Link>
                {propertyTypes.map(type => (
                  <Link key={type.path} href={type.path} onClick={closeMobileMenu} className="hover:text-zolGold transition-colors">{type.name}</Link>
                ))}
              </div>
            </div>

            {/* --- Утасны цэсний хэрэглэгчийн хэсэг --- */}
            <div className="pt-6 border-t border-gray-200">
              {user ? (
                <div className="flex flex-col gap-4">
                  {isSeller && (
                    <button onClick={() => { router.push('/seller'); closeMobileMenu(); }} className="w-full flex items-center justify-center gap-2 text-base border-2 border-zolGreen text-zolGreen px-5 py-3 rounded-full font-medium hover:bg-zolGreen hover:text-white transition-colors">
                      <LayoutDashboard size={18} /> Худалдагчийн самбар
                    </button>
                  )}
                  <p className="text-center text-gray-500">Тавтай морил, {user.firstName || 'хэрэглэгч'}.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <button onClick={() => { openSignIn(); closeMobileMenu(); }} className="w-full text-base font-medium text-zolDark py-3 hover:text-zolGold transition-colors">Нэвтрэх</button>
                  <button onClick={() => { openSignIn({ redirectUrl: '/submit-property' }); closeMobileMenu(); }} className="w-full flex items-center justify-center gap-2 text-base bg-zolGold text-white font-medium px-5 py-3 rounded-full hover:bg-opacity-90 transition-colors">
                    <PlusCircle size={20} /> Зар оруулах
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- Search Modal --- */}
      {isSearchOpen && (
         <div 
            className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24 md:pt-32 bg-black/60 backdrop-blur-sm animate-in fade-in" 
            onClick={() => setIsSearchOpen(false)}
        >
            <div
                className="relative w-full max-w-4xl p-4 bg-transparent animate-in slide-in-from-top-10"
                onClick={(e) => e.stopPropagation()} // Хайх хэсэг дээр дарахад модал хаагдахаас сэргийлнэ
            >
                <SearchBar onSearchComplete={() => setIsSearchOpen(false)} />
                <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute top-0 right-4 sm:right-0 text-white bg-zolGreen rounded-full p-2 hover:bg-zolGold transition-colors"
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