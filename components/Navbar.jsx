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
  Home,
  Building,
  Car,
  Landmark,
  Info,
  Mail,
  LogIn,
  LogOut,
  UserPlus
} from "lucide-react";
import SearchBar from "./SearchBar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isSeller, user, isLoading } = useAppContext();
  const { openSignIn, signOut } = useClerk();
  const router = useRouter();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDotMenuOpen, setIsDotMenuOpen] = useState(false);

  const dropdownRef = useRef(null);

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

  const closeMobileMenu = () => setIsDotMenuOpen(false);

  const handleMobileLinkClick = (path) => {
    router.push(path);
    closeMobileMenu();
  };


  // Loading state skeleton with luxury shimmer animation
  if (isLoading) {
    return (
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-20 h-24 border-b bg-gradient-to-r from-white to-zolGold/5 relative overflow-hidden">
        {/* Subtle background animation */}
        <div className="absolute inset-0 bg-gradient-to-r from-zolGold/5 via-transparent to-zolGreen/5 animate-shimmer"></div>
        <div className="h-8 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded lg:hidden relative overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
        <div className="h-10 w-44 bg-gradient-to-r from-gray-200 to-gray-300 rounded relative overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        </div>
        <div className="hidden lg:flex items-center gap-4">
          <div className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          <div className="h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full hidden lg:block relative overflow-hidden animate-pulse">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
        </div>
      </nav>
    );
  }

  const navLinkClass =
    "relative font-medium text-zolDark after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-zolGold after:to-zolGreen after:transition-all after:duration-300 hover:after:w-full group";

  return (
    <>
      <nav className="font-poppins flex items-center justify-between px-6 md:px-16 lg:px-20 h-24 border-b border-gray-100/50 bg-white/80 backdrop-blur-md text-zolDark sticky top-0 z-40 shadow-sm relative overflow-hidden">
        {/* Luxury background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-zolGold/5 via-transparent to-zolGreen/5 opacity-50"></div>

        {/* Left: Hamburger (mobile only) - Enhanced with rotation and glow */}
        <motion.button
          whileHover={{ scale: 1.05, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDotMenuOpen((prev) => !prev)}
          className="p-2 relative h-10 w-10 flex items-center justify-center lg:hidden z-10 bg-white/80 rounded-full shadow-lg border border-zolGold/20"
          aria-label="Toggle quick actions menu"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={isDotMenuOpen ? "close" : "open"}
              initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 400 }}
              className="absolute text-zolGold/80 group-hover:text-zolGold transition-colors"
            >
              {isDotMenuOpen ? <X size={28} /> : <AlignJustify size={28} />}
            </motion.div>
          </AnimatePresence>
        </motion.button>

        {/* Center: Logo - Entrance animation with subtle glow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link href="/" className="flex items-center gap-3 relative group">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative"
            >
              <Image
                src={assets.logo}
                alt="logo"
                width={176}
                height={55}
                className="cursor-pointer w-36 md:w-44 drop-shadow-lg group-hover:drop-shadow-2xl transition-shadow duration-300"
                priority
              />
              {/* Subtle gold glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-zolGold/20 to-zolGreen/20 blur-xl opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Staggered entrance and enhanced hovers */}
        <motion.div 
          className="hidden lg:flex items-center gap-10 text-base"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
        >
          {[
            {href:"/",label:"Нүүр хуудас"},
            { href: "/all-properties", label: "Үл хөдлөх" },
            { href: "/about", label: "Бидний тухай" },
            { href:"/agent", label: "Agents"},
            { href: "/contact", label: "Холбоо барих" },
          ].map((link, index) => (
            <motion.div key={link.href} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}>
              <Link href={link.href} className={navLinkClass}>
                <span className="relative z-10">{link.label}</span>
                {/* Luxury hover effect: subtle lift and glow */}
                <motion.div
                  className="absolute inset-0 rounded-md bg-gradient-to-r from-zolGold/10 to-zolGreen/10 -z-10 opacity-0 group-hover:opacity-100"
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: Search + Auth - Enhanced interactions */}
        <div className="flex items-center gap-2 relative z-10">
          {/* Search Button - Pulsing animation and glow */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSearchOpen(prev => !prev)}
            className="p-3 rounded-full hover:bg-gradient-to-r hover:from-zolGold/20 hover:to-zolGreen/20 text-zolDark hover:text-zolGold transition-all duration-300 shadow-md border border-zolGold/10 relative overflow-hidden"
            aria-label="Toggle search"
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-r from-zolGold/10 to-zolGreen/10 rounded-full opacity-50"
            />
            <Search size={22} className="relative z-10" />
          </motion.button>

          <motion.div className="hidden lg:flex items-center gap-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
            {user ? (
              <>
                {isSeller && (
                  <motion.button 
                    whileHover={{ scale: 1.05, boxShadow: "0 4px 20px rgba(34, 139, 34, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => router.push("/seller")} 
                    className="flex items-center gap-2 text-sm border-2 border-zolGreen text-zolGreen px-5 py-2.5 rounded-full hover:bg-gradient-to-r hover:from-zolGreen hover:to-zolGold/80 hover:text-white font-medium transition-all duration-300 relative overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-zolGreen to-zolGold opacity-0 hover:opacity-100"
                      initial={{ scale: 0 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3, type: "spring" }}
                    />
                    <LayoutDashboard size={18} className="relative z-10" /> 
                    <span className="relative z-10">Худалдагчийн самбар</span>
                  </motion.button>
                )}
                <motion.div 
                  className="w-10 h-10 relative group"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, type: "spring" }}
                >
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-zolGold to-zolGreen opacity-75 blur transition-all duration-500 group-hover:opacity-100 group-hover:rotate-6"></div>
                  <UserButton afterSignOutUrl="/" />
                </motion.div>
              </>
            ) : (
              <>
                <motion.button 
                  whileHover={{ scale: 1.05, color: "#D4AF37" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => openSignIn()} 
                  className="text-base font-medium text-zolDark hover:text-zolGold transition-all duration-300 px-3 py-2 relative"
                >
                  <span>Нэвтрэх</span>
                  {/* Gold underline on hover */}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-zolGold to-zolGreen"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(212, 175, 55, 0.4)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openSignIn()} 
                  className="flex items-center gap-2 text-base bg-gradient-to-r from-zolGold to-zolGreen text-white font-medium px-5 py-2.5 rounded-full hover:from-zolGold/90 hover:to-zolGreen/90 transition-all duration-300 transform shadow-lg relative overflow-hidden"
                >
                  <motion.div
                    className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.5 }}
                    transition={{ duration: 0.4, type: "spring" }}
                  />
                  <PlusCircle size={20} className="relative z-10" /> 
                  <span className="relative z-10">Зар оруулах</span>
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </nav>

      {/* SearchBar - Pass props with enhanced close animation */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3, type: "spring" }}
          >
            <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Actions Overlay (Mobile Drawer) - Enhanced luxury slide with stagger */}
      <AnimatePresence>
        {isDotMenuOpen && (
          <motion.div
            className="fixed inset-0 z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
              onClick={closeMobileMenu}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="fixed top-0 left-0 bottom-0 w-80 bg-white/95 backdrop-blur-xl shadow-2xl p-6 flex flex-col border-r border-zolGold/20 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30, duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative gold border animation */}
              <motion.div 
                className="absolute top-0 right-0 h-full w-1 bg-gradient-to-b from-zolGold to-zolGreen"
                initial={{ scaleY: 0, originY: 0 }}
                animate={{ scaleY: 1, originY: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
              />
              
              <motion.div 
                className="flex items-center justify-between pb-4 border-b border-gray-100/50 relative"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <motion.h2 className="font-semibold text-lg text-zolDark tracking-wider" whileHover={{ color: "#D4AF37" }}>Түргэн цэс</motion.h2>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeMobileMenu}
                  className="p-2 text-zolGold/80 hover:text-zolGold transition-colors" 
                  aria-label="Close menu"
                >
                  <X size={24} />
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="flex-grow mt-6 flex flex-col space-y-2"
                variants={{
                    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
                    hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {[
                    { label: 'Нүүр хуудас', icon: Home, path: '/' },
                    { label: 'Үл хөдлөх', icon: Building, path: '/all-properties' },
                    { label: 'Бидний тухай', icon: Info, path: '/about' },
                    { label: 'Холбоо барих', icon: Mail, path: '/contact' },
                ].map((item) => (
                    <MobileNavLink key={item.path} icon={item.icon} label={item.label} onClick={() => handleMobileLinkClick(item.path)} />
                ))}

                 {isSeller && (
                    <MobileNavLink icon={LayoutDashboard} label="Худалдагчийн самбар" onClick={() => handleMobileLinkClick('/seller')} />
                 )}
              </motion.div>

              <motion.div 
                className="mt-auto pt-6 border-t border-gray-100/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {user ? (
                    <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <UserButton afterSignOutUrl="/" />
                            <div className="text-sm">
                                <p className="font-semibold text-zolDark">{user.fullName}</p>
                                <p className="text-gray-500 text-xs">{user.primaryEmailAddress.emailAddress}</p>
                            </div>
                         </div>
                         <motion.button 
                           onClick={() => signOut(() => router.push('/'))}
                           whileHover={{ scale: 1.1, color: "#ef4444" }}
                           className="p-2 text-gray-500"
                           aria-label="Sign Out"
                         >
                            <LogOut size={22} />
                         </motion.button>
                    </div>
                ) : (
                    <div className="space-y-3">
                         <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { openSignIn(); closeMobileMenu(); }}
                            className="w-full flex items-center justify-center gap-3 text-base bg-gradient-to-r from-zolGold to-zolGreen text-white font-medium px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                            <LogIn size={20} />
                            <span>Нэвтрэх</span>
                        </motion.button>
                         <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => { openSignIn(); closeMobileMenu(); }}
                            className="w-full flex items-center justify-center gap-3 text-base bg-transparent border-2 border-zolGreen text-zolGreen font-medium px-5 py-3 rounded-full transition-all duration-300 hover:bg-zolGreen hover:text-white"
                        >
                            <UserPlus size={20} />
                            <span>Бүртгүүлэх</span>
                        </motion.button>
                    </div>
                )}
                 <motion.button
                    whileHover={{ scale: 1.03, boxShadow: "0 8px 25px rgba(212, 175, 55, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      const targetUrl = user ? "/list-property" : "/";
                      router.push(targetUrl);
                      if (!user) openSignIn();
                      closeMobileMenu();
                    }}
                    className="w-full mt-6 flex items-center justify-center gap-3 text-lg bg-gradient-to-r from-zolGreen to-zolGold/80 text-white font-bold px-5 py-4 rounded-full shadow-xl hover:from-zolGreen/90 hover:to-zolGold/90 transition-all duration-300 transform"
                  >
                    <PlusCircle size={22} />
                    <span>Зар оруулах</span>
                  </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Helper component for mobile navigation links for cleaner code and animations
const MobileNavLink = ({ icon: Icon, label, ...props }) => {
    const itemVariants = {
        visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
        hidden: { opacity: 0, x: -20 }
    };
    
    return (
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center gap-4 p-3 text-left text-base font-medium text-zolDark rounded-lg hover:bg-gradient-to-r hover:from-zolGold/10 hover:to-zolGreen/10 group transition-all duration-300"
          {...props}
        >
          <div className="p-2 bg-white shadow-sm rounded-md border border-gray-100 group-hover:border-zolGold/30 transition-colors">
            <Icon className="text-zolGold" size={20} />
          </div>
          <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-zolGold group-hover:to-zolGreen transition-colors duration-300">{label}</span>
        </motion.button>
    )
}


export default Navbar;