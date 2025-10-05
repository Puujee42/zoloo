import React from 'react';
import Image from 'next/image';
import { List, Tag, KeyRound, User, Phone, Mail, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

// --- Enhanced CSS Animations (add these to your globals.css) ---
// @keyframes fadeInUp {
//   from {
//     opacity: 0;
//     transform: translateY(40px);
//   }
//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// @keyframes countUp {
//   0% { opacity: 0; transform: scale(0.5); }
//   50% { opacity: 0.7; transform: scale(1.1); }
//   100% { opacity: 1; transform: scale(1); }
// }
// @keyframes shimmer {
//   0% { background-position: -200% 0; }
//   100% { background-position: 200% 0; }
// }
// @keyframes float {
//   0%, 100% { transform: translateY(0px); }
//   50% { transform: translateY(-10px); }
// }
// .animate-fadeInUp {
//   animation: fadeInUp 0.8s ease-out forwards;
// }
// .animate-countUp {
//   animation: countUp 1.2s ease-out;
// }
// .animate-shimmer {
//   background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
//   background-size: 200% 100%;
//   animation: shimmer 2s infinite;
// }
// .animate-float {
//   animation: float 3s ease-in-out infinite;
// }
// .stagger-1 { animation-delay: 0.1s; }
// .stagger-2 { animation-delay: 0.2s; }
// .stagger-3 { animation-delay: 0.3s; }
// .gradient-text { background: linear-gradient(135deg, #10B981, #059669); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

// --- Enhanced Animated number component ---
const AnimatedNumber = ({ value }) => (
  <span
    className="inline-block animate-countUp font-bold text-lg text-gray-900"
    style={{ '--value': value }}
  >
    {value}
  </span>
);

// --- Enhanced StatCard with glow and float animation ---
const StatCard = ({ label, value, icon, index }) => (
  <div className={`bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl flex items-center gap-5 cursor-default relative overflow-hidden group animate-fadeInUp stagger-${index || 1} transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-white`}>
    {/* Subtle glow overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-zolGreen/10 via-transparent to-zolGreen/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="p-4 bg-gradient-to-br from-zolGreen/20 to-zolGreen/10 rounded-full flex items-center justify-center text-zolGreen relative z-10 animate-float">
      {React.cloneElement(icon, { size: 28, className: "group-hover:rotate-12 transition-transform duration-700" })}
    </div>
    <div className="relative z-10">
      <p className="text-sm text-gray-500 tracking-wide font-medium">{label}</p>
      <p className="text-2xl font-black text-gray-900 mt-1 flex items-baseline">
        <AnimatedNumber value={value} />
      </p>
    </div>
  </div>
);

// --- Enhanced PropertyCard with shimmer and advanced hover ---
const PropertyCard = ({ listing, index }) => (
  <Link
    href={`/property/${listing._id}`}
    className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-5 group block relative overflow-hidden transform transition-all duration-700 ease-out hover:scale-105 hover:shadow-2xl hover:-translate-y-2 animate-fadeInUp stagger-${(index % 4) + 1 || 1}`}
  >
    {/* Shimmer overlay on image */}
    <div className="overflow-hidden rounded-xl mb-4 relative group">
      <Image
        src={listing.images?.[0] || '/default-property.jpg'}
        alt={listing.title}
        width={300}
        height={200}
        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer transition-opacity duration-500" />
      {/* Rating badge if applicable */}
      <div className="absolute top-3 right-3 bg-zolGreen/90 text-white px-2 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Star size={12} className="inline mr-1" /> 4.8
      </div>
    </div>
    
    <h3 className="font-bold text-gray-900 truncate text-lg mb-2 group-hover:text-zolGreen transition-colors duration-300">
      {listing.title}
    </h3>
    
    <p className="text-zolGreen font-bold text-base mb-3 flex items-center gap-1">
      ₮{listing.price ? listing.price.toLocaleString() : 'Үнэ тохиролцоно'}
      <span className="text-xs text-gray-400">(TO)</span>
    </p>
    
    <div className="flex items-center justify-between">
      <p className="text-xs text-gray-500 uppercase tracking-wider font-medium flex items-center gap-1">
        <span className="w-2 h-2 bg-zolGreen rounded-full animate-pulse" /> {listing.status}
      </p>
      {/* Hover arrow indicator */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg className="w-4 h-4 text-zolGreen" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </div>
    
    {/* Bottom gradient underline */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-zolGreen to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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

// --- Main AgentPage Server Component with Hero Section ---
const AgentPage = async ({ params }) => {
  const agentId = await params.id;
  const listings = await fetchAgentData(agentId);

  if (!listings) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gradient-to-br from-zolGreen/10 via-white/80 to-zolGreen/5 animate-fadeIn">
        <div className="text-center max-w-md animate-fadeInUp">
          <div className="w-24 h-24 bg-zolGreen/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
            <User className="text-zolGreen" size={48} />
          </div>
          <h1 className="text-5xl font-black text-gray-900 mb-4 gradient-text">Алдаа гарлаа</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Энэ борлуулагчийн мэдээллийг татахад алдаа гарлаа. Дахин оролдоно уу.
          </p>
        </div>
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
    <div className="min-h-screen bg-gradient-to-br from-zolGreen/5 via-white to-zolGreen/10 relative overflow-hidden animate-fadeIn">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,#10B981,transparent_50%)]" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,#10B981,transparent_50%)]" />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 bg-gradient-to-r from-zolGreen/10 to-zolGreen/5">
        <div className="max-w-6xl mx-auto px-8 text-center">
          <div className="inline-flex items-center gap-4 mb-8 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl animate-fadeInUp">
            <div className="w-16 h-16 bg-zolGreen/20 rounded-2xl flex items-center justify-center animate-float">
              <User className="text-zolGreen" size={32} />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
                {agentName}
              </h1>
              <p className="text-sm text-gray-500 mt-1">Мэргэжлийн үл хөдлөх хөрөнгийн зуучлагч</p>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            Энэ борлуулагчийн сонгосон хамгийн сайн заруудыг эндээс харна уу. Бид танд найдвартай, чанартай сонголтуудыг санал болгож байна.
          </p>
          
          {/* Contact Teaser (if agent data expands, integrate real info) */}
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center tracking-tight gradient-text animate-fadeInUp">
            Статистик
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <StatCard label="Нийт зар" value={stats.total} icon={<List />} index={1} />
            <StatCard label="Зарагдах" value={stats.forSale} icon={<Tag />} index={2} />
            <StatCard label="Түрээслэх" value={stats.forRent} icon={<KeyRound />} index={3} />
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-20 bg-gradient-to-br from-white/80 to-zolGreen/5">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center tracking-tight gradient-text animate-fadeInUp">
            Оруулсан зарууд
          </h2>
          {listings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {listings.map((listing, index) => (
                <PropertyCard key={listing._id} listing={listing} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 animate-fadeInUp">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <List className="text-gray-400" size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Зар байхгүй</h3>
              <p className="text-gray-600 text-lg">
                Энэ борлуулагч одоогоор зар оруулаагүй байна. Удахгүй шинэ зарууд нэмэгдэнэ.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default AgentPage;