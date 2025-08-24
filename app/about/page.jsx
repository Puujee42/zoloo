'use client';

import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, Users, Target, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";
import { assets } from '@/assets/assets';

// --- Team Member Card ---
const TeamMemberCard = ({ image, name, title }) => (
  <motion.div
    whileHover={{ y: -6 }}
    transition={{ type: "spring", stiffness: 200 }}
    className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-xl transition-all duration-300"
  >
    <Image 
      src={image} 
      alt={name}
      width={120}
      height={120}
      className="rounded-full mx-auto border-4 border-zolGold shadow-lg"
    />
    <h4 className="mt-4 text-lg font-semibold text-zolDark">{name}</h4>
    <p className="text-sm text-zolDark/70">{title}</p>
  </motion.div>
);

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white text-zolDark">
        
        {/* --- Hero Section --- */}
        <section className="relative bg-gradient-to-br from-zolGreen via-zolGreen/90 to-zolDark text-white text-center py-28 md:py-36 overflow-hidden">
          <Image 
            src={assets.hero_background_image}
            alt="Real estate office background"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zolGreen/90 via-transparent to-transparent"></div>

          <div className="relative max-w-4xl mx-auto px-4">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-playfair text-4xl md:text-6xl font-bold drop-shadow-xl"
            >
              Бидний тухай
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-6 text-lg md:text-xl text-white/90 leading-relaxed"
            >
              ZOL Properties нь үл хөдлөх хөрөнгийн салбарт найдвартай, шинэлэг, хэрэглэгч төвтэй үйлчилгээгээрээ ялгардаг компани юм.
            </motion.p>
          </div>
        </section>

        {/* --- Үндсэн үнэт зүйлс --- */}
        <section className="relative bg-zolGreen/5 py-24">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-playfair text-3xl md:text-5xl font-bold text-zolGreen"
              >
                Бидний Үндсэн Үнэт Зүйлс
              </motion.h2>
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-28 h-1 bg-zolGold mt-4 mx-auto rounded-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <Target className="h-10 w-10 text-zolGreen" />,
                  title: "Бидний эрхэм зорилго",
                  desc: "Үл хөдлөх хөрөнгийн гүйлгээ бүрт хосгүй үйлчилгээ, мэргэжлийн зөвлөгөө өгөх."
                },
                {
                  icon: <Building className="h-10 w-10 text-zolGreen" />,
                  title: "Бидний алсын хараа",
                  desc: "Орон нутагтаа хамгийн итгэлтэй, нэр хүндтэй үл хөдлөх хөрөнгийн агентлаг байх."
                },
                {
                  icon: <Users className="h-10 w-10 text-zolGreen" />,
                  title: "Манай баг",
                  desc: "Танд зориулж ажиллахад бэлэн туршлагатай, хүсэл тэмүүлэлтэй агентуудын бүлэг."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="bg-zolGreen/10 p-5 rounded-full shadow-inner">{item.icon}</div>
                  <h3 className="mt-6 text-xl font-semibold text-zolDark">{item.title}</h3>
                  <p className="mt-3 text-zolDark/80 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Манай баг --- */}
        <section className="py-24 bg-white relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="font-playfair text-3xl md:text-5xl font-bold text-zolGreen"
              >
                Манай Мэргэжилтнүүд
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-3 text-lg text-zolDark/70"
              >
                Амжилтад хүрэх хөдөлгөгч хүч.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
              {[
                { name: "Ганболд", title: "Ахлах Агент" },
                { name: "Сарантуяа", title: "Борлуулалтын Мэргэжилтэн" },
                { name: "Тэмүүлэн", title: "Түрээсийн Мэргэжилтэн" },
                { name: "Оюун-Эрдэнэ", title: "Хөрөнгийн Зөвлөх" },
              ].map((member, i) => (
                <TeamMemberCard
                  key={i}
                  image={assets.fallback_property_image}
                  name={member.name}
                  title={member.title}
                />
              ))}
            </div>
          </div>
        </section>

        {/* --- CTA Section --- */}
        <section className="relative bg-gradient-to-r from-zolGreen via-zolDark to-zolGreen text-white py-24">
          <div className="absolute inset-0 opacity-15">
            <Image
              src={assets.hero_background_image}
              alt="CTA Background"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative max-w-4xl mx-auto px-6 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-playfair text-3xl md:text-5xl font-bold"
            >
              Таны мөрөөдлийн гэр хүлээж байна
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-5 text-lg md:text-xl text-white/90 leading-relaxed"
            >
              Манай багтай холбогдож, үл хөдлөх хөрөнгийн аяллаа эхлүүлээрэй. Бид туслахад бэлэн байна.
            </motion.p>
            <motion.div
              className="mt-10 inline-block"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-zolGold text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all text-lg"
              >
                <Phone size={20} />
                Бидэнтэй холбогдоорой
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;
