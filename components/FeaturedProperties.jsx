// components/FeaturedProperties.jsx
'use client'

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from './PropertyCard';
import PropertyCardSkeleton from './PropertyCardSkeleton';
import { motion } from 'framer-motion';

const FeaturedProperties = () => {
  const { properties, isLoading } = useAppContext();
  const featuredProperties = properties?.slice(0, 3) || [];

  // Enhanced Section fade-in with luxury stagger
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1], // Custom easing for smooth luxury
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  // Title & subtitle enhanced fade with depth
  const itemVariants = {
    hidden: { y: 40, opacity: 0, rotateX: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 0.8, ease: "easeOut", type: "spring", stiffness: 150 },
    },
  };

  // Property card reveal with 3D luxury entrance
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.92, rotateY: -15 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 140, damping: 16, duration: 0.9 },
    },
  };

  // Letter stagger for title
  const letterVariants = {
    hidden: { opacity: 0, y: 30, skewX: 5 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      skewX: 0,
      transition: { 
        delay: i * 0.08, 
        duration: 0.6, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 250
      },
    }),
  };

  return (
    <motion.section
      className="relative py-24 md:py-32 px-6 md:px-10 bg-gradient-to-br from-white via-zolGreen/3 to-zolGold/5 overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Enhanced Decorative Background with floating luxury elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        {/* Radial gold-green glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(212,175,55,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(34,139,34,0.08),transparent_50%)]" />
        
        {/* Floating orbs for luxury atmosphere */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-zolGold/8 rounded-full blur-3xl animate-float-luxury"></div>
        <div className="absolute bottom-32 right-16 w-60 h-60 bg-zolGreen/6 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-5 w-28 h-28 bg-gradient-to-r from-zolGold/10 to-zolGreen/10 rounded-full blur-xl animate-pulse-gentle"></div>
      </motion.div>

      {/* Section Header - Enhanced with letter animation */}
      <motion.div 
        className="flex flex-col items-center text-center mb-20 md:mb-24 relative z-10"
        variants={itemVariants}
      >
        <motion.h2
          className="font-sans-serif font-bold text-4xl md:text-5xl lg:text-6xl text-zolGreen drop-shadow-xl relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ perspective: 1000 }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.05,
                delayChildren: 0.3,
              },
            },
          }}
        >
          {Array.from("Онцлох Үл Хөдлөх Хөрөнгө").map((char, i) => (
            <motion.span
              key={i}
              variants={letterVariants}
              custom={i}
              className="inline-block relative group"
              whileHover={{ 
                color: "#D4AF37",
                textShadow: "0 0 25px rgba(212, 175, 55, 0.6)",
                scale: 1.1
              }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
            >
              {char === " " ? "\u00A0" : char}
              {/* Per-letter glow underline */}
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-zolGold to-zolGreen rounded-full w-0 group-hover:w-full"
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </motion.span>
          ))}
        </motion.h2>
        
        <motion.p
          className="mt-6 md:mt-8 text-zolDark/75 max-w-3xl text-lg md:text-xl leading-relaxed font-light drop-shadow-md"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          Тансаг зэрэглэлийн харш, тохилог орон сууц болон гэр бүлд тохиромжтой байшингуудыг бид танд онцлон хүргэж байна.
        </motion.p>
        
        {/* Enhanced Gold underline with multi-shimmer and particles */}
        <motion.div
          className="relative mt-8 md:mt-10 w-32 md:w-40 h-1.5 rounded-full bg-gradient-to-r from-zolGold via-zolGreen/50 to-zolGold overflow-hidden shadow-lg"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 1 }}
          viewport={{ once: true }}
        >
          {/* Multi-layer shimmer */}
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
            animate={{ x: ["-100%", "100%", "-100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 rounded-full opacity-50"
            animate={{ x: ["100%", "-100%", "100%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.5 }}
          />
          {/* Subtle particle dots */}
          <div className="absolute top-1/2 left-0 w-full h-0.5 flex justify-between">
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-1 bg-white rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.2 + 1.2, type: "spring", stiffness: 400 }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Enhanced Properties Grid with luxury interactions */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 relative z-10"
        variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px 0px" }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <motion.div 
                key={index} 
                variants={cardVariants}
                className="relative group overflow-hidden rounded-3xl border border-zolGold/5 backdrop-blur-md"
              >
                {/* Skeleton glow overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-zolGold/5 to-zolGreen/5 rounded-3xl opacity-0 group-hover:opacity-100 blur-sm"
                  initial={{ scale: 0.9 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                />
                <PropertyCardSkeleton />
              </motion.div>
            ))
          : featuredProperties.map((property, index) => (
              <motion.div
                key={property._id}
                variants={cardVariants}
                whileHover={{
                  y: -15,
                  scale: 1.04,
                  rotateY: 5,
                  boxShadow: "0 25px 50px rgba(34, 139, 34, 0.25), 0 0 40px rgba(212, 175, 55, 0.4)",
                  z: 20,
                }}
                whileTap={{
                  scale: 0.97,
                  rotateY: 0,
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 280, 
                  damping: 20,
                  duration: 0.5 
                }}
                className="relative group cursor-pointer overflow-hidden rounded-3xl border-2 border-zolGold/10 hover:border-zolGreen/30 backdrop-blur-sm transition-all duration-500"
              >
                {/* Luxury card overlay with gradient glow */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-zolGold/15 via-transparent to-zolGreen/15 rounded-3xl opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, type: "spring", stiffness: 350 }}
                />
                
                {/* Featured badge with spin and glow */}
                <motion.div 
                  className="absolute top-4 left-4 z-20 bg-gradient-to-r from-zolGold to-zolGreen text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl flex items-center gap-2"
                  initial={{ scale: 0, rotate: -360 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 500, 
                    delay: index * 0.15 + 0.5 
                  }}
                  whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(212, 175, 55, 0.7)" }}
                >
                  ✨ Онцлох
                </motion.div>
                
                <PropertyCard property={property} />
              </motion.div>
            ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturedProperties;