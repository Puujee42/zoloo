'use client'

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from './PropertyCard'; 
import PropertyCardSkeleton from './PropertyCardSkeleton'; 
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Enhanced Variants for luxury feel
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.12, delayChildren: 0.2 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: 10 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    rotateX: 0,
    transition: { type: "spring", stiffness: 100, damping: 12, duration: 0.8 } 
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 30, skewX: 10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    skewX: 0,
    transition: { 
      delay: i * 0.1, 
      duration: 0.7, 
      ease: [0.25, 0.1, 0.25, 1],
      type: "spring",
      stiffness: 200
    }
  }),
};

const RecentProperties = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  const recentProperties = properties?.slice(0, 8) || [];

  return (
    <div className="bg-gradient-to-br from-zolGreen/5 via-white to-zolGold/5 py-20 md:py-28 overflow-hidden relative">
      {/* Luxury background elements - subtle floating orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        <div className="absolute top-20 left-10 w-32 h-32 bg-zolGold/10 rounded-full blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-zolGreen/10 rounded-full blur-2xl animate-float-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-zolGold/20 rounded-full blur-lg animate-pulse-slow"></div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Heading with glow and stagger */}
        <motion.div 
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="font-sans-serif font-bold text-4xl md:text-5xl text-zolGreen relative flex flex-wrap justify-center gap-x-3 drop-shadow-lg"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.4,
                },
              },
            }}
          >
            {["Шинээр", "нэмэгдсэн"].map((word, i) => (
              <motion.span 
                key={i} 
                custom={i} 
                variants={wordVariants}
                className="inline-block relative group"
                whileHover={{ 
                  color: "#D4AF37",
                  textShadow: "0 0 20px rgba(212, 175, 55, 0.5)"
                }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                {word}
                {/* Subtle underline glow on hover */}
                <motion.div 
                  className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-zolGold to-zolGreen rounded-full w-0 group-hover:w-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </motion.span>
            ))}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="mt-6 text-zolDark/70 max-w-2xl text-lg leading-relaxed font-light drop-shadow-sm"
          >
            Манай онцгой цуглуулгад шинээр нэмэгдсэн орон сууц, байшин, виллагуудыг сонирхоно уу.
          </motion.p>
          
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            viewport={{ once: true }}
            className="w-28 h-1 bg-gradient-to-r from-zolGold via-zolGreen to-zolGold mt-8 rounded-full origin-left shadow-md"
          >
            {/* Shimmer effect on the line */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* Enhanced Properties Grid with luxury hovers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="relative group"
              >
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-zolGold/5 to-zolGreen/5 rounded-2xl blur-md opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, type: "spring" }}
                />
                <PropertyCardSkeleton />
              </motion.div>
            ))
          ) : (
            recentProperties.map((property, index) => (
              <motion.div 
                key={property._id} 
                variants={itemVariants}
                whileHover={{ 
                  y: -12, 
                  scale: 1.03, 
                  rotateX: -2,
                  boxShadow: "0px 20px 40px rgba(34, 139, 34, 0.2), 0px 0px 30px rgba(212, 175, 55, 0.3)",
                  z: 10
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 250, 
                  damping: 15,
                  duration: 0.4 
                }}
                className="relative group cursor-pointer overflow-hidden rounded-2xl border border-zolGold/10 hover:border-zolGreen/20 transition-all duration-300"
              >
                {/* Luxury card glow overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-zolGold/10 via-transparent to-zolGreen/10 rounded-2xl opacity-0 group-hover:opacity-100"
                  initial={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 300 }}
                />
                
                {/* Floating badge for new properties */}
                <motion.div 
                  className="absolute top-4 right-4 z-10 bg-gradient-to-r from-zolGold to-zolGreen text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    delay: index * 0.1 
                  }}
                >
                  Шинэ
                </motion.div>
                
                <PropertyCard property={property} />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Enhanced CTA Button with luxury shine and ripple */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="mt-16 md:mt-20 text-center relative"
        >
          <motion.button
            whileHover={{ 
              scale: 1.1, 
              boxShadow: "0px 15px 35px rgba(212,175,55,0.5), 0px 0px 25px rgba(34,139,34,0.3)",
              background: "linear-gradient(135deg, #D4AF37 0%, #B8860B 50%, #228B22 100%)",
              textShadow: "0px 0px 10px rgba(255,255,255,0.8)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/all-properties')}
            className="group relative px-12 py-4 bg-gradient-to-r from-zolGold via-zolGreen/80 to-zolGold text-white font-semibold rounded-full text-lg shadow-xl overflow-hidden transition-all duration-500 font-sans-serif"
          >
            {/* Shine effect */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            />
            
            {/* Ripple effect container */}
            <motion.div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
              whileHover={{ scale: 4 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping"></div>
            </motion.div>
            
            <span className="relative z-10">Бүх зарыг харах</span>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default RecentProperties;