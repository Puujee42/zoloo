// /app/seller/inquiries/page.jsx

'use client';

import React, { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { Eye, MessageSquare, Inbox } from "lucide-react";

// --- Dummy data ---
const inquiryDummyData = [
    {
        _id: "inq1",
        property: {
            _id: "prop1",
            title: "Хотын төвийн орчин үеийн пентхаус",
        },
        buyer: {
            name: "Ганболд",
            email: "ganbold@example.com",
        },
        date: new Date('2024-08-10T10:00:00Z'),
        status: "Шинэ"
    },
    {
        _id: "inq2",
        property: {
            _id: "prop2",
            title: "Хотын захад байрлах тухтай газар",
        },
        buyer: {
            name: "Сарантуяа",
            email: "saraa@example.com",
        },
        date: new Date('2024-08-09T15:30:00Z'),
        status: "Холбогдсон"
    },
    {
        _id: "inq3",
        property: {
            _id: "prop3",
            title: "Уулын үзэмжтэй тансаг харш",
        },
        buyer: {
            name: "Тэмүүлэн",
            email: "temuulen@example.com",
        },
        date: new Date('2024-08-08T11:20:00Z'),
        status: "Үзэх цаг товлосон"
    }
];

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchInquiries = async () => {
        // In a real app, you would fetch data from your API here
        setInquiries(inquiryDummyData);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchInquiries();
    }, []);

    // --- Төлөвийн шошгыг брэндийн загварт нийцүүлсэн ---
    const getStatusBadge = (status) => {
        const baseClasses = "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset";
        switch (status) {
            case 'Шинэ': 
                return <span className={`${baseClasses} bg-zolGold/10 text-zolGold ring-zolGold/20`}>{status}</span>;
            case 'Холбогдсон': 
                return <span className={`${baseClasses} bg-blue-100 text-blue-800 ring-blue-600/20`}>{status}</span>;
            case 'Үзэх цаг товлосон': 
                return <span className={`${baseClasses} bg-zolGreen/10 text-zolGreen ring-zolGreen/20`}>{status}</span>;
            default: 
                return <span className={`${baseClasses} bg-gray-100 text-gray-700 ring-gray-200`}>{status}</span>;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div className="w-full bg-zolGreen/5 p-8 rounded-lg min-h-full">
            <div className="flex justify-between items-center mb-8">
                {/* --- Гарчгийг Playfair фонттой болгосон --- */}
                <h1 className="font-playfair text-3xl font-bold text-zolGreen">Санал хүсэлтүүд</h1>
            </div>
            
            {inquiries.length === 0 ? (
                // --- "Хоосон байна" мэдээллийг шинэчилсэн ---
                <div className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center">
                    <Inbox size={48} className="mx-auto text-zolGold/50 mb-4" strokeWidth={1.5} />
                    <h2 className="text-2xl font-semibold text-zolDark">Танд одоогоор санал хүсэлт алга</h2>
                    <p className="mt-2 text-zolDark/70">Боломжит худалдан авагчид тантай холбогдоход тэдний зурвас энд гарч ирнэ.</p>
                </div>
            ) : (
                <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 bg-white">
                        {/* --- Хүснэгтийн толгойг шинэчилсэн --- */}
                        <thead className="bg-zolGreen/10">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-zolGreen uppercase tracking-wider">Үл хөдлөх хөрөнгө</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-zolGreen uppercase tracking-wider">Худалдан авагч</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-zolGreen uppercase tracking-wider">Огноо</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-zolGreen uppercase tracking-wider">Төлөв</th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-semibold text-zolGreen uppercase tracking-wider">Үйлдэл</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {inquiries.map((inquiry) => (
                                <tr key={inquiry._id} className="hover:bg-zolGold/5 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-zolDark" title={inquiry.property.title}>{inquiry.property.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zolDark">
                                        <div className="font-medium">{inquiry.buyer.name}</div>
                                        <div className="text-zolDark/70">{inquiry.buyer.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-zolDark/80">{new Date(inquiry.date).toLocaleDateString('mn-MN')}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(inquiry.status)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button className="text-zolGold hover:opacity-80 mr-4 transition-colors" title="Лавлагааг харах"><Eye size={18} /></button>
                                        <button className="text-zolGreen hover:opacity-80 transition-colors" title="Хариу бичих"><MessageSquare size={18} /></button>
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