'use client'

import React from 'react';
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link'; // Link-ийг импортлох

const Navbar = () => {
  const router = useRouter();

  return (
    // --- 1. Navbar-ийн өндөр, доторх зайг нэмэгдүүлсэн ---
    <div className='flex items-center px-6 md:px-8 py-4 justify-between border-b border-gray-200 bg-white shadow-sm'>
      
      {/* --- 2. Логог үндсэн Navbar-тай ижил болгосон --- */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-3">
            <Image
                className="h-10 w-auto" // Логоны өндрийг тохируулсан
                src={assets.logo}
                alt="ZOL Logo"
                width={40}
                height={40}
                priority
            />
            <span className="hidden sm:block font-playfair font-bold text-3xl text-zolGreen">
                ZOL
            </span>
        </Link>
        
        <div className="h-7 w-px bg-gray-300 hidden md:block"></div>
        
        {/* --- 3. Гарчгийн өнгийг zolGreen болгосон --- */}
        <h1 className="text-lg font-semibold text-zolDark hidden md:block">
          Борлуулагчийн Самбар
        </h1>
      </div>

      {/* --- Баруун тал: Хэрэглэгчийн үйлдэл --- */}
      <div className="flex items-center">
        <div className="w-9 h-9">
            <UserButton afterSignOutUrl="/" />
        </div>
      </div>

    </div>
  )
}

export default Navbar;