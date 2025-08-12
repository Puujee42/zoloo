// Recommended file path: /app/seller/inquiries/page.jsx

'use client';

import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Eye, MessageSquare } from "lucide-react"; // Modern icons

// --- New dummy data with live image URLs ---
const inquiryDummyData = [
    {
        _id: "inq1",
        property: {
            _id: "prop1",
            title: "Modern Downtown Penthouse",
            // Using a live placeholder image
            image: "https://picsum.photos/id/1060/800/600?grayscale&blur=2" 
        },
        buyer: {
            name: "John Doe",
            email: "john.d@example.com",
            phone: "555-123-4567"
        },
        message: "I'm very interested in this property. When can I schedule a tour?",
        date: new Date('2024-08-10T10:00:00Z'),
        status: "New"
    },
    {
        _id: "inq2",
        property: {
            _id: "prop2",
            title: "Cozy Suburban Getaway",
            // Using a live placeholder image
            image: "https://picsum.photos/id/1062/800/600?grayscale&blur=2"
        },
        buyer: {
            name: "Jane Smith",
            email: "jane.s@example.com",
            phone: "555-987-6543"
        },
        message: "Could you provide more details about the neighborhood amenities?",
        date: new Date('2024-08-09T15:30:00Z'),
        status: "Contacted"
    }
];

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // This function would fetch real data from your API
    const fetchInquiries = async () => {
        // In a real app: const response = await fetch('/api/inquiries/seller');
        setInquiries(inquiryDummyData);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchInquiries();
    }, []);

    const getStatusBadge = (status) => {
        const baseClasses = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";
        switch (status) {
            case 'New': return <span className={`${baseClasses} bg-blue-50 text-blue-700 ring-blue-600/20`}>{status}</span>;
            case 'Contacted': return <span className={`${baseClasses} bg-yellow-50 text-yellow-800 ring-yellow-600/20`}>{status}</span>;
            case 'Tour Scheduled': return <span className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20`}>{status}</span>;
            default: return <span className={`${baseClasses} bg-gray-50 text-gray-600 ring-gray-500/10`}>{status}</span>;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Property Inquiries</h1>
            </div>
            
            {inquiries.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-lg">
                    <h2 className="text-xl font-semibold text-gray-900">You have no inquiries yet.</h2>
                    <p className="mt-2 text-gray-600">When potential buyers contact you, their messages will appear here.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer Information</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Received</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {inquiries.map((inquiry) => (
                                <tr key={inquiry._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900" title={inquiry.property.title}>{inquiry.property.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                        <div className="font-medium">{inquiry.buyer.name}</div>
                                        <div className="text-gray-500">{inquiry.buyer.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(inquiry.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(inquiry.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-4" title="View Inquiry"><Eye size={18} /></button>
                                        <button className="text-green-600 hover:text-green-900" title="Reply to Inquiry"><MessageSquare size={18} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InquiriesPage;