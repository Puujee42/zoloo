// /app/seller/page.jsx
'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import { List, MessageSquare, Tag, KeyRound } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Статистикийн картыг брэндийн загварт нийцүүлсэн
const StatCard = ({ title, value, icon, iconBgColor = 'bg-zolGreen/10', iconColor = 'text-zolGreen', isLoading }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex items-center gap-4 hover:-translate-y-1 transition-transform duration-300">
        {isLoading ? (
            <div className="h-12 w-12 rounded-full bg-gray-200 animate-pulse"></div>
        ) : (
            <div className={`${iconBgColor} p-3 rounded-full`}>{React.cloneElement(icon, { className: iconColor })}</div>
        )}
        <div>
            <p className="text-sm text-zolDark/70">{title}</p>
            {isLoading ? (
                <div className="h-7 w-12 bg-gray-300 rounded mt-1 animate-pulse"></div>
            ) : (
                <p className="text-2xl font-bold text-zolDark">{value}</p>
            )}
        </div>
    </div>
);

const SellerDashboardPage = () => {
    const { user } = useAppContext();
    const router = useRouter();

    const [listings, setListings] = useState([]);
    const [stats, setStats] = useState({ total: 0, forSale: 0, forRent: 0, inquiries: 0 });
    const [isLoading, setIsLoading] = useState(true);

    const [recentInquiries, setRecentInquiries] = useState([]); // Will be fetched from API

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // Fetch listings and inquiries in parallel
                const [listingsRes, inquiriesRes] = await Promise.all([
                    fetch('/api/property/seller-list'),
                    fetch('/api/inquiries') // Assuming you have this endpoint
                ]);

                const listingsData = await listingsRes.json();
                const inquiriesData = await inquiriesRes.json();

                if (listingsData.success) {
                    const properties = listingsData.properties;
                    setListings(properties);
                    const forSaleCount = properties.filter(p => p.status === 'Зарагдана').length;
                    const forRentCount = properties.filter(p => p.status === 'Түрээслүүлнэ').length;
                    
                    if(inquiriesData.success) {
                        setRecentInquiries(inquiriesData.data.slice(0, 3)); // Get latest 3 inquiries
                        setStats({
                            total: properties.length,
                            forSale: forSaleCount,
                            forRent: forRentCount,
                            inquiries: inquiriesData.data.length,
                        });
                    }
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
        <div className="w-full bg-zolGreen/5 p-8 rounded-lg min-h-full">
            <div className="mb-8">
                {/* --- Гарчгийг Playfair фонттой болгосон --- */}
                <h1 className="font-playfair text-3xl font-bold text-zolGreen">Тавтай морил, {user?.firstName || 'Борлуулагч'}!</h1>
                <p className="text-zolDark/70">Таны үйл ажиллагааны тойм энд байна.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                <StatCard title="Нийт зар" value={stats.total} icon={<List size={22} />} isLoading={isLoading} />
                <StatCard title="Нийт хүсэлт" value={stats.inquiries} icon={<MessageSquare size={22} />} isLoading={isLoading} />
                <StatCard title="Зарагдах" value={stats.forSale} icon={<Tag size={22} />} iconBgColor="bg-blue-100" iconColor="text-blue-600" isLoading={isLoading} />
                <StatCard title="Түрээслэх" value={stats.forRent} icon={<KeyRound size={22} />} iconBgColor="bg-zolGold/10" iconColor="text-zolGold" isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-zolDark">Сүүлийн зарууд</h2>
                        <Link href="/seller/my-listings" className="text-sm font-semibold text-zolGold hover:underline">Бүгдийг харах</Link>
                    </div>
                    <div className="space-y-4">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="flex items-center gap-4 animate-pulse p-2"><div className="h-16 w-16 bg-gray-200 rounded-md"></div><div className="flex-1 space-y-2"><div className="h-4 bg-gray-300 rounded w-3/4"></div><div className="h-4 bg-gray-200 rounded w-1/2"></div></div></div>
                            ))
                        ) : recentListings.length > 0 ? (
                            recentListings.map(property => (
                                <div key={property._id} className="flex items-center gap-4 hover:bg-zolGold/5 p-2 rounded-md cursor-pointer transition-colors" onClick={() => router.push(`/property/${property._id}`)}>
                                    <Image src={property.images[0]} alt={property.title} width={64} height={64} className="h-16 w-16 rounded-md object-cover border" />
                                    <div>
                                        <p className="font-semibold text-zolDark">{property.title}</p>
                                        <p className="text-sm text-zolGreen font-semibold">₮{property.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-zolDark/70 text-center py-4">Та одоогоор зар оруулаагүй байна.</p>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold text-zolDark">Сүүлийн хүсэлтүүд</h2>
                        <Link href="/seller/inquiries" className="text-sm font-semibold text-zolGold hover:underline">Бүгдийг харах</Link>
                    </div>
                    <div className="space-y-4">
                        {isLoading ? (
                             Array.from({ length: 2 }).map((_, index) => (
                                <div key={index} className="space-y-2 animate-pulse p-2"><div className="h-4 bg-gray-300 rounded w-full"></div><div className="h-4 bg-gray-200 rounded w-2/3"></div></div>
                            ))
                        ) : recentInquiries.length > 0 ? (
                            recentInquiries.map(inquiry => (
                                <div key={inquiry._id} className="p-2 rounded-md hover:bg-zolGold/5 cursor-pointer transition-colors" onClick={() => router.push('/seller/inquiries')}>
                                    <p className="font-semibold text-zolDark">{inquiry.buyerId?.name}</p>
                                    <p className="text-sm text-zolDark/80">Хүсэлт: <span className="font-medium">{inquiry.propertyId?.title}</span></p>
                                    <p className="text-xs text-gray-400 mt-1">{new Date(inquiry.appointmentDate).toLocaleString('mn-MN')}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-zolDark/70 text-center py-4">Танд шинэ хүсэлт ирээгүй байна.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellerDashboardPage;