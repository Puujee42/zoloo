// components/HomeProducts.jsx
'use client'

import React from "react";
import { useAppContext } from "@/context/AppContext";
import PropertyCard from "./PropertyCard";
import PropertyCardSkeleton from "./PropertyCardSkeleton";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

const HomeProducts = () => {
  const { properties, isLoading } = useAppContext();
  const router = useRouter();

  const homeProperties = properties.slice(0, 6);

  return (
    <motion.div
      className="bg-white py-16 md:py-24"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        
        {/* --- Section Header --- */}
        <motion.div
          className="flex flex-col items-center text-center mb-14"
          variants={fadeUp}
        >
          <motion.h2
            className="font-playfair font-bold text-3xl md:text-5xl text-zolGreen"
            variants={fadeUp}
          >
            Сүүлд нэмэгдсэн
          </motion.h2>
          <motion.p
            className="mt-4 text-zolDark/70 max-w-2xl text-base md:text-lg leading-relaxed"
            variants={fadeUp}
          >
            Зах зээл дээрх хамгийн сүүлийн үеийн, эрэлттэй үл хөдлөх хөрөнгүүдтэй танилцана уу.
          </motion.p>
          <motion.div
            className="w-24 h-1 bg-zolGold mt-5 rounded-full"
            variants={fadeUp}
          />
        </motion.div>

        {/* --- Grid with staggered card animations --- */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          variants={sectionVariants}
        >
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="w-full"
                >
                  <PropertyCardSkeleton />
                </motion.div>
              ))
            : homeProperties.map((property) => (
                <motion.div
                  key={property._id}
                  variants={cardVariants}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "0px 10px 20px rgba(0,0,0,0.12)",
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 16 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
        </motion.div>

        {/* --- Button --- */}
        <motion.div
          className="mt-14 text-center"
          variants={fadeUp}
        >
          <motion.button
            onClick={() => router.push("/all-properties")}
            className="px-10 py-3 bg-zolGold text-white font-semibold rounded-full shadow-md transition-all"
            whileHover={{
              scale: 1.07,
              boxShadow: "0px 0px 18px rgba(212,175,55,0.65)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 16 }}
          >
            Бүх зарыг харах
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HomeProducts;
