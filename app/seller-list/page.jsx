
// /app/seller-list/page.jsx
'use client'

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Briefcase, Mail, UserSearch } from 'lucide-react';
import toast from 'react-hot-toast';

// Борлуулагчийн мэдээллийг харуулах дахин ашиглагдах карт
const SellerCard = ({ seller }) => {
  const router = useRouter();

  const handleViewListings = (e) => {
    e.stopPropagation();
    // Энэ борлуулагчийн бүх зарыг харуулах хайлтын хуудас руу үсрэх
    router.push(`/search?sellerId=${seller._id}`);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center hover:-translate-y-2 transition-transform duration-300 group">
      <Image
        src={seller.image || '/default-agent.png'}
        alt={seller.name}
        width={100}
        height={100}
        className="rounded-full border-4 border-zolGold object-cover shadow-md"
      />
      <h3 className="mt-4 text-xl font-semibold text-zolGreen">{seller.name}</h3>
      <div className="flex items-center gap-2 mt-1 text-sm text-zolDark/70">
          <Mail size={14}/>
          <span>{seller.email}</span>
      </div>
      
      <div className="my-4 h-px w-3/4 bg-gray-200"></div>
      
      <div className="flex items-center gap-2 text-zolDark">
          <Briefcase size={16} className="text-zolGold"/>
          <strong className="font-semibold">{seller.propertyCount || 0}</strong> зар бүртгэлтэй
      </div>

      <button
        onClick={handleViewListings}
        className="mt-6 w-full bg-zolGreen text-white font-semibold py-2.5 rounded-lg hover:bg-opacity-90 transition-colors"
      >
        Зарууд харах
      </button>
    </div>
  );
};

// Борлуулагчийн картын Skeleton Loader
const SellerCardSkeleton = () => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center animate-pulse">
        <div className="w-24 h-24 rounded-full bg-gray-200"></div>
        <div className="h-6 w-3/4 bg-gray-200 rounded-md mt-4"></div>
        <div className="h-4 w-1/2 bg-gray-200 rounded-md mt-2"></div>
        <div className="my-4 h-px w-3/4 bg-gray-200"></div>
        <div className="h-5 w-1/3 bg-gray-200 rounded-md"></div>
        <div className="mt-6 w-full h-10 bg-gray-200 rounded-lg"></div>
    </div>
);

// Үндсэн хуудас
const SellerListPage = () => {
    const [sellers, setSellers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSellers = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/user/sellers');
                const data = await response.json();
                if (data.success) {
                    setSellers(data.data);
                } else {
                    throw new Error(data.message || "Мэдээлэл татахад алдаа гарлаа.");
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSellers();
    }, []);

    return (
        <>
            <Navbar />
            <div className="bg-zolGreen/5 min-h-screen">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-16">
                        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-zolGreen">Манай Агентууд</h1>
                        <p className="mt-4 text-lg text-zolDark/80 max-w-2xl mx-auto">
                            Таны хэрэгцээнд нийцсэн үл хөдлөх хөрөнгийг олоход туслах мэргэжлийн, туршлагатай баг.
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {Array.from({ length: 4 }).map((_, i) => <SellerCardSkeleton key={i} />)}
                        </div>
                    ) : sellers.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {sellers.map(seller => <SellerCard key={seller._id} seller={seller} />)}
                        </div>
                    ) : (
                        <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center">
                            <UserSearch size={48} className="mx-auto text-zolGold/50 mb-4" strokeWidth={1.5} />
                            <h2 className="text-2xl font-semibold text-zolDark">Борлуулагч олдсонгүй</h2>
                            <p className="mt-2 text-zolDark/70">Одоогоор бүртгэлтэй борлуулагч байхгүй байна.</p>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SellerListPage;
