// /app/components/FinancialNewsSlider.jsx
'use client'

import React, { useState } from 'react';
import { TrendingUp, DollarSign, Home, ChevronLeft, ChevronRight } from 'lucide-react';

// The hardcoded news content. In a real app, this could come from a CMS.
const newsItems = [
  {
    id: 1,
    icon: <TrendingUp className="h-8 w-8 text-yellow-500" />,
    title: "Эрдэнэс Тавантолгой Ногдол Ашиг",
    link: "https://mse.mn/mn/aboutus",
    description: "Эрдэнэс Тавантолгой” ХК 2024 оны үйл ажиллагааны ашгаас ногдол ашиг болгон нэгж хувьцаанд 266 ₮-ийн төллөгөө хийж, “1072 хувьцааны ногдол ашгаар хөрөнгө оруулалт хийе” кампанит ажлыг эхлүүлжээ. Энэ нь иргэдийг хөрөнгийн зах зээлд идэвхтэй оролцох боломж олгож байна."
  },
  {
    id: 2,
    icon: <DollarSign className="h-8 w-8 text-green-500" />,
    title: "Татвар, НДШ-ийн Шинэчлэлт",
    link: "https://bloombergtv.mn/news",
    description: "2025 онд УИХ татвар болон нийгмийн даатгалын багц хуулиуд дээр шинэчлэлт хийж буй бөгөөд татварын дарамтыг бууруулах хүлээлттэй байна."
  },
  {
    id: 3,
    icon: <Home className="h-8 w-8 text-yellow-500" />,
    title: "Хөрөнгийн Биржийн Тойм",
    link: "https://stock.bbe.mn/Home",
    description: "Биржийн идэвхжил бага зэрэг буурсан ч (6.35 тэрбум цэвэр ашиг, -13 %), Засгийн газрын үнэт цаасны арилжаа нээгдэж, нүүрс, зэс гэх мэт бүтээгдэхүүний стандарт арилжаа хэвийн явагдаж байна."
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
    <section className="bg-green-50 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        
        <div className="max-w-3xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-green-900 leading-tight">
              Үл хөдлөх хөрөнгийн зөвлөгөө, зах зээлийн мэдээ
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Хөрөнгө оруулалтын боломж, татварын мэдээлэл
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-xl bg-white p-8 border border-green-100 shadow-lg">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {newsItems.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 px-2">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 h-16 w-16 rounded-full bg-green-50 border-2 border-green-200 shadow-sm flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-xl font-bold text-green-900">{item.title}</h3>
                        {/* --- CLICKABLE LINK --- */}
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm font-semibold text-yellow-600 hover:text-yellow-700 hover:underline transition-colors"
                        >
                          Дэлгэрэнгүй...
                        </a>
                      </div>
                    </div>
                    <p className="mt-4 text-gray-700 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button onClick={goToPrevious} className="p-2 rounded-full bg-white border border-green-200 hover:bg-green-100 transition-colors" aria-label="Previous slide">
                <ChevronLeft className="h-6 w-6 text-green-800"/>
              </button>
              <div className="flex items-center gap-2">
                {newsItems.map((_, index) => (
                  <button key={index} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'w-6 bg-yellow-400' : 'w-2 bg-green-200 hover:bg-green-300'}`} />
                ))}
              </div>
              <button onClick={goToNext} className="p-2 rounded-full bg-white border border-green-200 hover:bg-green-100 transition-colors" aria-label="Next slide">
                <ChevronRight className="h-6 w-6 text-green-800"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}