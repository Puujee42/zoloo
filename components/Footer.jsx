// components/Footer.jsx
'use client'

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { assets } from "@/assets/assets";
import { Facebook, Instagram } from "lucide-react";
import { motion } from "framer-motion";

// Reusable Social Icon with glowing hover
const SocialIcon = ({ href, icon: Icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white/70 hover:text-zolGold relative group"
    whileHover={{ scale: 1.25, rotate: 6, y: -3 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 250 }}
  >
    <Icon size={22} />
    <span className="absolute inset-0 blur-md opacity-0 group-hover:opacity-30 bg-zolGold rounded-full transition-opacity" />
  </motion.a>
);

// Variants
const container = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut", staggerChildren: 0.2 }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const linkHover = {
  initial: { x: 0 },
  hover: { x: 6, transition: { type: "spring", stiffness: 300 } }
};

const Footer = () => {
  return (
    <motion.footer
      className="relative bg-gradient-to-b from-zolGreen to-black text-white/80 mt-20 md:mt-28 overflow-hidden"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Decorative overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,215,0,0.08),transparent)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-8 lg:px-16 py-16">

        {/* Top Section */}
        <motion.div
          variants={item}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-12 border-b border-white/15 pb-12"
        >
          {/* Logo + Intro */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <motion.div whileHover={{ rotate: -6, scale: 1.1 }}>
                <Image className="h-12 w-auto drop-shadow-lg" src={assets.logo} alt="ZOL Logo" width={48} height={48} />
              </motion.div>
              <span className="font-playfair font-bold text-4xl text-white tracking-wide">ZOL</span>
            </Link>
            <p className="mt-4 text-sm text-white/65 max-w-sm leading-relaxed">
              Төгс үл хөдлөх хөрөнгийг олоход таны найдвартай түнш.<br />
              Бид таны аяллыг саадгүй, амжилттай болгоход зориулагдсан.
            </p>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-white">Мэдээлэлтэй байгаарай</h3>
            <p className="text-white/65 mt-1">Хамгийн сүүлийн үл хөдлөх хөрөнгө болон мэдээг шууд имэйлээр аваарай.</p>
            <motion.form
              className="mt-5 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.input
                type="email"
                placeholder="Имэйл хаяг"
                className="flex-grow px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-zolGold/70 backdrop-blur-sm"
                aria-label="Имэйл бүртгүүлэх"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="bg-zolGold text-black font-bold px-6 py-3 rounded-lg shadow-md hover:shadow-zolGold/30 transition-all"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.95 }}
              >
                Бүртгүүлэх
              </motion.button>
            </motion.form>
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          variants={container}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm"
        >
          {[
            {
              title: "Холбоо барих",
              content: (
                <div className="space-y-3 text-white/65">
                  <p>123 ZOL өргөн чөлөө, 500 тоот<br />Улаанбаатар, Монгол 12345</p>
                  <p>+976 8800-0000</p>
                  <p>contact@zol.mn</p>
                </div>
              )
            },
            {
              title: "Компани",
              links: [
                { href: "/about", text: "Бидний тухай" },
                { href: "/contact", text: "Холбоо барих" },
                { href: "/careers", text: "Ажлын байр" },
                { href: "/blog", text: "Блог" }
              ]
            },
            {
              title: "Үл хөдлөх",
              links: [
                { href: "/all-properties?status=For Sale", text: "Зарах" },
                { href: "/all-properties?status=For Rent", text: "Түрээслэх" },
                { href: "/featured-properties", text: "Онцлох" },
              ]
            }
          ].map((section, idx) => (
            <motion.div key={idx} variants={item}>
              <h2 className="font-semibold text-white mb-4 tracking-wide">{section.title}</h2>
              {section.content ? (
                section.content
              ) : (
                <ul className="space-y-3 text-white/65">
                  {section.links.map((link, i) => (
                    <motion.li key={i} variants={linkHover} whileHover="hover">
                      <Link href={link.href} className="hover:text-zolGold relative inline-block">
                        {link.text}
                        <motion.span
                          className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-zolGold"
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.35, ease: "easeOut" }}
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}

          {/* Socials */}
          <motion.div variants={item} className="col-span-2 md:col-span-4 lg:col-span-1">
            <h2 className="font-semibold text-white mb-4">Биднийг дагаарай</h2>
            <div className="flex items-center gap-5">
              <SocialIcon href="https://www.facebook.com/profile.php?id=61572418040666" icon={Facebook} />
              <SocialIcon href="https://www.instagram.com/zol_properties" icon={Instagram} />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom copyright */}
      <motion.div
        className="bg-black/40 py-4 backdrop-blur-sm border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <p className="text-center text-xs md:text-sm text-white/40">
          © {new Date().getFullYear()} ZOL Inc. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
