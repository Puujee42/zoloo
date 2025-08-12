// components/Banner.jsx

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner = () => {
  const router = useRouter();

  const handleExploreClick = () => {
    router.push('/all-properties');
  };

  const handleLearnMoreClick = () => {
    router.push('/about-us');
  };

  return (
    <div className="relative bg-gradient-to-r from-green-800 via-green-900 to-black text-white my-16 rounded-2xl overflow-hidden shadow-2xl">
      {/* Background Image Container */}
      <div className="absolute inset-0">
        <Image
          className="w-full h-full object-cover opacity-20"
          src={assets.hero_background_image}
          alt="Modern house background"
          layout="fill"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-28 px-4 md:px-0">
        <h1 className="text-4xl md:text-6xl font-extrabold max-w-3xl leading-tight text-shadow-lg">
          Бидэнтэй хамт мөрөөдлийн <span className="text-yellow-400">гэрээ</span> олоорой
        </h1>
        <p className="max-w-2xl mt-6 text-lg text-gray-300">
          Бид таны амьдралын хэв маяг, сонголтод тохирсон хамгийн шилдэг үл хөдлөх хөрөнгийн сонголтыг санал болгож байна.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleExploreClick}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-yellow-400 rounded-lg text-black font-bold text-lg hover:bg-yellow-500 transition-all transform hover:scale-105 shadow-lg"
          >
            Үл хөдлөх хөрөнгө хайх
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1.5 transition-transform">
              <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
            </svg>
          </button>
          <button
            onClick={handleLearnMoreClick}
            className="px-8 py-4 bg-white/10 border border-white/40 rounded-lg text-white font-semibold text-lg hover:bg-white hover:text-green-900 transition-colors backdrop-blur-md shadow-lg"
          >
            Дэлгэрэнгүй
          </button>
        </div>
      </div>

      <style jsx>{`
        .text-shadow-lg {
          text-shadow: 3px 3px 10px rgba(0, 0, 0, 0.6);
        }
      `}</style>
    </div>
  );
};

export default Banner;