'use client'

import React from 'react';
import { useAppContext } from '@/context/AppContext';
import PropertyCard from './PropertyCard'; 
import PropertyCardSkeleton from './PropertyCardSkeleton'; 
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

// Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { type: "spring", stiffness: 90, damping: 14 } 
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" }
  }),
};

const RecentProperties = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  const recentProperties = properties?.slice(0, 8) || [];

  return (
    <div className="bg-zolGreen/5 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="font-sans-serif font-bold text-4xl md:text-5xl text-zolGreen flex flex-wrap justify-center gap-x-3">
            {["Шинээр", "нэмэгдсэн"].map((word, i) => (
              <motion.span 
                key={i} 
                custom={i} 
                variants={wordVariants} 
                initial="hidden" 
                whileInView="visible" 
                viewport={{ once: true }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-4 text-zolDark/70 max-w-2xl text-lg leading-relaxed"
          >
            Манай онцгой цуглуулгад шинээр нэмэгдсэн орон сууц, байшин, виллагуудыг сонирхоно уу.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.5 }}
            viewport={{ once: true }}
            className="w-28 h-1 bg-zolGold mt-6 rounded-full origin-left"
          />
        </div>

        {/* Properties Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          {isLoading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <motion.div key={index} variants={itemVariants}>
                <PropertyCardSkeleton />
              </motion.div>
            ))
          ) : (
            recentProperties.map((property) => (
              <motion.div 
                key={property._id} 
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02, boxShadow: "0px 12px 25px rgba(0,0,0,0.15)" }}
                transition={{ type: "spring", stiffness: 200, damping: 18 }}
              >
                <PropertyCard property={property} />
              </motion.div>
            ))
          )}
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <motion.button
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0px 10px 25px rgba(212,175,55,0.6)",
              textShadow: "0px 0px 8px rgba(255,255,255,0.7)"
            }}
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push('/all-properties')}
            className="px-10 py-3 bg-zolGold text-white font-semibold rounded-full 
                       transition-all hover:bg-opacity-90 shadow-md"
          >
            Бүх зарыг харах
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default RecentProperties;
