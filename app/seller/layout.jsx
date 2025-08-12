// /app/seller/layout.jsx

'use client'

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext'; // Adjust path if needed
import toast from 'react-hot-toast';
import Navbar from '@/components/seller/Navbar';   // Seller-specific Navbar
import Sidebar from '@/components/seller/Sidebar'; // Seller-specific Sidebar

const SellerLayout = ({ children }) => {
  const { isSeller, isLoading } = useAppContext();
  const router = useRouter();

  // This effect hook runs when the loading state or seller status changes.
  useEffect(() => {
    // Wait until the authentication check is complete.
    if (!isLoading) {
      // If the check is done and the user is NOT a seller, block access.
      if (!isSeller) {
        toast.error("Access Denied: Seller account required.");
        router.push('/'); // Redirect them to the homepage.
      }
    }
  }, [isLoading, isSeller, router]);

  // While checking the user's status, show a full-screen loading state.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-gray-600">Verifying seller access...</p>
      </div>
    );
  }

  // If the user IS a seller, render the protected dashboard layout.
  // If they are not a seller, render nothing (null) while the redirect happens.
  // This prevents them from seeing a "flash" of the protected content.
  return isSeller ? (
    <div className="bg-gray-50 min-h-screen">
      <Navbar />
      <div className='flex w-full'>
        <Sidebar />
        <main className="flex-1 p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  ) : null;
};

export default SellerLayout;