// /app/seller/page.jsx
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { List, Tag, KeyRound, Loader } from 'lucide-react'; // <-- Import Loader
import { motion } from 'framer-motion';

// Simple stat card
const StatCard = ({ label, value, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
        className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200"
    >
        <div className="p-3 bg-zolGreen/10 rounded-full">
            {React.cloneElement(icon, { className: 'text-zolGreen' })}
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-bold text-lg text-gray-900">{value}</p>
        </div>
    </motion.div>
);

const SellerDashboardPage = () => {
    // FIX #1: Get the loading state from your context. I've named it 'isUserLoading'
    // to avoid conflict with the listings loading state.
    const { user, isLoading: isUserLoading } = useAppContext();
    const router = useRouter();

    const [listings, setListings] = useState([]);
    const [stats, setStats] = useState({ total: 0, forSale: 0, forRent: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Only fetch listings if we have confirmed there is a user.
        if (user) {
            const fetchListings = async () => {
                setIsLoading(true);
                try {
                    const res = await fetch('/api/property/seller-list');
                    const data = await res.json();
                    
                    if (data.success) {
                        const properties = data.properties;
                        setListings(properties);

                        setStats({
                            total: properties.length,
                            forSale: properties.filter(p => p.status === 'Зарагдана').length,
                            forRent: properties.filter(p => p.status === 'Түрээслүүлнэ').length,
                        });
                    } else {
                        toast.error(data.message || "Заруудыг татахад алдаа гарлаа.");
                    }
                } catch (err) {
                    toast.error("Өгөгдөл татах үед алдаа гарлаа.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchListings();
        } else if (!isUserLoading) {
            // If user loading is finished and there's still no user, stop loading listings.
            setIsLoading(false);
        }
    }, [user, isUserLoading]); // <-- Add isUserLoading as a dependency

    // FIX #2: Add a loading state for the user context. This is the main fix.
    // This will display while your AppContext is fetching the user from Clerk.
    if (isUserLoading) {
        return (
            <div className="min-h-screen bg-zolGreen/5 p-8 flex items-center justify-center">
                <Loader className="animate-spin text-zolGreen" size={40} />
            </div>
        );
    }
    
    // FIX #3: Add a state for when the user is not found after loading.
    if (!user) {
         return (
            <div className="min-h-screen bg-zolGreen/5 p-8 text-center">
                 <h1 className="text-2xl font-bold text-red-600 mb-4">Хандах эрхгүй</h1>
                 <p className="text-gray-600">Хэрэглэгчийн мэдээлэл олдсонгүй. Та дахин нэвтэрч орно уу.</p>
                 <button onClick={() => router.push('/sign-in')} className="mt-6 bg-zolGreen text-white font-bold py-2 px-6 rounded-lg">
                     Нэвтрэх
                 </button>
            </div>
         );
    }

    return (
        <div className="min-h-screen bg-zolGreen/5 p-8">
            {/* Heading */}
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl font-bold text-zolGreen mb-6"
            >
                Тавтай морил, {user?.firstName || 'Борлуулагч'}!
            </motion.h1>

            {/* Stat cards with stagger */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <StatCard label="Нийт зар" value={stats.total} icon={<List size={20} />} delay={0.1} />
                <StatCard label="Зарагдах" value={stats.forSale} icon={<Tag size={20} />} delay={0.2} />
                <StatCard label="Түрээслэх" value={stats.forRent} icon={<KeyRound size={20} />} delay={0.3} />
            </div>

            {/* Listings */}
            <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                {isLoading
                    ? Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="bg-white h-60 rounded-xl shadow p-4 animate-pulse" />
                    ))
                    : listings.length > 0
                        ? listings.map((listing) => (
                            <motion.div
                                key={listing._id}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className="bg-white rounded-xl shadow overflow-hidden cursor-pointer group"
                                onClick={() => router.push(`/property/${listing._id}`)}
                            >
                                <div className="relative h-40">
                                    <Image
                                        src={(listing.images && listing.images.length > 0) ? listing.images[0] : '/default-property.jpg'}
                                        alt={listing.title || 'Property Image'}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <p className="font-semibold text-gray-900 truncate">{listing.title}</p>
                                    <p className="text-sm text-zolGreen font-semibold mt-1">
                                        ₮{(listing.price || 0).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">{listing.status}</p>
                                </div>
                            </motion.div>
                        ))
                        : <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-gray-500 col-span-full mt-10"
                        >
                            Одоогоор таны нэмсэн зар байхгүй байна.
                        </motion.p>
                }
            </motion.div>
        </div>
    );
};

export default SellerDashboardPage;