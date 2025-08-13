// components/Banner.jsx
'use client'

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react"; // Icon-г lucide-аас ашиглах нь илүү цэвэрхэн

const Banner = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/all-properties');
  };

  const handleLearnMoreClick = () => {
    // '/about' эсвэл өөр хуудас руу чиглүүлж болно
    router.push('/about'); 
  };

  return (
    // Дэвсгэр өнгийг zolGreen болгосон
    <div className="relative bg-zolGreen text-white my-16 rounded-2xl overflow-hidden shadow-2xl">
      {/* Дэвсгэр зураг */}
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover opacity-25" // Тунгалаг байдлыг бага зэрэг нэмсэн
          src={assets.hero_background_image}
          alt="Modern house background"
          layout="fill"
          priority
        />
        {/* Доод хэсэгт хар туяа өгч, текст уншигдахыг сайжруулсан */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-zolGreen/20"></div>
      </div>

      {/* Агуулга */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24 sm:py-32 px-4">
        {/* Гарчгийг Playfair Display фонтоор сольсон */}
        <h1 className="font-playfair font-bold text-4xl md:text-6xl max-w-4xl leading-tight drop-shadow-lg">
          Бидэнтэй хамт мөрөөдлийн <span className="text-zolGold">гэрээ</span> олоорой
        </h1>
        <p className="max-w-2xl mt-6 text-lg text-white/90 font-light leading-relaxed">
          Бид таны амьдралын хэв маяг, сонголтод тохирсон хамгийн шилдэг үл хөдлөх хөрөнгийн сонголтыг санал болгож байна.
        </p>

        {/* Товчлуурууд */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          {/* Үндсэн товчлуурыг zolGold болгосон */}
          <button
            onClick={handleExploreClick}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-zolGold rounded-full text-white font-semibold text-base hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Үл хөдлөх хөрөнгө хайх
            <ArrowRight size={20} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
          {/* Хоёрдогч товчлуурын загварыг шинэчилсэн */}
          <button
            onClick={handleLearnMoreClick}
            className="px-8 py-4 bg-transparent border-2 border-zolGold rounded-full text-white font-semibold text-base hover:bg-zolGold hover:text-white transition-colors duration-300"
          >
            Дэлгэрэнгүй
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;