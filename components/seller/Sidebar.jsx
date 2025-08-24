// /components/seller/Sidebar.jsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, List, PlusCircle, MessageSquare } from 'lucide-react';

const SideBar = () => {
    const pathname = usePathname();

    const menuItems = [
        {
            name: 'Хяналтын самбар',
            path: '/seller',
            icon: <LayoutDashboard size={20} />
        },
        {
            name: 'Миний зарууд',
            path: '/seller/my-listings',
            icon: <List size={20} />
        },
        {
            name: 'Шинэ зар нэмэх', // Нэрийг бага зэрэг товчилсон
            path: '/seller/list-property',
            icon: <PlusCircle size={20} />
        },
    ];

    return (
        // Sidebar-ийн өргөнийг бага зэрэг тохируулсан
        <aside className='md:w-72 w-20 border-r min-h-screen bg-white flex flex-col pt-6'>
            <nav className="flex flex-col space-y-3">
                {menuItems.map((item) => {
                    const isActive = pathname === item.path;

                    return (
                        <Link href={item.path} key={item.name} passHref>
                            <div
                                className={`
                                    flex items-center mx-3 py-3 px-4 gap-4 rounded-lg cursor-pointer transition-all duration-200 group
                                    ${isActive
                                        // --- 1. ШИНЭ ИДЭВХТЭЙ ТӨЛӨВ ---
                                        ? "bg-zolGreen text-white font-semibold shadow-md border-l-4 border-zolGold"
                                        // --- 2. ШИНЭ ИДЭВХГҮЙ ТӨЛӨВ ---
                                        : "text-zolDark font-medium hover:bg-zolGold/10 hover:text-zolGreen" 
                                    }
                                `}
                            >
                                {/* Tooltip-д зориулж item-ийн нэрийг дамжуулсан */}
                                <div className="relative" title={item.name}>
                                    {item.icon}
                                </div>
                                {/* Гарчгийг зөвхөн том дэлгэц дээр харуулна */}
                                <span className='md:block hidden whitespace-nowrap'>{item.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default SideBar;