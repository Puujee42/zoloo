import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, Users, Target, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { assets } from '@/assets/assets'; // assets-г импортлох

// A simple component for team member cards
const TeamMemberCard = ({ image, name, title }) => (
  <div className="text-center group">
    <Image 
      src={image} 
      alt={`Portrait of ${name}`}
      width={120}
      height={120}
      className="rounded-full mx-auto border-4 border-zolGold shadow-lg transition-transform duration-300 group-hover:scale-105"
    />
    <h4 className="mt-4 text-lg font-semibold text-zolDark">{name}</h4>
    <p className="text-sm text-zolDark/70">{title}</p>
  </div>
);

const AboutPage = () => {
  return (
    <>
      <Navbar />
      {/* --- 1. Үндсэн дэвсгэрийг zolGreen/5 болгосон --- */}
      <div className="bg-white text-zolDark">
        
        {/* --- 2. Hero Section-г брэндийн өнгөөр загварчилсан --- */}
        <div className="relative bg-zolGreen text-white text-center py-24 md:py-32">
          <div className="absolute inset-0">
            {/* Та энэ замыг өөрийн зургаар солиорой */}
            <Image 
              src={assets.hero_background_image} // assets-аас зураг ашигласан
              alt="Our real estate office"
              fill
              className="object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zolGreen via-zolGreen/80 to-transparent"></div>
          </div>
          <div className="relative max-w-4xl mx-auto px-4">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold drop-shadow-lg">Бидний тухай</h1>
            <p className="mt-4 text-lg text-white/90 max-w-3xl mx-auto leading-relaxed">
              ZOL Properties нь үл хөдлөх хөрөнгийн салбарт найдвартай, шинэлэг, хэрэглэгч төвтэй үйлчилгээгээрээ ялгардаг компани юм. Бид орон сууц, оффис, зуслангийн байшин, авто машин, газар гэх мэт бүхий л төрлийн үл хөдлөх хөрөнгийг худалдах, түрээслүүлэх, зуучлах үйлчилгээг үзүүлдэг.
            </p>
          </div>
        </div>

        <div className="bg-zolGreen/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
            
            {/* --- 3. Үндсэн үнэт зүйлсийн хэсэг --- */}
            <div className="text-center mb-20">
                <h2 className="font-playfair text-3xl md:text-4xl font-bold text-zolGreen">Бидний Үндсэн Үнэт Зүйлс</h2>
                <div className="w-24 h-1 bg-zolGold mt-4 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* --- 4. Үнэт зүйлсийн картыг шинэчилсэн --- */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-zolGreen/10 p-4 rounded-full">
                    <Target className="h-8 w-8 text-zolGreen" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-zolDark">Бидний эрхэм зорилго</h3>
                <p className="mt-2 text-zolDark/80 flex-grow">Үл хөдлөх хөрөнгийн гүйлгээ бүрт хосгүй үйлчилгээ, мэргэжлийн зөвлөгөө өгөх.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-zolGreen/10 p-4 rounded-full">
                    <Building className="h-8 w-8 text-zolGreen" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-zolDark">Бидний алсын хараа</h3>
                <p className="mt-2 text-zolDark/80 flex-grow">Орон нутагтаа хамгийн итгэлтэй, нэр хүндтэй үл хөдлөх хөрөнгийн агентлаг байх.</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center hover:-translate-y-2 transition-transform duration-300">
                <div className="bg-zolGreen/10 p-4 rounded-full">
                    <Users className="h-8 w-8 text-zolGreen" />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-zolDark">Манай баг</h3>
                <p className="mt-2 text-zolDark/80 flex-grow">Танд зориулж ажиллахад бэлэн туршлагатай, хүсэл тэмүүлэлтэй агентуудын бүлэг.</p>
                </div>
            </div>

            {/* --- 5. Манай багтай танилцах хэсэг --- */}
            <div className="mt-28">
                <div className="text-center mb-12">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-zolGreen">Манай Мэргэжилтнүүд</h2>
                    <p className="mt-2 text-zolDark/70">Амжилтад хүрэх хөдөлгөгч хүч.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {/* Та эдгээр замыг өөрийн зургийн замаар солиорой */}
                    <TeamMemberCard image={assets.fallback_property_image} name="Ганболд" title="Ахлах Агент"/>
                    <TeamMemberCard image={assets.fallback_property_image} name="Сарантуяа" title="Борлуулалтын Мэргэжилтэн"/>
                    <TeamMemberCard image={assets.fallback_property_image} name="Тэмүүлэн" title="Түрээсийн Мэргэжилтэн"/>
                    <TeamMemberCard image={assets.fallback_property_image} name="Оюун-Эрдэнэ" title="Хөрөнгийн Зөвлөх"/>
                </div>
            </div>
            </div>
        </div>

        {/* --- 6. CTA хэсгийг шинэчилсэн --- */}
        <div className="bg-white">
          <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-zolGreen">Таны мөрөөдлийн гэр хүлээж байна</h2>
            <p className="mt-4 text-lg text-zolDark/80">
              Манай багтай холбогдож, үл хөдлөх хөрөнгийн аяллаа эхлүүлээрэй. Бид туслахад бэлэн байна.
            </p>
            <div className="mt-8">
                <Link href="/contact" className="inline-flex items-center gap-3 bg-zolGold text-white font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
                  <Phone size={18} />
                  Бидэнтэй холбогдоорой
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