import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex md:flex-row flex-col-reverse items-center justify-between text-left w-full px-10">
      <div className="flex items-center gap-4">
        <Image className="hidden md:block" src={assets.logo} alt="лого" />
        <div className="hidden md:block h-7 w-px bg-gray-500/60"></div>
        <p className="py-4 text-center text-xs md:text-sm text-gray-500">
          Зохиогчийн эрх 2025 © greatstack.dev. Бүх эрх хуулиар хамгаалагдсан.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <a href="#">
          <Image src={assets.facebook_icon} alt="Фэйсбүүк" />
        </a>
        <a href="#">
          <Image src={assets.twitter_icon} alt="Твиттер" />
        </a>
        <a href="#">
          <Image src={assets.instagram_icon} alt="Инстаграм" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
