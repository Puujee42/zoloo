// /app/seller/page.jsx
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { List, Tag, KeyRound } from 'lucide-react';

// Simple stat card
const StatCard = ({ label, value, icon }) => (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-4 hover:-translate-y-1 transition-transform duration-200">
        <div className="p-3 bg-zolGreen/10 rounded-full">{React.cloneElement(icon, { className: 'text-zolGreen' })}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-bold text-lg text-gray-900">{value}</p>
        </div>
    </div>
);

const SellerDashboardPage = () => {
    const { user } = useAppContext();
    const router = useRouter();

    const [listings, setListings] = useState([]);
    const [stats, setStats] = useState({ total: 0, forSale: 0, forRent: 0 });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    return (
        <div className="min-h-screen bg-zolGreen/5 p-8">
            <h1 className="text-3xl font-bold text-zolGreen mb-6">
                Тавтай морил, {user?.firstName || 'Борлуулагч'}!
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
                <StatCard label="Нийт зар" value={stats.total} icon={<List size={20} />} />
                <StatCard label="Зарагдах" value={stats.forSale} icon={<Tag size={20} />} />
                <StatCard label="Түрээслэх" value={stats.forRent} icon={<KeyRound size={20} />} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="animate-pulse bg-white h-40 rounded-xl shadow"></div>
                    ))
                    : listings.length > 0
                        ? listings.map((listing) => (
                            <div
                                key={listing._id}
                                className="bg-white rounded-xl shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
                                onClick={() => router.push(`/property/${listing._id}`)}
                            >
                                <Image
                                    src={listing.images?.[0] || '/default-property.jpg'}
                                    alt={listing.title}
                                    width={300}
                                    height={180}
                                    className="rounded-md object-cover mb-3"
                                />
                                <p className="font-semibold text-gray-900">{listing.title}</p>
                                <p className="text-sm text-zolGreen font-semibold mt-1">
                                    ₮{listing.price.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">{listing.status}</p>
                            </div>
                        ))
                        : <p className="text-center text-gray-500 col-span-full">Одоогоор зар байхгүй байна.</p>
                }
            </div>
        </div>
    );
};

export default SellerDashboardPage;
