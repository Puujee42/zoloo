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

  // Section fade-in
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // smooth cubic easing
        when: "beforeChildren",
        staggerChildren: 0.25,
      },
    },
  };

  // Title & subtitle fade
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  // Property card reveal
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  return (
    <motion.section
      className="relative py-24 px-6 md:px-10 bg-gradient-to-b from-white via-zolGreen/5 to-white overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      {/* Decorative Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent)] pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-20 relative z-10">
        <motion.h2
          className="font-playfair font-bold text-4xl md:text-5xl text-zolGreen drop-shadow-sm"
          variants={itemVariants}
        >
          Онцлох Үл Хөдлөх Хөрөнгө
        </motion.h2>
        <motion.p
          className="mt-4 text-zolDark/70 max-w-2xl text-lg md:text-xl leading-relaxed"
          variants={itemVariants}
        >
          Тансаг зэрэглэлийн харш, тохилог орон сууц болон гэр бүлд тохиромжтой байшингуудыг бид танд онцлон хүргэж байна.
        </motion.p>
        {/* Gold underline accent */}
        <motion.div
          className="relative mt-6 w-28 h-1 rounded-full bg-zolGold"
          variants={itemVariants}
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent rounded-full"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Properties Grid */}
      <motion.div
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10"
        variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
      >
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))
          : featuredProperties.map((property) => (
              <motion.div
                key={property._id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                className="rounded-2xl overflow-hidden backdrop-blur-sm"
              >
                <PropertyCard property={property} />
              </motion.div>
            ))}
      </motion.div>
    </motion.section>
  );
};

export default FeaturedProperties;
