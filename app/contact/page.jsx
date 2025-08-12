'use client'
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
    
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
    e.target.reset();
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              Have a question or want to schedule a tour? We'd love to hear from you. Reach out to us through any of the methods below.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="text" placeholder="Your Name" className="input-style" required />
                <input type="email" placeholder="Your Email" className="input-style" required />
                <textarea placeholder="Your Message" rows="5" className="input-style resize-none" required></textarea>
                <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-8">
                <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full"><MapPin className="h-6 w-6 text-blue-600"/></div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
                        <p className="text-gray-600">123 Real Estate Ave, Suite 500, Metropolis, USA 12345</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full"><Mail className="h-6 w-6 text-blue-600"/></div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Email Us</h3>
                        <p className="text-gray-600">contact@realestate.com</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-full"><Phone className="h-6 w-6 text-blue-600"/></div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
                        <p className="text-gray-600">+1 (234) 567-890</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <style jsx>{`
        .input-style {
            @apply block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6;
        }
      `}</style>
    </>
  );
};

export default ContactPage;