'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
    
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission here (e.g., API call)
    alert("Зурвас илгээсэнд баярлалаа! Бид тантай удахгүй эргэн холбогдох болно.");
    e.target.reset();
  };

  // --- 1. Input талбарын загварыг шинэчилсэн ---
  const inputStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-zolGold focus:ring-zolGold py-3 px-4 transition-colors duration-200";

  return (
    <>
      <Navbar />
      {/* --- 2. Дэвсгэрийг zolGreen/5 болгосон --- */}
      <div className="bg-zolGreen/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

          {/* --- 3. Гарчгийг Playfair фонттой болгосон --- */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-zolGreen">Бидэнтэй холбогдох</h1>
            <p className="mt-4 text-lg text-zolDark/80 leading-relaxed">
              Танд асуулт байна уу эсвэл үл хөдлөх хөрөнгөтэй танилцах цаг товлохыг хүсэж байна уу? Бид танаас сонсохдоо таатай байх болно. Доорх аргуудын аль нэгээр бидэнтэй холбогдоорой.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16">
            
            {/* --- 4. Холбоо барих маягтыг шинэчилсэн --- */}
            <div className="bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
              <h2 className="text-2xl font-semibold mb-6 text-zolDark">Бидэнд зурвас илгээх</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="sr-only">Таны нэр</label>
                  <input id="name" type="text" placeholder="Таны нэр" className={inputStyle} required />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Таны имэйл</label>
                  <input id="email" type="email" placeholder="Таны имэйл" className={inputStyle} required />
                </div>
                <div>
                  <label htmlFor="message" className="sr-only">Таны зурвас</label>
                  <textarea id="message" placeholder="Таны зурвас" rows="5" className={`${inputStyle} resize-none`} required></textarea>
                </div>
                {/* --- Товчлуурыг zolGold болгосон --- */}
                <button 
                  type="submit" 
                  className="w-full bg-zolGold text-white font-semibold py-3 px-6 rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
                >
                  Зурвас илгээх
                </button>
              </form>
            </div>
            
            {/* --- 5. Холбоо барих мэдээллийн хэсгийг шинэчилсэн --- */}
            <div className="space-y-10 pt-4">
                <div className="flex items-start gap-5">
                    <div className="bg-zolGreen/10 p-4 rounded-full"><MapPin className="h-7 w-7 text-zolGreen"/></div>
                    <div>
                        <h3 className="text-xl font-semibold text-zolDark">Манай оффис</h3>
                        <p className="mt-1 text-zolDark/80">123 ZOL өргөн чөлөө, 500 тоот, Улаанбаатар, Монгол 12345</p>
                    </div>
                </div>
                <div className="flex items-start gap-5">
                    <div className="bg-zolGreen/10 p-4 rounded-full"><Mail className="h-7 w-7 text-zolGreen"/></div>
                    <div>
                        <h3 className="text-xl font-semibold text-zolDark">Бидэнд имэйл илгээх</h3>
                        <a href="mailto:contact@zol.mn" className="mt-1 text-zolDark/80 hover:text-zolGold transition-colors">contact@zol.mn</a>
                    </div>
                </div>
                <div className="flex items-start gap-5">
                    <div className="bg-zolGreen/10 p-4 rounded-full"><Phone className="h-7 w-7 text-zolGreen"/></div>
                    <div>
                        <h3 className="text-xl font-semibold text-zolDark">Бидэн рүү залгах</h3>
                        <a href="tel:+97688000000" className="mt-1 text-zolDark/80 hover:text-zolGold transition-colors">+976 8800-0000</a>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;