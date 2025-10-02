'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar'; // Adjust path if needed

export default function AgentPage() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch from API, which filters for role: "seller"
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
    }, []); // Runs once on mount

    const agentCount = agents.length;

    return (
        <div className="container mx-auto px-4 py-8">
            <Navbar />
            <h1 className="text-4xl font-bold text-center mb-2">Our Agents</h1>

            {/* Subtitle based on state */}
            {loading ? (
                <p className="text-lg text-gray-600 text-center mb-10">
                    Finding our professional agents...
                </p>
            ) : error ? (
                <p className="text-lg text-red-500 text-center mb-10">{error}</p>
            ) : (
                <p className="text-lg text-gray-600 text-center mb-10">
                    Found {agentCount} professional agent{agentCount !== 1 ? 's' : ''} to help you.
                </p>
            )}

            {/* Content based on state */}
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500">Please try refreshing the page.</div>
            ) : (
                <>
                    {agentCount > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {agents.map((agent) => (
                                <div key={agent.id} className="bg-white rounded-lg shadow-md overflow-hidden text-center">
                                    <img
                                        src={agent.imageUrl || '/default-avatar.png'} // Fallback for no image
                                        alt={`Profile of ${agent.name}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-5">
                                        <h2 className="text-xl font-semibold mb-1">{agent.name}</h2>
                                        <p className="text-gray-500">{agent.email}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-lg mt-8">No agents found at this time. (Check if users have role: "seller" in Clerk.)</p>
                    )}
                </>
            )}
        </div>
    );
}