import React from "react";
import { assets } from "@/assets/assets"; // Assuming assets include a logo and social icons
import Image from "next/image";
import Link from "next/link";

// Fictional Icons for UI (replace with actual icon components e.g., from lucide-react or similar)
const SocialIcon = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
    {children}
  </a>
);

const FacebookIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">...</svg>; // Add SVG path
const TwitterIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">...</svg>; // Add SVG path
const InstagramIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">...</svg>; // Add SVG path
const LinkedinIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">...</svg>; // Add SVG path


const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-800 mt-20 md:mt-28">
      <div className="container mx-auto px-6 md:px-8 lg:px-16 py-16">
        {/* Top Section with Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mb-12 border-b pb-12">
            <div className="lg:col-span-1">
                <Image className="w-32" src={assets.logo} alt="logo" />
                 <p className="mt-4 text-sm text-gray-600 max-w-sm">
                    Your trusted partner in finding the perfect property. We are dedicated to making your real estate journey seamless and successful.
                </p>
            </div>
            <div className="lg:col-span-2">
                <h3 className="text-xl font-semibold text-gray-800">Stay Updated</h3>
                <p className="text-gray-600 mt-1">Join our newsletter to get the latest properties and news.</p>
                <form className="mt-4 flex flex-col sm:flex-row gap-3">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-grow px-4 py-2.5 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label="Email for newsletter"
                    />
                    <button type="submit" className="bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-md hover:bg-blue-700 transition-colors">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>

        {/* Bottom Section with Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 text-sm">
          {/* Contact Info - Spans 2 cols on smaller screens */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <h2 className="font-semibold text-gray-900 mb-4">Get in Touch</h2>
            <div className="space-y-3 text-gray-600">
              <p>123 Real Estate Ave, Suite 500<br/>Metropolis, USA 12345</p>
              <p>+1 (234) 567-890</p>
              <p>contact@realestate.com</p>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-4">Company</h2>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/about" className="hover:text-blue-600 hover:underline">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 hover:underline">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-blue-600 hover:underline">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-blue-600 hover:underline">Blog</Link></li>
            </ul>
          </div>

           {/* Properties Links */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-4">Properties</h2>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/properties/for-sale" className="hover:text-blue-600 hover:underline">For Sale</Link></li>
              <li><Link href="/properties/for-rent" className="hover:text-blue-600 hover:underline">For Rent</Link></li>
              <li><Link href="/featured-properties" className="hover:text-blue-600 hover:underline">Featured</Link></li>
              <li><Link href="/submit-property" className="hover:text-blue-600 hover:underline">Submit Property</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h2 className="font-semibold text-gray-900 mb-4">Legal</h2>
            <ul className="space-y-3 text-gray-600">
              <li><Link href="/privacy-policy" className="hover:text-blue-600 hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-blue-600 hover:underline">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-600 hover:underline">Disclaimer</Link></li>
            </ul>
          </div>

            {/* Social Media */}
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
                <h2 className="font-semibold text-gray-900 mb-4">Follow Us</h2>
                <div className="flex items-center gap-4">
                  {/* Replace with your actual social icons */}
                  <SocialIcon href="#"><FacebookIcon /></SocialIcon>
                  <SocialIcon href="#"><TwitterIcon /></SocialIcon>
                  <SocialIcon href="#"><InstagramIcon /></SocialIcon>
                  <SocialIcon href="#"><LinkedinIcon /></SocialIcon>
                </div>
            </div>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
          <p className="text-center text-xs md:text-sm text-gray-600">
            Copyright © {new Date().getFullYear()} RealEstate Inc. All Rights Reserved.
          </p>
      </div>
    </footer>
  );
};

export default Footer;