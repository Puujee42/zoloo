// components/Newsletter.jsx

'use client'

import React from "react";
import { Mail } from "lucide-react"; // Харагдах байдлыг сайжруулахын тулд икон ашиглаж байна

/**
 * Үл хөдлөх хөрөнгийн шинэчлэлтийн талаарх мэдээллийг хэрэглэгчийн имэйлээр авах зорилготой мэдээллийн товхимолд бүртгүүлэх компонент.
 */
const Newsletter = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Жинхэнэ програмд та энд имэйлийг өөрийн маркетингийн үйлчилгээ рүү (жишээ нь, Mailchimp, ConvertKit) илгээх логикийг нэмэх болно.
    // Одоогийн байдлаар бид зүгээр л тэмдэглэж, хуудас дахин ачаалахаас сэргийлнэ.
    const email = e.target.elements.email.value;
    console.log("Мэдээллийн товхимолд бүртгүүлсэн:", email);
    alert("Бүртгүүлсэнд баярлалаа!"); // Хэрэглэгчид өгөх энгийн хариу үйлдэл
    e.target.reset(); // Маягтыг цэвэрлэх
  };

  return (
    // Зөөлөн дэвсгэр, зайтай хэсгийн контейнер
    <div className="bg-blue-50/50 py-16 md:py-24">
      <div className="container mx-auto px-6 md:px-8 lg:px-16 flex flex-col items-center">
        {/* Хэсгийн толгой */}
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Онцгой үл хөдлөх хөрөнгийн мэдээлэл авах
          </h2>
          <p className="mt-3 text-gray-600">
            Манай мэдээллийн товхимолд нэгдэж, хамгийн сүүлийн үеийн үл хөдлөх хөрөнгийн зарууд, зах зээлийн чиг хандлага, онцгой санал болгож буй хэлцлүүдийг шууд имэйл хаягаараа хүлээн аваарай.
          </p>
        </div>

        {/* Мэдээллийн товхимолын маягт */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center w-full max-w-lg gap-3"
        >
          <div className="relative flex-grow w-full">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} aria-hidden="true" />
            <input
              name="email"
              className="border border-gray-300 rounded-md h-14 w-full outline-none pl-12 pr-4 text-gray-800 focus:ring-2 focus:ring-blue-500 transition-shadow"
              type="email"
              placeholder="Имэйл хаягаа оруулна уу"
              aria-label="Имэйл хаяг"
              required
            />
          </div>
          {/* --- Apply the hover effect to the subscribe button --- */}
                    <button
            type="submit"
            className="px-8 h-14 w-full sm:w-auto text-white font-semibold bg-green rounded-md hover:bg-gold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Бүртгүүлэх
          </button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;