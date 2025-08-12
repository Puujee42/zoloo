// /components/seller/Navbar.jsx

'use client'

import React from 'react'
import { assets } from '../../assets/assets' // Make sure this path is correct
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { UserButton } from '@clerk/nextjs' // Import the UserButton component

const Navbar = () => {
  const router = useRouter();

  return (
    <div className='flex items-center px-4 md:px-8 py-3 justify-between border-b bg-white'>
      
      {/* --- Left Side: Logo and Dashboard Title --- */}
      <div className="flex items-center gap-4">
        <Image 
          onClick={() => router.push('/')} 
          className='w-28 cursor-pointer' 
          src={assets.logo} 
          alt="Logo"
          width={112} // Added for Next.js Image optimization
          height={32} // Added for Next.js Image optimization
        />
        {/* Separator and Title for larger screens */}
        <div className="h-6 w-px bg-gray-200 hidden md:block"></div>
        <h1 className="text-lg font-semibold text-gray-700 hidden md:block">
          Seller Dashboard
        </h1>
      </div>

      {/* --- Right Side: User Actions --- */}
      <div className="flex items-center">
        {/* 
          This UserButton from Clerk automatically handles:
          - Displaying the user's profile picture.
          - Opening a menu on click.
          - The "Sign Out" logic.
        */}
        <UserButton afterSignOutUrl="/" />
      </div>

    </div>
  )
}

export default Navbar;