// /app/page.jsx (or your main home page file)

import React from 'react';
import HeaderSlider from '@/components/HeaderSlider';      // The new, modern hero slider
import RecentProperties from '@/components/RecentProperties'; // The new component for latest listings
import FeaturedProperties from '@/components/FeaturedProperties'; // The new component for premium listings
import Newsletter from '@/components/Newsletter';         // The new, refactored newsletter
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinancialNewsSlider from '@/components/FinancialNewsSlider';

const HomePage = () => {
  return (
    <>
      {/* Navbar is at the top of the page */}
      <Navbar />
      
      {/* Main content container with consistent padding */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero section to capture attention */}
        <HeaderSlider />
        
        {/* 2. Featured properties to showcase the best listings */}
        <FeaturedProperties />
        
        {/* 3. Recently added properties to show freshness and activity */}
        <RecentProperties />

      </main>
      
      {/* 4. Newsletter section to capture leads, often placed before the footer */}
      <FinancialNewsSlider />
      
      {/* Footer is at the bottom of the page */}
      <Footer />
    </>
  );
};

export default HomePage;