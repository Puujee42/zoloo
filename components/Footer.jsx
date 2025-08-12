// components/Footer.jsx

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
    className="text-gray-400 hover:text-yellow-400 hover:scale-110 transition-all"
  >
    <Icon size={22} />
  </a>
);

const Footer = () => {
  return (
    // Main Footer: Set a dark green background and light base text color
    <footer className="bg-green-900 text-gray-300 mt-20 md:mt-28">
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-16">

        {/* Top Section with Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-12 border-b border-white/20 pb-12">
          {/* Logo and Brand Description */}
          <div className="lg:col-span-1">
            {/* --- FIX: Removed the unnecessary <a> tag and passHref prop --- */}
            <Link href="/">
              <Image className="w-36" src={assets.logo} alt="RealEstate Logo" />
            </Link>
            <p className="mt-4 text-sm text-gray-400 max-w-sm">
              Төгс үл хөдлөх хөрөнгийг олоход таны найдвартай түнш. Бид таны үл хөдлөх хөрөнгийн аяллыг саадгүй, амжилттай болгоход зориулагдсан.
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-white">Мэдээлэлтэй байгаарай</h3>
            <p className="text-gray-400 mt-1">Хамгийн сүүлийн үеийн үл хөдлөх хөрөнгө болон мэдээг авахын тулд манай мэдээллийн товхимолд бүртгүүлнэ үү.</p>
            <form className="mt-5 flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Имэйл хаягаа оруулна уу"
                className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                aria-label="Мэдээллийн товхимолд бүртгүүлэх имэйл"
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md hover:bg-yellow-500 transition-colors transform hover:scale-105"
              >
                Бүртгүүлэх
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section with Site Links and Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm">

          {/* Contact Info */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h2 className="font-semibold text-white mb-4">Холбоо барих</h2>
            <div className="space-y-3 text-gray-400">
              <p>123 Үл хөдлөх хөрөнгийн өргөн чөлөө, 500 тоот<br />Метрополис, АНУ 12345</p>
              <p>+1 (234) 567-890</p>
              <p>contact@realestate.com</p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="font-semibold text-white mb-4">Компани</h2>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/about" className="hover:text-yellow-400 hover:underline">Бидний тухай</Link></li>
              <li><Link href="/contact" className="hover:text-yellow-400 hover:underline">Холбоо барих</Link></li>
              <li><Link href="/careers" className="hover:text-yellow-400 hover:underline">Ажлын байр</Link></li>
              <li><Link href="/blog" className="hover:text-yellow-400 hover:underline">Блог</Link></li>
            </ul>
          </div>

          {/* Properties Links */}
          <div>
            <h2 className="font-semibold text-white mb-4">Үл хөдлөх хөрөнгө</h2>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/properties/for-sale" className="hover:text-yellow-400 hover:underline">Зарах</Link></li>
              <li><Link href="/properties/for-rent" className="hover:text-yellow-400 hover:underline">Түрээслэх</Link></li>
              <li><Link href="/featured-properties" className="hover:text-yellow-400 hover:underline">Онцлох</Link></li>
              <li><Link href="/submit-property" className="hover:text-yellow-400 hover:underline">Зар оруулах</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h2 className="font-semibold text-white mb-4">Хууль эрх зүй</h2>
            <ul className="space-y-3 text-gray-400">
              <li><Link href="/privacy-policy" className="hover:text-yellow-400 hover:underline">Нууцлалын бодлого</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-yellow-400 hover:underline">Үйлчилгээний нөхцөл</Link></li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h2 className="font-semibold text-white mb-4">Биднийг дагаарай</h2>
            <div className="flex items-center gap-4">
              <SocialIcon href="#" icon={Facebook} />
              <SocialIcon href="#" icon={Twitter} />
              <SocialIcon href="#" icon={Instagram} />
              <SocialIcon href="#" icon={Linkedin} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Bar */}
      <div className="bg-black/30 py-4">
        <p className="text-center text-xs md:text-sm text-gray-500">
          © {new Date().getFullYear()} RealEstate Inc. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
    </footer>
  );
};

export default Footer;