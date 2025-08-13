// /app/components/FinancialNewsSlider.jsx
'use client'

import React, { useState } from 'react';
import { TrendingUp, DollarSign, Home, ChevronLeft, ChevronRight } from 'lucide-react';

// The hardcoded news content with updated icon colors
const newsItems = [
  {
    id: 1,
    icon: <TrendingUp className="h-8 w-8 text-zolGold" />, // Changed color
    title: "Эрдэнэс Тавантолгой Ногдол Ашиг",
    link: "https://mse.mn/mn/aboutus",
    description: "Эрдэнэс Тавантолгой” ХК 2024 оны үйл ажиллагааны ашгаас ногдол ашиг болгон нэгж хувьцаанд 266 ₮-ийн төллөгөө хийж, “1072 хувьцааны ногдол ашгаар хөрөнгө оруулалт хийе” кампанит ажлыг эхлүүлжээ."
  },
  {
    id: 2,
    icon: <DollarSign className="h-8 w-8 text-zolGreen" />, // Changed color
    title: "Татвар, НДШ-ийн Шинэчлэлт",
    link: "https://bloombergtv.mn/news",
    description: "2025 онд УИХ татвар болон нийгмийн даатгалын багц хуулиуд дээр шинэчлэлт хийж буй бөгөөд татварын дарамтыг бууруулах хүлээлттэй байна."
  },
  {
    id: 3,
    icon: <Home className="h-8 w-8 text-zolGold" />, // Changed color
    title: "Хөрөнгийн Биржийн Тойм",
    link: "https://stock.bbe.mn/Home",
    description: "Биржийн идэвхжил бага зэрэг буурсан ч, Засгийн газрын үнэт цаасны арилжаа нээгдэж, нүүрс, зэс гэх мэт бүтээгдэхүүний стандарт арилжаа хэвийн явагдаж байна."
  }
];

export default function FinancialNewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? newsItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === newsItems.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    // --- 1. Дэвсгэрийг брэндийн өнгөтэйгөө уялдуулсан ---
    <section className="bg-zolGreen/5 py-20 sm:py-28">
      <div className="container mx-auto px-4">
        
        <div className="max-w-3xl mx-auto">

          {/* --- 2. Гарчгийг Playfair Display фонт, ногоон өнгөтэй болгосон --- */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-zolGreen">
              Санхүүгийн Зөвлөгөө
            </h2>
            <p className="mt-4 text-zolDark/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Хөрөнгө оруулалтын боломж, татварын шинэчлэлт болон зах зээлийн тойм мэдээлэлтэй танилцана уу.
            </p>
            {/* --- Ялгах зураасыг алтан шаргал өнгөтэй болгосон --- */}
            <div className="w-28 h-1 bg-zolGold mt-6 rounded-full mx-auto"></div>
          </div>

          <div className="relative">
            {/* --- Слайдын карт --- */}
            <div className="overflow-hidden rounded-2xl bg-white p-8 border border-gray-200 shadow-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {newsItems.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-2">
                    <div className="flex items-start gap-5">
                      {/* --- Icon-ы арын дэвсгэр, хүрээг шинэчилсэн --- */}
                      <div className="flex-shrink-0 h-16 w-16 rounded-full bg-zolGreen/10 border-2 border-zolGreen/20 shadow-sm flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        {/* --- Гарчиг, линкийн өнгийг шинэчилсэн --- */}
                        <h3 className="text-xl font-bold text-zolGreen">{item.title}</h3>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-zolGold hover:underline transition-colors"
                        >
                          Дэлгэрэнгүй...
                        </a>
                      </div>
                    </div>
                    <p className="mt-4 text-zolDark/90 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Удирдлагын товчлуурууд --- */}
            <div className="mt-6 flex items-center justify-between">
              <button onClick={goToPrevious} className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-zolGold hover:bg-zolGold/10 transition-colors" aria-label="Previous slide">
                <ChevronLeft className="h-6 w-6 text-zolDark"/>
              </button>
              <div className="flex items-center gap-2">
                {newsItems.map((_, index) => (
                  <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2.5 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-6 bg-zolGold' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`} aria-label={`Slide ${index + 1}`}/>
                ))}
              </div>
              <button onClick={goToNext} className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-zolGold hover:bg-zolGold/10 transition-colors" aria-label="Next slide">
                <ChevronRight className="h-6 w-6 text-zolDark"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}