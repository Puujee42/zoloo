// /app/seller/my-listings/page.jsx

'use client'

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";
import toast from "react-hot-toast";
import { Pencil, Trash2, ListX, PlusCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MyListingsPage = () => {
    const router = useRouter();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSellerProperties = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('/api/property/seller-list');
                const data = await response.json();
                if (data.success) {
                    setProperties(data.properties);
                } else {
                    toast.error(data.message || "Failed to fetch listings.");
                }
            } catch (error) {
                toast.error("An error occurred while fetching your listings.");
                console.error("Fetch listings error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSellerProperties();
    }, []);

    // --- Animation Variants ---
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    const getStatusBadge = (status) => {
        const baseClasses = "inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium ring-1 ring-inset";
        switch (status) {
            case 'Зарагдана':
                return <span className={`${baseClasses} bg-zolGreen/10 text-zolGreen ring-zolGreen/20`}>{status}</span>;
            case 'Түрээслүүлнэ':
                return <span className={`${baseClasses} bg-zolGold/10 text-zolGold ring-zolGold/20`}>{status}</span>;
            case 'Зарагдсан':
                return <span className={`${baseClasses} bg-gray-100 text-gray-700 ring-gray-200`}>{status}</span>;
            default:
                return <span className={`${baseClasses} bg-blue-100 text-blue-800 ring-blue-600/20`}>{status}</span>;
        }
    };

    if (isLoading) {
        return <Loading />;
    }

    return (
        <motion.div
            className="w-full bg-zolGreen/5 p-4 md:p-8 rounded-lg min-h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <h1 className="font-playfair text-3xl font-bold text-zolGreen">Миний зарууд</h1>
                <motion.button
                    onClick={() => router.push('/seller/list-property')}
                    className="flex items-center gap-2 bg-zolGold text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-opacity-90 transition-all shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <PlusCircle size={18} /> Шинэ зар нэмэх
                </motion.button>
            </motion.div>

            <AnimatePresence mode="wait">
                {properties.length === 0 ? (
                    <motion.div
                        key="empty"
                        className="text-center py-20 border-2 border-dashed border-gray-300 rounded-xl bg-white flex flex-col items-center justify-center"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <motion.div variants={itemVariants}>
                            <ListX size={48} className="mx-auto text-zolGold/50 mb-4" strokeWidth={1.5} />
                        </motion.div>
                        <motion.h2 variants={itemVariants} className="text-2xl font-semibold text-zolDark">Та одоогоор зар оруулаагүй байна</motion.h2>
                        <motion.p variants={itemVariants} className="mt-2 text-zolDark/70">Өнөөдөр анхны зараа оруулж, борлуулалтаа эхлүүлнэ үү.</motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="listings"
                        className="overflow-x-auto shadow-xl rounded-lg border border-gray-200"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <table className="min-w-full divide-y divide-gray-200 bg-white">
                            <thead className="bg-zolGreen/5">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zolGreen uppercase tracking-wider">Үл хөдлөх хөрөнгө</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zolGreen uppercase tracking-wider">Үнэ</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zolGreen uppercase tracking-wider">Төлөв</th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-zolGreen uppercase tracking-wider">Огноо</th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold text-zolGreen uppercase tracking-wider">Үйлдэл</th>
                                </tr>
                            </thead>
                            <motion.tbody className="divide-y divide-gray-100" variants={containerVariants}>
                                {properties.map((property) => (
                                    <motion.tr key={property._id} className="hover:bg-zolGold/5 transition-colors duration-200" variants={itemVariants}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 h-12 w-12">
                                                    <Image className="h-12 w-12 rounded-md object-cover" src={property.images[0]} alt={property.title} width={48} height={48} />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-zolDark truncate max-w-xs" title={property.title}>{property.title}</div>
                                                    <div className="text-sm text-zolDark/70 truncate max-w-xs" title={property.address}>{property.address}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zolGreen font-semibold">₮{property.price.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">{getStatusBadge(property.status)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-zolDark/80">{new Date(property.createdAt).toLocaleDateString('mn-MN')}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <motion.button whileHover={{ scale: 1.2, color: '#BE8A27' }} whileTap={{ scale: 0.9 }} className="text-gray-500 mr-4" title="Засах"><Pencil size={18} /></motion.button>
                                            <motion.button whileHover={{ scale: 1.2, color: '#ef4444' }} whileTap={{ scale: 0.9 }} className="text-gray-500" title="Устгах"><Trash2 size={18} /></motion.button>
                                        </td>
                                    </motion.tr>
                                ))}
                            </motion.tbody>
                        </table>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default MyListingsPage;