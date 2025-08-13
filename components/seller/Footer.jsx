// components/Footer.jsx
'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

// A reusable Social Icon component for cleaner code
const SocialIcon = ({ href, icon: Icon }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/60 hover:text-zolGold hover:scale-110 transition-all"
  >
    <Icon size={22} />
  </a>
);

const Footer = () => {
  return (
    // --- 1. Үндсэн дэвсгэрийг zolGreen болгосон ---
    <footer className="bg-zolGreen text-white/80 mt-20 md:mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-16">

        {/* --- 2. Логог Navbar-тай ижил, зураг+текст болгосон --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-12 border-b border-white/20 pb-12">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3">
              <Image
                  className="h-12 w-auto"
                  src={assets.logo}
                  alt="ZOL Logo"
                  width={48}
                  height={48}
              />
              <span className="font-playfair font-bold text-4xl text-white">
                  ZOL
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/70 max-w-sm">
              Төгс үл хөдлөх хөрөнгийг олоход таны найдвартай түнш. Бид таны үл хөдлөх хөрөнгийн аяллыг саадгүй, амжилттай болгоход зориулагдсан.
            </p>
          </div>

          {/* --- 3. Мэдээллийн товхимолыг брэндийн өнгөөр загварчилсан --- */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white">Мэдээлэлтэй байгаарай</h3>
            <p className="text-white/70 mt-1">Хамгийн сүүлийн үеийн үл хөдлөх хөрөнгө болон мэдээг авахын тулд манай мэдээллийн товхимолд бүртгүүлнэ үү.</p>
            <form className="mt-5 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Имэйл хаягаа оруулна уу"
                className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-zolGold transition-colors"
                aria-label="Мэдээллийн товхимолд бүртгүүлэх имэйл"
              />
              <button
                type="submit"
                className="bg-zolGold text-white font-bold px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors transform hover:scale-105"
              >
                Бүртгүүлэх
              </button>
            </form>
          </div>
        </div>

        {/* --- 4. Холбоосуудын hover өнгийг zolGold болгосон --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm">

          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h2 className="font-bold text-white mb-4">Холбоо барих</h2>
            <div className="space-y-3 text-white/70">
              <p>123 ZOL өргөн чөлөө, 500 тоот<br />Улаанбаатар, Монгол 12345</p>
              <p>+976 8800-0000</p>
              <p>contact@zol.mn</p>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-white mb-4">Компани</h2>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/about" className="hover:text-zolGold hover:underline">Бидний тухай</Link></li>
              <li><Link href="/contact" className="hover:text-zolGold hover:underline">Холбоо барих</Link></li>
              <li><Link href="/careers" className="hover:text-zolGold hover:underline">Ажлын байр</Link></li>
              <li><Link href="/blog" className="hover:text-zolGold hover:underline">Блог</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-white mb-4">Үл хөдлөх</h2>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/all-properties?status=For Sale" className="hover:text-zolGold hover:underline">Зарах</Link></li>
              <li><Link href="/all-properties?status=For Rent" className="hover:text-zolGold hover:underline">Түрээслэх</Link></li>
              <li><Link href="/featured-properties" className="hover:text-zolGold hover:underline">Онцлох</Link></li>
              <li><Link href="/submit-property" className="hover:text-zolGold hover:underline">Зар оруулах</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="font-bold text-white mb-4">Хууль эрх зүй</h2>
            <ul className="space-y-3 text-white/70">
              <li><Link href="/privacy-policy" className="hover:text-zolGold hover:underline">Нууцлалын бодлого</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-zolGold hover:underline">Үйлчилгээний нөхцөл</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h2 className="font-bold text-white mb-4">Биднийг дагаарай</h2>
            <div className="flex items-center gap-4">
              <SocialIcon href="#" icon={Facebook} />
              <SocialIcon href="#" icon={Twitter} />
              <SocialIcon href="#" icon={Instagram} />
              <SocialIcon href="#" icon={Linkedin} />
            </div>
          </div>
        </div>
      </div>
      
      {/* --- 5. Copyright текстийг шинэчилсэн --- */}
      <div className="bg-black/30 py-4">
        <p className="text-center text-xs md:text-sm text-white/40">
          © {new Date().getFullYear()} ZOL Inc. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
    </footer>
  )
}