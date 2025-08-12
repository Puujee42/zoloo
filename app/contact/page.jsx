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

  // Consistent styling for input fields
  const inputStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring focus:ring-amber-500 focus:ring-opacity-50 py-2.5 px-3";

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-green-900">Бидэнтэй холбогдох</h1>
            <p className="mt-4 text-lg text-gray-600">
              Танд асуулт байна уу эсвэл үл хөдлөх хөрөнгөтэй танилцах цаг товлохыг хүсэж байна уу? Бид танаас сонсохдоо таатай байх болно. Доорх аргуудын аль нэгээр бидэнтэй холбогдоорой.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            
            {/* Contact Form with Green and Gold Theme */}
            <div className="bg-white p-8 rounded-xl shadow-xl border border-gray-200">
              <h2 className="text-2xl font-bold mb-6 text-green-900">Бидэнд зурвас илгээх</h2>
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
                <button 
                  type="submit" 
                  className="w-full bg-amber-500 text-green-900 font-bold py-3 px-6 rounded-lg hover:bg-amber-600 transition-all transform hover:scale-105 shadow-md"
                >
                  Зурвас илгээх
                </button>
              </form>
            </div>
            
            {/* Contact Information with Themed Icons */}
            <div className="space-y-10 pt-4">
                <div className="flex items-start gap-5">
                    <div className="bg-green-100 p-4 rounded-full"><MapPin className="h-7 w-7 text-green-800"/></div>
                    <div>
                        <h3 className="text-xl font-bold text-green-900">Манай оффис</h3>
                        <p className="mt-1 text-gray-600">123 Үл хөдлөх хөрөнгийн гудамж, 500 тоот, Метрополис, АНУ 12345</p>
                    </div>
                </div>
                <div className="flex items-start gap-5">
                    <div className="bg-green-100 p-4 rounded-full"><Mail className="h-7 w-7 text-green-800"/></div>
                    <div>
                        <h3 className="text-xl font-bold text-green-900">Бидэнд имэйл илгээх</h3>
                        <a href="mailto:contact@realestate.com" className="mt-1 text-gray-600 hover:text-amber-600 transition-colors">contact@realestate.com</a>
                    </div>
                </div>
                <div className="flex items-start gap-5">
                    <div className="bg-green-100 p-4 rounded-full"><Phone className="h-7 w-7 text-green-800"/></div>
                    <div>
                        <h3 className="text-xl font-bold text-green-900">Бидэн рүү залгах</h3>
                        <a href="tel:+1234567890" className="mt-1 text-gray-600 hover:text-amber-600 transition-colors">+1 (234) 567-890</a>
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