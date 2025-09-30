
'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from "framer-motion";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Зурвас илгээсэнд баярлалаа! Бид тантай удахгүй эргэн холбогдох болно.");
    e.target.reset();
  };

  const inputStyle =
    "block w-full rounded-xl border border-gray-200 shadow-sm focus:border-zolGold focus:ring-2 focus:ring-zolGold/40 py-3 px-4 transition duration-200 bg-white/70 backdrop-blur";

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <>
      <Navbar />
      <div className="relative bg-gradient-to-b from-zolGreen/10 via-white to-zolGreen/5">
        
        {/* Background Accent */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-zolGold/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-zolGreen/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-playfair text-4xl md:text-5xl font-bold text-zolGreen drop-shadow-sm">
              Бидэнтэй холбогдох
            </h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="mt-4 text-lg text-zolDark/80 leading-relaxed"
            >
              Та үл хөдлөх хөрөнгийн талаар илүү ихийг мэдэхийг хүсэж байна уу эсвэл зөвлөгөө авахыг хүсэж байна уу?  
              Бид танаас сонсохдоо үргэлж баяртай байх болно.
            </motion.p>
          </motion.div>

          {/* Form + Info */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16"
          >
            {/* Contact Form */}
            <motion.div
              variants={itemVariants}
              className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-6 text-zolDark">Бидэнд зурвас илгээх</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input id="name" type="text" placeholder="Таны нэр" className={inputStyle} required />
                </div>
                <div>
                  <input id="email" type="email" placeholder="Таны имэйл" className={inputStyle} required />
                </div>
                <div>
                  <textarea id="message" placeholder="Таны зурвас" rows={5} className={`${inputStyle} resize-none`} required></textarea>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 250 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-zolGold to-yellow-500 text-white font-semibold py-3 px-6 rounded-lg hover:opacity-95 transition-all shadow-md"
                >
                  ✨ Зурвас илгээх
                </motion.button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={containerVariants} className="space-y-10 pt-4">
              {[
                { Icon: MapPin, title: "Манай оффис", text: "123 ZOL өргөн чөлөө, Улаанбаатар, Монгол" },
                { Icon: Mail, title: "Имэйл", text: "contact@zol.mn", link: "mailto:contact@zol.mn" },
                { Icon: Phone, title: "Утас", text: "+976 8800-0000", link: "tel:+97688000000" }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={itemVariants} 
                  className="flex items-start gap-5 p-5 rounded-xl bg-white/70 backdrop-blur border border-gray-200/50 shadow-sm hover:shadow-md transition"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1, rotate: 5 }} 
                    className="bg-zolGreen/10 p-4 rounded-full"
                  >
                    <item.Icon className="h-7 w-7 text-zolGreen" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-zolDark">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} className="mt-1 text-zolDark/80 hover:text-zolGold transition-colors">
                        {item.text}
                      </a>
                    ) : (
                      <p className="mt-1 text-zolDark/80">{item.text}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactPage;
