// /components/seller/Sidebar.jsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Importing modern icons from lucide-react
import { LayoutDashboard, List, PlusCircle, MessageSquare } from 'lucide-react';

const SideBar = () => {
    const pathname = usePathname();

    // --- New, improved menu items for the real estate dashboard ---
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
            name: 'Шинэ үл хөдлөх хөрөнгө бүртгэх',
            path: '/seller/list-property',
            icon: <PlusCircle size={20} />
        },
        {
            name: 'Лавлагаа',
            path: '/seller/inquiries',
            icon: <MessageSquare size={20} />
        },
    ];

    return (
        // The sidebar collapses on smaller screens
        <aside className='md:w-64 w-20 border-r min-h-screen bg-white flex flex-col pt-5'>
            <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => {
                    // Check if the current path matches the item's path
                    const isActive = pathname === item.path;

                    return (
                        <Link href={item.path} key={item.name} passHref>
                            <div
                                className={`
                                    flex items-center mx-2 py-3 px-4 gap-4 rounded-lg cursor-pointer transition-all group
                                    ${isActive
                                        // --- THEMED ACTIVE STATE ---
                                        // A gold left border, subtle green background, and dark green text.
                                        ? "bg-green-50 text-green-900 font-semibold border-l-4 border-amber-500"
                                        // --- THEMED INACTIVE STATE ---
                                        // A standard gray text with a subtle green hover effect.
                                        : "text-gray-600 hover:bg-gray-100 hover:text-green-800" 
                                    }
                                `}
                            >
                                {/* Tooltip for icon-only view on small screens */}
                                <div className="relative" title={item.name}>
                                    {item.icon}
                                </div>
                                <span className='md:block hidden'>{item.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
};

export default SideBar;