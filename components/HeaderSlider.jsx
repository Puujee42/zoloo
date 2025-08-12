'use client'
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
// Import icons from lucide-react
import { BedDouble, Bath, SquareArrowOutUpRight, MoveRight } from "lucide-react";

// --- Sample Data for Real Estate Hero Slider ---
const sliderData = [
  {
    id: 1,
    title: "Breathtaking Oceanfront Villa in Malibu",
    description: "An architectural masterpiece with panoramic ocean views and unparalleled luxury.",
    buttonText1: "View Property Details",
    buttonText2: "Schedule a Tour",
    imgSrc: assets.asus_laptop_image,
    price: "$12,500,000",
    bedrooms: 5,
    bathrooms: 7,
    area: "6,200 sqft",
  },
  {
    id: 2,
    title: "Secluded Modern Retreat in the Aspens",
    description: "Experience tranquility and modern design, nestled in the heart of nature.",
    buttonText1: "Explore This Home",
    buttonText2: "Contact Agent",
    imgSrc: assets.header_playstation_image,
    price: "$7,800,000",
    bedrooms: 4,
    bathrooms: 5,
    area: "4,800 sqft",
  },
  {
    id: 3,
    title: "Iconic Penthouse with Skyline Views",
    description: "The pinnacle of urban living, offering breathtaking cityscapes and bespoke interiors.",
    buttonText1: "Discover The Penthouse",
    buttonText2: "Request Info",
    imgSrc: assets.header_macbook_image,
    price: "$22,000,000",
    bedrooms: 3,
    bathrooms: 4,
    area: "4,500 sqft",
  },
];


const HeaderSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden rounded-xl mt-6 shadow-2xl">
      {/* Slides Container */}
      <div
        className="flex h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {sliderData.map((slide) => (
          <div key={slide.id} className="relative min-w-full h-full text-white">
            {/* Background Image */}
            <Image
              src={slide.imgSrc}
              alt={slide.title}
              layout="fill"
              objectFit="cover"
              className="z-0"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-end h-full p-8 md:p-16">
              <h1 className="text-3xl md:text-5xl font-bold max-w-3xl leading-tight text-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-200 text-shadow">
                {slide.description}
              </p>
              
              {/* Property Specs */}
              <div className="flex items-center gap-6 mt-6 text-gray-200">
                  <div className="flex items-center gap-2"><BedDouble size={20} /> {slide.bedrooms} Beds</div>
                  <div className="flex items-center gap-2"><Bath size={20} /> {slide.bathrooms} Baths</div>
                  <div className="flex items-center gap-2"><SquareArrowOutUpRight size={20} /> {slide.area}</div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-start gap-4 mt-8">
                <button className="px-8 py-3 bg-blue-600 rounded-md font-semibold hover:bg-blue-700 transition-all transform hover:scale-105">
                  {slide.buttonText1}
                </button>
                <button className="group flex items-center gap-2 px-8 py-3 font-semibold bg-black/30 backdrop-blur-sm rounded-md hover:bg-white hover:text-black transition-colors">
                  {slide.buttonText2}
                  <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Thumbnails */}
      <div className="absolute bottom-8 right-8 z-30 flex items-center gap-3">
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            onClick={() => handleSlideChange(index)}
            className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              currentSlide === index ? "border-blue-500 scale-110" : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <Image
                src={slide.imgSrc}
                alt={`Thumbnail ${index + 1}`}
                width={80}
                height={50}
                objectFit="cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeaderSlider;