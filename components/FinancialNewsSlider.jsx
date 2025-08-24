// /app/components/FinancialNewsSlider.jsx
'use client'

import { useState, useEffect } from 'react';
import { TrendingUp, DollarSign, Home, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const newsItems = [
  {
    id: 1,
    icon: <TrendingUp className="h-8 w-8 text-zolGold" />,
    title: "Эрдэнэс Тавантолгой Ногдол Ашиг",
    link: "https://mse.mn/mn/aboutus",
    description: "“Эрдэнэс Тавантолгой” ХК 2024 оны ашгаас нэгж хувьцаанд 266 ₮ ногдол ашиг тарааж, “1072 хувьцааны ногдол ашгаар хөрөнгө оруулалт хийе” кампанит ажлыг эхлүүлжээ."
  },
  {
    id: 2,
    icon: <DollarSign className="h-8 w-8 text-zolGreen" />,
    title: "Татвар, НДШ-ийн Шинэчлэлт",
    link: "https://bloombergtv.mn/news",
    description: "2025 онд УИХ татвар болон нийгмийн даатгалын багц хуулиуд дээр шинэчлэлт хийж буй бөгөөд татварын дарамтыг бууруулах хүлээлттэй байна."
  },
  {
    id: 3,
    icon: <Home className="h-8 w-8 text-zolGold" />,
    title: "Хөрөнгийн Биржийн Тойм",
    link: "https://stock.bbe.mn/Home",
    description: "Биржийн идэвхжил бага зэрэг буурсан ч, Засгийн газрын үнэт цаасны арилжаа нээгдэж, нүүрс, зэс зэрэг бүтээгдэхүүний арилжаа хэвийн үргэлжилж байна."
  }
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 150 : -150,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 150 : -150,
    opacity: 0,
  }),
};

export default function FinancialNewsSlider() {
  const [[page, direction], setPage] = useState([0, 0]);
  const [paused, setPaused] = useState(false);

  const currentIndex = ((page % newsItems.length) + newsItems.length) % newsItems.length;

  // Auto-play (5s per slide, pause on hover)
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => paginate(1), 5000);
    return () => clearTimeout(timer);
  }, [page, paused]);

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <motion.section 
      className="bg-zolGreen/5 py-20 sm:py-28 overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h2 className="font-playfair font-bold text-4xl md:text-5xl text-zolGreen">Санхүүгийн Зөвлөгөө</h2>
            <p className="mt-4 text-zolDark/70 max-w-2xl mx-auto text-lg leading-relaxed">
              Хөрөнгө оруулалтын боломж, татварын шинэчлэлт болон зах зээлийн тойм мэдээлэлтэй танилцана уу.
            </p>
            <div className="w-28 h-1 bg-zolGold mt-6 rounded-full mx-auto"></div>
          </div>

          {/* Slider */}
          <div 
            className="relative"
            role="region"
            aria-label="Financial news slider"
          >
            <div 
              className="relative h-72 overflow-hidden rounded-2xl bg-gradient-to-br from-white to-zolGreen/5 
              p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-shadow duration-500"
              aria-live="polite"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 180, damping: 25 },
                    opacity: { duration: 0.3 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(e, { offset }) => {
                    if (offset.x > 100) paginate(-1);
                    else if (offset.x < -100) paginate(1);
                  }}
                  className="absolute top-0 left-0 w-full h-full p-8 flex flex-col justify-center"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 h-16 w-16 rounded-full bg-zolGreen/10 border-2 border-zolGreen/20 
                    shadow-md flex items-center justify-center">
                      {newsItems[currentIndex].icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-zolGreen">{newsItems[currentIndex].title}</h3>
                      <a href={newsItems[currentIndex].link} target="_blank" rel="noopener noreferrer" 
                        className="text-sm font-semibold text-zolGold hover:underline transition-colors">
                        Дэлгэрэнгүй...
                      </a>
                    </div>
                  </div>
                  <p className="mt-4 text-zolDark/90 leading-relaxed">
                    {newsItems[currentIndex].description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between">
              <motion.button whileTap={{ scale: 0.8 }} onClick={() => paginate(-1)} 
                className="p-2.5 rounded-full bg-white border border-gray-200 
                hover:border-zolGold hover:bg-zolGold/10 transition-colors" aria-label="Previous slide">
                <ChevronLeft className="h-6 w-6 text-zolDark"/>
              </motion.button>

              <div className="flex items-center gap-2">
                {newsItems.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setPage([index, index > currentIndex ? 1 : -1])}
                    animate={{ 
                      width: currentIndex === index ? 24 : 10,
                      backgroundColor: currentIndex === index ? "#D4AF37" : "#D1D5DB"
                    }}
                    transition={{ duration: 0.3 }}
                    className="h-2.5 rounded-full"
                    aria-label={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <motion.button whileTap={{ scale: 0.8 }} onClick={() => paginate(1)} 
                className="p-2.5 rounded-full bg-white border border-gray-200 
                hover:border-zolGold hover:bg-zolGold/10 transition-colors" aria-label="Next slide">
                <ChevronRight className="h-6 w-6 text-zolDark"/>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
