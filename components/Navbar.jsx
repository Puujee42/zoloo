// /components/Navbar.jsx
'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import { useClerk, UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  ChevronDown,
  PlusCircle,
  Search,
  X,
  AlignJustify,
} from "lucide-react";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isSeller, user, isLoading } = useAppContext();
  const { openSignIn } = useClerk();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDotMenuOpen, setIsDotMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

  const propertyTypes = [
    { name: "Зуслан", path: "/all-properties?type=House" },
    { name: "Орон сууц", path: "/all-properties?type=Apartment" },
    { name: "Автомашин", path: "/all-properties?type=Car" },
    { name: "Бартер", path: "/all-properties?type=Barter" },
    { name: "Газар", path: "/all-properties?type=Land" },
  ];

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock scroll + Escape handling for overlays
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsSearchOpen(false);
        setIsDotMenuOpen(false);
      }
    };
    
    if (isSearchOpen || isDotMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isSearchOpen, isDotMenuOpen]);

  // Loading state skeleton
  if (isLoading) {
    return (
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 h-24 border-b bg-white animate-pulse">
        <div className="h-8 w-10 bg-gray-200 rounded lg:hidden"></div>
        <div className="h-10 w-44 bg-gray-200 rounded"></div>
        <div className="hidden lg:flex items-center gap-4">
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
          <div className="h-8 w-24 bg-gray-200 rounded-full"></div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
          <div className="h-10 w-32 bg-gray-200 rounded-full hidden lg:block"></div>
        </div>
      </nav>
    );
  }

  const navLinkClass =
    "relative font-medium text-zolDark after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-zolGold after:transition-all after:duration-300 hover:after:w-full";

  return (
    <>
      <nav className="font-poppins flex items-center justify-between px-6 md:px-16 lg:px-20 h-24 border-b border-gray-200 bg-white text-zolDark sticky top-0 z-40">
        {/* Left: Hamburger (mobile only) */}
        <button
          onClick={() => setIsDotMenuOpen((prev) => !prev)}
          className="p-2 relative h-10 w-10 flex items-center justify-center lg:hidden"
          aria-label="Toggle quick actions menu"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isDotMenuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="absolute"
            >
              {isDotMenuOpen ? <X size={28} /> : <AlignJustify size={28} />}
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Center: Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src={assets.logo} alt="logo" width={176} height={55}
            className="cursor-pointer w-36 md:w-44" priority
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-10 text-base">
          <Link href="/" className={navLinkClass}>Нүүр</Link>

          <div className="relative" ref={dropdownRef}>
            <button onClick={() => setIsDropdownOpen((p) => !p)} className={`${navLinkClass} flex items-center gap-1`}>
              Үл хөдлөх{" "}
              <ChevronDown size={18} className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full mt-5 w-52 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100"
                >
                  <Link href="/all-properties" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-sm font-bold text-zolGreen hover:bg-zolGold/10 hover:text-zolGold">Бүх үл хөдлөх</Link>
                  <div className="h-px bg-gray-200 my-1"></div>
                  {propertyTypes.map((type) => (
                    <Link key={type.name} href={type.path} onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2.5 text-sm text-zolDark hover:bg-zolGold/10 hover:text-zolGold">{type.name}</Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/about" className={navLinkClass}>Бидний тухай</Link>
          <Link href="/contact" className={navLinkClass}>Холбоо барих</Link>
        </div>

        {/* Right: Search + Auth */}
        <div className="flex items-center gap-2">
          {/* ЗАСВАР: Энэ товч одоо SearchBar-г нээж, мөн хаана. */}
          <button
            onClick={() => setIsSearchOpen(prev => !prev)}
            className="p-3 rounded-full hover:bg-zolGold/10 text-zolDark hover:text-zolGold transition-colors"
            aria-label="Toggle search"
          >
            <Search size={22} />
          </button>

          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <>
                {isSeller && (
                  <button onClick={() => router.push("/seller")} className="flex items-center gap-2 text-sm border-2 border-zolGreen text-zolGreen px-5 py-2.5 rounded-full hover:bg-zolGreen hover:text-white font-medium transition-all">
                    <LayoutDashboard size={18} /> Худалдагчийн самбар
                  </button>
                )}
                <div className="w-10 h-10"><UserButton afterSignOutUrl="/" /></div>
              </>
            ) : (
              <>
                <button onClick={() => openSignIn()} className="text-base font-medium text-zolDark hover:text-zolGold transition-colors px-3 py-2">Нэвтрэх</button>
                <button onClick={() => openSignIn({ signInOptions: { afterSignInUrl: "/list-property" } })} className="flex items-center gap-2 text-base bg-zolGold text-white font-medium px-5 py-2.5 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-sm">
                  <PlusCircle size={20} /> Зар оруулах
                </button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* ЗАСВАР: isOpen болон onClose props-г SearchBar-т дамжуулж байна. */}
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Quick Actions Overlay (Mobile Drawer) */}
      <AnimatePresence>
        {isDotMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsDotMenuOpen(false)} />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl p-6 flex flex-col"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile drawer-ийн доторх код өөрчлөгдөөгүй тул энд орхив */}
              {/* Таны өмнөх код энэ хэсэгт зөв ажиллана */}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;