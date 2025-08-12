import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Building, Users, Target } from 'lucide-react';

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          
          {/* Header Section */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">About Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              We are a dedicated team of real estate professionals committed to helping you find your perfect home. Our mission is to make the buying and selling process seamless and successful.
            </p>
          </div>

          {/* Core Values Section */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <Target className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Our Mission</h3>
              <p className="mt-2 text-gray-600">To provide unparalleled service and expert guidance in every real estate transaction.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Our Vision</h3>
              <p className="mt-2 text-gray-600">To be the most trusted and respected real estate agency in the community.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">Our Team</h3>
              <p className="mt-2 text-gray-600">A passionate group of experienced agents ready to work for you.</p>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutPage;