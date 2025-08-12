'use client'

import {React, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { List, MessageSquare, Tag, KeyRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// A small, reusable component for statistic cards with themed colors.
const StatCard = ({ title, value, icon, isLoading }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 border border-gray-200">
        {isLoading ? (
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
        ) : (
            // Themed icon background
            <div className="bg-green-100 p-3 rounded-full">{icon}</div>
        )}
        <div>
            <p className="text-sm text-gray-500">{title}</p>
            {isLoading ? (
                <div className="h-7 w-12 bg-gray-300 rounded mt-1 animate-pulse"></div>
            ) : (
                <p className="text-2xl font-bold text-green-900">{value}</p>
            )}
        </div>
    </div>
);

// The main Dashboard Page component.
const SellerDashboardPage = () => {
    const { user } = useAppContext();
    const router = useRouter();

    const [listings, setListings] = useState([]);
    const [stats, setStats] = useState({ total: 0, forSale: 0, forRent: 0, inquiries: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const [recentInquiries, setRecentInquiries] = useState([
        { _id: 'inq1', buyerName: 'Элис Жонсон', propertyTitle: 'Хотын төвийн орчин үеийн пентхаус', date: new Date() },
        { _id: 'inq2', buyerName: 'Боб Вильямс', propertyTitle: 'Хотын захад байрлах тухтай газар', date: new Date() },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/property/seller-list');
                const data = await response.json();

                if (data.success) {
                    const properties = data.properties;
                    setListings(properties);
                    const forSaleCount = properties.filter(p => p.status === 'For Sale').length;
                    const forRentCount = properties.filter(p => p.status === 'For Rent').length;
                    setStats({
                        total: properties.length,
                        forSale: forSaleCount,
                        forRent: forRentCount,
                        inquiries: recentInquiries.length,
                    });
                } else {
                    toast.error("Заруудыг татахад алдаа гарлаа.");
                }
            } catch (error) {
                toast.error("Өгөгдөл татах үед алдаа гарлаа.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    const recentListings = listings.slice(0, 5);

    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-8">
                {/* Themed heading */}
                <h1 className="text-3xl font-bold text-green-900">Тавтай морил, {user?.firstName || 'Борлуулагч'}!</h1>
                <p className="text-gray-600">Таны үйл ажиллагааны тойм энд байна.</p>
            </div>

            {/* Statistics Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Themed Stat Cards */}
                <StatCard title="Нийт зарууд" value={stats.total} icon={<List className="text-green-700"/>} isLoading={isLoading} />
                <StatCard title="Нийт лавлагаанууд" value={stats.inquiries} icon={<MessageSquare className="text-green-700"/>} isLoading={isLoading} />
                <StatCard title="Зарах үл хөдлөх хөрөнгө" value={stats.forSale} icon={<Tag className="text-green-700"/>} isLoading={isLoading} />
                <StatCard title="Түрээслүүлэх үл хөдлөх хөрөнгө" value={stats.forRent} icon={<KeyRound className="text-amber-700"/>} isLoading={isLoading} />
            </div>

            {/* Recent Activity Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Listings */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Сүүлийн үеийн зарууд</h2>
                        {/* Themed "View All" link */}
                        <Link href="/seller/my-listings" className="text-sm font-semibold text-amber-600 hover:underline">Бүгдийг харах</Link>
                    </div>
                    <div className="space-y-4">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="flex items-center gap-4 animate-pulse">
                                    <div className="h-16 w-16 bg-gray-200 rounded-md"></div>
                                    <div className="flex-1 space-y-2"><div className="h-4 bg-gray-300 rounded w-3/4"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div>
                                </div>
                            ))
                        ) : recentListings.length > 0 ? (
                            recentListings.map(property => (
                                <div key={property._id} className="flex items-center gap-4 hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors" onClick={() => router.push(`/property/${property._id}`)}>
                                    <Image src={property.images[0]} alt={property.title} width={64} height={64} className="h-16 w-16 rounded-md object-cover" />
                                    <div>
                                        <p className="font-semibold text-gray-900">{property.title}</p>
                                        {/* Themed price text */}
                                        <p className="text-sm text-green-800 font-bold">${property.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">Та одоогоор ямар ч зар бүртгүүлээгүй байна.</p>
                        )}
                    </div>
                </div>

                {/* Recent Inquiries */}
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-gray-800">Сүүлийн үеийн лавлагаанууд</h2>
                        {/* Themed "View All" link */}
                        <Link href="/seller/inquiries" className="text-sm font-semibold text-amber-600 hover:underline">Бүгдийг харах</Link>
                    </div>
                    <div className="space-y-4">
                        {isLoading ? (
                             Array.from({ length: 2 }).map((_, index) => (
                                <div key={index} className="space-y-2 animate-pulse p-2"><div className="h-4 bg-gray-300 rounded w-full"></div><div className="h-4 bg-gray-200 rounded w-2/3"></div></div>
                            ))
                        ) : recentInquiries.length > 0 ? (
                            recentInquiries.map(inquiry => (
                                <div key={inquiry._id} className="p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => router.push('/seller/inquiries')}>
                                    <p className="font-semibold text-gray-900">{inquiry.buyerName}</p>
                                    <p className="text-sm text-gray-600">Лавласан зүйл: <span className="font-medium">{inquiry.propertyTitle}</span></p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(inquiry.date).toLocaleString()}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-center py-4">Танд шинэ лавлагаа байхгүй байна.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardPage;