// /app/seller/inquiries/page.jsx

'use client';

import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Eye, MessageSquare, Inbox } from "lucide-react"; // Added Inbox icon for empty state

// --- Dummy data with placeholder images ---
const inquiryDummyData = [
    {
        _id: "inq1",
        property: {
            _id: "prop1",
            title: "Хотын төвийн орчин үеийн пентхаус",
            image: "https://picsum.photos/id/1060/800/600?grayscale&blur=2" 
        },
        buyer: {
            name: "Жон Доу",
            email: "john.d@example.com",
            phone: "555-123-4567"
        },
        message: "Би энэ үл хөдлөх хөрөнгийг маш их сонирхож байна. Би хэзээ үзэх цаг товлож болох вэ?",
        date: new Date('2024-08-10T10:00:00Z'),
        status: "Шинэ"
    },
    {
        _id: "inq2",
        property: {
            _id: "prop2",
            title: "Хотын захад байрлах тухтай газар",
            image: "https://picsum.photos/id/1062/800/600?grayscale&blur=2"
        },
        buyer: {
            name: "Жэйн Смит",
            email: "jane.s@example.com",
            phone: "555-987-6543"
        },
        message: "Та хорооллын тохилог байдлын талаар дэлгэрэнгүй мэдээлэл өгч чадах уу?",
        date: new Date('2024-08-09T15:30:00Z'),
        status: "Холбогдсон"
    }
];

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // This function will fetch your real data from an API
    const fetchInquiries = async () => {
        setInquiries(inquiryDummyData);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchInquiries();
    }, []);

    // --- getStatusBadge function updated with the Green & Gold theme ---
    const getStatusBadge = (status) => {
        const baseClasses = "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset";
        switch (status) {
            case 'Шинэ': 
                return <span className={`${baseClasses} bg-amber-50 text-amber-800 ring-amber-600/20`}>{status}</span>;
            case 'Холбогдсон': 
                return <span className={`${baseClasses} bg-amber-100 text-amber-900 ring-amber-600/30`}>{status}</span>;
            case 'Үзэх цаг товлосон': 
                return <span className={`${baseClasses} bg-green-50 text-green-700 ring-green-600/20`}>{status}</span>;
            default: 
                return <span className={`${baseClasses} bg-gray-50 text-gray-600 ring-gray-500/10`}>{status}</span>;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-green-900">Үл хөдлөх хөрөнгийн лавлагаа</h1>
            </div>
            
            {inquiries.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-lg bg-white">
                    <Inbox size={48} className="mx-auto text-green-300" strokeWidth={1.5} />
                    <h2 className="mt-4 text-xl font-semibold text-green-900">Танд одоогоор лавлагаа ирээгүй байна.</h2>
                    <p className="mt-2 text-gray-600">Боломжит худалдан авагчид тантай холбогдоход тэдний зурвас энд гарч ирнэ.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Үл хөдлөх хөрөнгө</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Худалдан авагчийн мэдээлэл</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Хүлээн авсан огноо</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Төлөв</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Үйлдэл</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {inquiries.map((inquiry) => (
                                <tr key={inquiry._id} className="hover:bg-gray-50/70 transition-colors">
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
                                        <button className="text-amber-600 hover:text-amber-800 mr-4 transition-colors" title="Лавлагааг харах"><Eye size={18} /></button>
                                        <button className="text-green-600 hover:text-green-800 transition-colors" title="Лавлагаанд хариулах"><MessageSquare size={18} /></button>
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