// components/Banner.jsx
'use client'

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
// Framer Motion-г импорт хийж байна
import { motion } from "framer-motion";

const Banner = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/all-properties');
  };

  const handleLearnMoreClick = () => {
    router.push('/about');
  };

  // Агуулгын элементүүдэд зориулсан анимашны тохиргоо (Контейнер)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Хүү элементүүдийг 0.2 секундын зайтай хөдөлгөнө
        delayChildren: 0.3,   // Эхлэхээс өмнө 0.3 секунд хүлээнэ
      },
    },
  };

  // Текст болон товчлууруудад зориулсан анимашны тохиргоо (Хүү элемент)
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative bg-zolGreen text-white my-16 rounded-2xl overflow-hidden shadow-2xl">
      {/* Дэвсгэр зураг */}
      <div className="absolute inset-0">
        {/* motion.div ашиглан зурганд анимашн нэмж байна */}
        <motion.div
          className="w-full h-full"
          initial={{ scale: 1.15 }} // Эхлэхдээ 115% том байна
          animate={{ scale: 1 }} // 100% болон жижгэрнэ
          transition={{ duration: 1.5, ease: "easeOut" }} // 1.5 секундын хугацаатай
        >
          <Image
            className="w-full h-full object-cover opacity-25"
            src={assets.hero_background_image}
            alt="Modern house background"
            layout="fill"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-zolGreen/20"></div>
      </div>

      {/* Агуулга */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center text-center py-24 sm:py-32 px-4"
        variants={containerVariants} // Дээр тодорхойлсон контейнер анимашныг зааж өгнө
        initial="hidden" // Эхлэх төлөв
        animate="visible" // Хөдөлгөөнт төлөв
      >
        <motion.h1
          className="font-playfair font-bold text-4xl md:text-6xl max-w-4xl leading-tight drop-shadow-lg"
          variants={itemVariants} // Хүү элементийн анимашн
        >
          Бидэнтэй хамт мөрөөдлийн <span className="text-zolGold">гэрээ</span> олоорой
        </motion.h1>
        <motion.p
          className="max-w-2xl mt-6 text-lg text-white/90 font-light leading-relaxed"
          variants={itemVariants} // Хүү элементийн анимашн
        >
          Бид таны амьдралын хэв маяг, сонголтод тохирсон хамгийн шилдэг үл хөдлөх хөрөнгийн сонголтыг санал болгож байна.
        </motion.p>

        {/* Товчлуурууд */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          variants={itemVariants} // Хүү элементийн анимашн
        >
          <motion.button
            onClick={handleExploreClick}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-zolGold rounded-full text-white font-semibold text-base shadow-lg"
            whileHover={{ scale: 1.05, y: -2, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }} // Хулгана очиход хөдөлнө
            whileTap={{ scale: 0.95 }} // Дарахад хөдөлнө
            transition={{ type: "spring", stiffness: 300 }}
          >
            Үл хөдлөх хөрөнгө хайх
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </motion.button>
          <motion.button
            onClick={handleLearnMoreClick}
            className="px-8 py-4 bg-transparent border-2 border-zolGold rounded-full text-white font-semibold text-base"
            whileHover={{ scale: 1.05, y: -2, backgroundColor: "#D4AF37", color: "#ffffff" }} // zolGold өнгийг #D4AF37 гэж жишээлэв
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Дэлгэрэнгүй
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;