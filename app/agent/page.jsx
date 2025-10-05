// /app/agent/page.jsx
'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { User, Mail, Star, SearchX, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

// --- Reusable Agent Card Component (The Main Fix) ---
const AgentCard = ({ agent, variants }) => (
    <motion.div
        variants={variants}
        className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden group relative transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-1"
    >
        {/* Decorative top border */}
        <div className="h-2 bg-gradient-to-r from-zolGreen to-zolGold"></div>
        
        {/* Main Content Area */}
        <div className="p-6 flex flex-col items-center">
            
            {/* Avatar Section */}
            <div className="relative mb-4">
                <Image
                    src={agent.imageUrl || '/default-avatar.png'}
                    alt={`Profile of ${agent.name}`}
                    width={100}
                    height={100}
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-md group-hover:ring-zolGreen transition-all duration-300"
                />
                {/* Rating Badge */}
                <div className="absolute -bottom-1 -right-1 bg-zolGold text-white p-2 rounded-full shadow-lg border-2 border-white">
                    <Star size={16} className="fill-current" />
                </div>
            </div>

            {/* Agent Info */}
            <h2 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-zolGreen transition-colors duration-300 text-center">
                {agent.name}
            </h2>
            <p className="text-gray-500 text-sm mb-4 flex items-center justify-center gap-2">
                <Mail size={14} className="text-zolGold/80" />
                <span>{agent.email}</span>
            </p>

            {/* "View Listings" Button / Link */}
            <Link
                href={`/agent/${agent.id}`}
                className="mt-4 w-full text-center bg-transparent border-2 border-zolGreen text-zolGreen font-semibold py-2 px-4 rounded-full transition-all duration-300 group-hover:bg-zolGreen group-hover:text-white group-hover:shadow-lg"
            >
                Зарууд харах
            </Link>
        </div>
    </motion.div>
);


export default function AgentPage() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                setLoading(true);
                setError(null);
                const { data } = await axios.get('/api/agent/list');

                if (data.success) {
                    setAgents(data.agents);
                } else {
                    setError('Failed to load agents.');
                }
            } catch (err) {
                console.error('Failed to fetch agents:', err);
                setError('An error occurred while fetching agents.');
            } finally {
                setLoading(false);
            }
        };

        fetchAgents();
    }, []);

    const agentCount = agents.length;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zolGreen/5 via-white to-zolGold/5 relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('/path/to/your/subtle/pattern.svg')] bg-repeat"></div>
            
            <Navbar />

            {/* Hero Section */}
            <motion.section
                className="relative pt-24 pb-16"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <motion.div
                        className="inline-flex items-center gap-3 mb-6"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-zolGreen to-zolGold tracking-tight">
                            Манай Агентууд
                        </h1>
                    </motion.div>
                    
                    <motion.p
                        className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        {loading ? "Мэргэжлийн агентуудын мэдээллийг уншиж байна..." :
                         error ? <span className="text-red-500">{error}</span> :
                         `Бид танд туслахад бэлэн ${agentCount} мэргэжлийн агенттай.`}
                    </motion.p>
                </div>
            </motion.section>

            {/* Content Section */}
            <motion.div
                className="max-w-7xl mx-auto px-4 py-12"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="w-12 h-12 text-zolGreen animate-spin" />
                    </div>
                ) : error ? (
                    <motion.div
                        className="text-center py-20"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">Алдаа гарлаа</h2>
                        <button onClick={() => window.location.reload()} className="px-6 py-3 bg-zolGreen text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
                            Дахин ачаалах
                        </button>
                    </motion.div>
                ) : agents.length > 0 ? (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                    >
                        {agents.map((agent) => (
                            <AgentCard key={agent.id} agent={agent} variants={cardVariants} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.div
                        className="text-center py-24 border-2 border-dashed rounded-xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                    >
                        <SearchX size={48} className="mx-auto text-zolGold/50 mb-4" />
                        <h2 className="text-2xl font-semibold text-zolDark">Агент олдсонгүй</h2>
                        <p className="mt-2 text-zolDark/70">Одоогоор бүртгэлтэй агент байхгүй байна.</p>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}