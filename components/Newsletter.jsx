// /app/components/Newsletter.jsx
'use client'

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Mail, TrendingUp } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // TODO: Replace this with a real API call to your backend.
    // This function will handle subscribing the user to a service like Mailchimp, ConvertKit, etc.
    console.log(`Subscribing email: ${email}`);

    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast.success('Thank you for subscribing! Please check your email.');
    
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <section className="bg-green-50/50 py-16 sm:py-24">
      <div className="container mx-auto max-w-2xl text-center px-4">
        <div className="flex justify-center items-center mx-auto h-16 w-16 rounded-full bg-yellow-100 border-2 border-yellow-200">
          <TrendingUp className="h-8 w-8 text-yellow-600" />
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-green-900 sm:text-4xl">
          Unlock Financial Wisdom in Real Estate
        </h2>
        <p className="mt-4 text-lg leading-8 text-gray-600">
          Join our newsletter to receive expert analysis, market trends, and investment strategies directly to your inbox. Make smarter financial decisions today.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row items-center gap-4 max-w-lg mx-auto">
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-auto w-full rounded-md border-0 bg-white px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto rounded-md bg-yellow-400 px-6 py-3 text-sm font-semibold text-black shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}