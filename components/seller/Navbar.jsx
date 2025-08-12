'use client'

import React from 'react';
import { assets } from '@/assets/assets'; // Ensure this path is correct for your project
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { UserButton } from '@clerk/nextjs'; // Importing the UserButton component from Clerk

const Navbar = () => {
  const router = useRouter();

  return (
    // The main container with a thematic green bottom border and a subtle shadow.
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b border-green-200 bg-white shadow-sm'>
      
      {/* --- Left Side: Logo and Dashboard Title --- */}
      <div className="flex items-center gap-4">
        {/* The clickable logo with a hover effect for better UX. */}
        <Image 
          onClick={() => router.push('/')} 
          className='w-28 cursor-pointer transition-opacity hover:opacity-80' 
          src={assets.logo} 
          alt="Лого"
          width={120} // Added for Next.js Image optimization
          height={40} // Added for Next.js Image optimization
          priority // Prioritizes loading the logo, which is often a key visual element.
        />
        
        {/* A visual separator that only appears on medium screens and larger. */}
        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
        
        {/* The themed title, styled with the primary brand color (deep green). */}
        <h1 className="text-lg font-bold text-green-900 hidden md:block">
          Борлуулагчийн Хяналтын самбар
        </h1>
      </div>

      {/* --- Right Side: User Actions --- */}
      <div className="flex items-center">
        {/* 
          This pre-built UserButton from Clerk automatically handles all
          user authentication actions like showing the profile picture and
          providing a sign-out option.
        */}
        <UserButton afterSignOutUrl="/" />
      </div>

    </div>
  )
}

export default Navbar;