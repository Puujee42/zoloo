// /components/seller/Sidebar.jsx

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Import modern icons from lucide-react
import { LayoutDashboard, List, PlusCircle, MessageSquare } from 'lucide-react';

const SideBar = () => {
    const pathname = usePathname();

    // --- New, refactored menu items for a real estate dashboard ---
    const menuItems = [
        {
            name: 'Dashboard',
            path: '/seller',
            icon: <LayoutDashboard size={20} />
        },
        {
            name: 'My Listings',
            path: '/seller/my-listings',
            icon: <List size={20} />
        },
        {
            name: 'List New Property',
            path: '/seller/list-property',
            icon: <PlusCircle size={20} />
        },
        {
            name: 'Inquiries',
            path: '/seller/inquiries',
            icon: <MessageSquare size={20} />
        },
    ];

    return (
        // The sidebar is collapsible based on screen size
        <aside className='md:w-64 w-20 border-r min-h-screen bg-white flex flex-col pt-5'>
            <nav className="flex flex-col space-y-2">
                {menuItems.map((item) => {
                    // Check if the current path matches the item's path
                    // We use startsWith for parent routes to also be active (e.g., /seller for /seller/settings)
                    const isActive = pathname === item.path;

                    return (
                        <Link href={item.path} key={item.name} passHref>
                            <div
                                className={`
                                    flex items-center mx-2 py-3 px-4 gap-4 rounded-lg cursor-pointer transition-all group
                                    ${isActive
                                        ? "bg-blue-100 text-blue-700 font-semibold border-blue-500" // Active state
                                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900" // Inactive state
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