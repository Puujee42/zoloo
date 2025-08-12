import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, Users, Target, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// A simple component for team member cards
const TeamMemberCard = ({ image, name, title }) => (
  <div className="text-center">
    <Image 
      src={image} 
      alt={`Portrait of ${name}`}
      width={120}
      height={120}
      className="rounded-full mx-auto border-4 border-amber-400 shadow-lg"
    />
    <h4 className="mt-4 text-lg font-bold text-gray-800">{name}</h4>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

const AboutPage = () => {
  return (
    <>
      <Navbar />
      {/* --- 1. Main Container: Soft background for a premium feel --- */}
      <div className="bg-gray-50 italic text-black" >
        
        {/* --- 2. Hero Section: Visually engaging with bright, energetic colors --- */}
        <div className="relative bg-green-600 text-black italic text-center py-24 md:py-32">
          <div className="absolute inset-0">
            {/* You can replace this with a real team or office photo */}
            <Image 
              src="/path-to-your-office-image.jpg" // CHANGE THIS PATH
              alt="Our real estate office"
              fill
              className="object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-600 via-green-600/80 to-transparent"></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">Бидний тухай</h1>
            <p className="mt-4 text-lg text-green-100 max-w-2xl mx-auto">
              ZOL Properties нь үл хөдлөх хөрөнгийн салбарт найдвартай, шинэлэг, хэрэглэгч төвтэй үйлчилгээгээрээ ялгардаг компани юм. Бид орон сууц, оффис, зуслангийн байшин, авто машин, газар гэх мэт бүхий л төрлийн үл хөдлөх хөрөнгийг худалдах, түрээслүүлэх, зуучлах үйлчилгээг үзүүлдэг.

Манай зорилго бол үйлчлүүлэгч бүрийн хэрэгцээ, хүсэлд нийцсэн хамгийн зөв шийдлийг олж, тэдний хөрөнгө оруулалтыг үнэ цэнтэй болгох юм. Бид зах зээлийн бодит судалгаа, мэргэжлийн зөвлөгөө, хурдан шуурхай үйлчилгээ, ил тод харилцаагаар дамжуулан харилцагчдынхаа итгэлийг хүлээж ирсэн.

ZOL Properties нь зөвхөн үл хөдлөх хөрөнгө зуучлахаас гадна, таны хөрөнгийг үр ашигтай, аюулгүй, урт хугацааны үнэ цэнийг хадгалах мэргэжлийн зөвлөгөө, менежментээр дэмжин ажилладаг.

            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          
          {/* --- 3. Core Values Section: Styled with vibrant, high-contrast cards --- */}
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-gray-800">Бидний Үндсэн Үнэт Зүйлс</h2>
            <div className="w-24 h-1.5 bg-amber-500 mt-4 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* --- 4. Value Card: Themed with bright green and gold/amber --- */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center">
              <div className="bg-green-500/20 p-4 rounded-full">
                <Target className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-800">Бидний эрхэм зорилго</h3>
              <p className="mt-2 text-gray-600 flex-grow">Үл хөдлөх хөрөнгийн гүйлгээ бүрт хосгүй үйлчилгээ, мэргэжлийн зөвлөгөө өгөх.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center">
              <div className="bg-green-500/20 p-4 rounded-full">
                <Building className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-800">Бидний алсын хараа</h3>
              <p className="mt-2 text-gray-600 flex-grow">Орон нутагтаа хамгийн итгэлтэй, нэр хүндтэй үл хөдлөх хөрөнгийн агентлаг байх.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center">
              <div className="bg-green-500/20 p-4 rounded-full">
                <Users className="h-8 w-8 text-green-700" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-gray-800">Манай баг</h3>
              <p className="mt-2 text-gray-600 flex-grow">Танд зориулж ажиллахад бэлэн туршлагатай, хүсэл тэмүүлэлтэй агентуудын бүлэг.</p>
            </div>
          </div>

          {/* --- 5. Meet the Team Section --- */}
          <div className="mt-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-800">Манай Мэргэжилтнүүдтэй танилц</h2>
              <p className="mt-2 text-gray-600">Амжилтад хүрэх хөдөлгөгч хүч.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <TeamMemberCard image="/agents/agent-1.jpg" name="Ганболд" title="Ахлах Агент"/>
              <TeamMemberCard image="/agents/agent-2.jpg" name="Сарантуяа" title="Борлуулалтын Мэргэжилтэн"/>
              <TeamMemberCard image="/agents/agent-3.jpg" name="Тэмүүлэн" title="Түрээсийн Мэргэжилтэн"/>
              <TeamMemberCard image="/agents/agent-4.jpg" name="Оюун-Эрдэнэ" title="Хөрөнгийн Зөвлөх"/>
            </div>
          </div>

        </div>

        {/* --- 6. Call to Action (CTA) Section --- */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">Таны мөрөөдлийн гэр хүлээж байна</h2>
            <p className="mt-4 text-lg text-gray-600">
              Манай багтай холбогдож, үл хөдлөх хөрөнгийн аяллаа эхлүүлээрэй. Бид туслахад бэлэн байна.
            </p>
            <div className="mt-8">
              <Link href="/contact" passHref>
                <button className="inline-flex items-center gap-2 bg-amber-500 text-black font-bold px-8 py-3 rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow-lg">
                  <Phone size={18} />
                  Бидэнтэй холбогдоорой
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;