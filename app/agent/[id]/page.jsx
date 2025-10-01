// /app/agent/[id]/page.jsx
"use client"
import React from 'react';
import Image from 'next/image';
import { List, Tag, KeyRound } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

// --- Animated number component for stats ---
const AnimatedNumber = ({ value }) => (
  <span
    className="inline-block animate-countUp font-bold text-lg text-gray-900"
    style={{ '--value': value }}
  >
    {value}
  </span>
);

// --- StatCard with hover and animation ---
const StatCard = ({ label, value, icon }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg flex items-center gap-5 cursor-default transform transition-transform duration-300 hover:scale-[1.05] hover:shadow-2xl">
    <div className="p-4 bg-zolGreen/20 rounded-full flex items-center justify-center text-zolGreen">
      {React.cloneElement(icon, { size: 28 })}
    </div>
    <div>
      <p className="text-sm text-gray-500 tracking-wide">{label}</p>
      <p className="text-2xl font-extrabold text-gray-900 mt-1">
        <AnimatedNumber value={value} />
      </p>
    </div>
  </div>
);

// --- PropertyCard with smooth hover zoom and shadow ---
const PropertyCard = ({ listing }) => (
  <Link
    href={`/property/${listing._id}`}
    className="bg-white rounded-2xl shadow-md p-4 group block transform transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
  >
    <div className="overflow-hidden rounded-xl mb-4">
      <Image
        src={listing.images?.[0] || '/default-property.jpg'}
        alt={listing.title}
        width={300}
        height={180}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
      />
    </div>
    <p className="font-semibold text-gray-900 truncate text-lg">{listing.title}</p>
    <p className="text-zolGreen font-semibold mt-1 text-base">
      ₮{listing.price ? listing.price.toLocaleString() : 'Үнэ тохиролцоно'}
    </p>
    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">{listing.status}</p>
  </Link>
);

// --- Data Fetching Function (unchanged) ---
async function fetchAgentData(agentId) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/agent/${agentId}`, {
      cache: 'no-store',
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.properties;
  } catch (err) {
    console.error('Failed to fetch agent data:', err);
    return null;
  }
}

// --- Main AgentPage Server Component ---
const AgentPage = async ({ params }) => {
  const agentId = params.id;
  const listings = await fetchAgentData(agentId);

  if (!listings) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-tr from-zolGreen/10 to-zolGreen/5 animate-fadeIn">
        <h1 className="text-4xl font-extrabold text-zolGreen mb-4">Алдаа гарлаа</h1>
        <p className="text-center text-gray-600 max-w-md">
          Энэ борлуулагчийн мэдээллийг татахад алдаа гарлаа.
        </p>
      </div>
    );
  }

  const stats = {
    total: listings.length,
    forSale: listings.filter((p) => p.status === 'Зарагдана').length,
    forRent: listings.filter((p) => p.status === 'Түрээслүүлнэ').length,
  };

  const agentName = listings.length > 0 ? listings[0].agentName : 'Тодорхойгүй борлуулагч';

  return (
    <div className="min-h-screen bg-gradient-to-br from-zolGreen/10 to-zolGreen/5 p-8 animate-fadeIn">
      <Navbar />

      {/* Heading */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-10 text-center tracking-wide">
        Борлуулагч: <span className="text-zolGreen">{agentName}</span>
      </h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
        <StatCard label="Нийт зар" value={stats.total} icon={<List />} />
        <StatCard label="Зарагдах" value={stats.forSale} icon={<Tag />} />
        <StatCard label="Түрээслэх" value={stats.forRent} icon={<KeyRound />} />
      </div>

      {/* Listings Section */}
      <section className="max-w-7xl mx-auto border-t border-zolGreen/30 pt-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 tracking-wide">Оруулсан зарууд</h2>
        {listings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {listings.map((listing) => (
              <PropertyCard key={listing._id} listing={listing} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-20 text-lg">
            Энэ борлуулагч одоогоор зар оруулаагүй байна.
          </p>
        )}
      </section>

      {/* Animations and styles */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease forwards;
        }
        @keyframes countUp {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-countUp {
          animation: countUp 0.8s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default AgentPage;