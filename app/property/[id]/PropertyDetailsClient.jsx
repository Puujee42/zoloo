// /app/property/[id]/PropertyDetailsClient.jsx
'use client'
import React, { useState } from 'react';
import { BedDouble, Bath, LandPlot, MapPin, X, Calendar, Clock } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import PropertyMediaGallery from '@/components/PropertyMediaGallery';
import PropertyCard from '@/components/PropertyCard'; // Import PropertyCard
import Navbar from '@/components/Navbar'; // Import Navbar
import Footer from '@/components/Footer'; // Import Footer

// --- Appointment Modal Component-г брэндийн загвартай болгосон ---
const AppointmentModal = ({ property, onClose }) => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!appointmentDate || !appointmentTime) {
      toast.error('Огноо, цагаа сонгоно уу.');
      setIsSubmitting(false); return;
    }
    const appointmentDateTime = `${appointmentDate}T${appointmentTime}:00`;
    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ propertyId: property._id, dateTime: appointmentDateTime }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success('Таны цагийг амжилттай товлолоо!');
        onClose();
      } else {
        toast.error(data.message || 'Цаг товлоход алдаа гарлаа.');
      }
    } catch (error) {
      toast.error('Гэнэтийн алдаа гарлаа. Дахин оролдоно уу.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "block w-full rounded-md border-gray-300 shadow-sm focus:border-zolGold focus:ring-zolGold py-2.5 px-4 transition-colors duration-200 text-zolDark";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full font-poppins animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-zolDark transition-colors" aria-label="Close Modal"><X size={24} /></button>
        <h2 className="font-playfair text-2xl font-bold text-zolGreen mb-6">Танилцах цаг товлох</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-zolDark/80 mb-2 flex items-center gap-2"><Calendar size={16}/> Огноо</label>
            <input type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className={inputStyle} required />
          </div>
          <div>
            <label htmlFor="appointmentTime" className="block text-sm font-medium text-zolDark/80 mb-2 flex items-center gap-2"><Clock size={16}/> Цаг</label>
            <input type="time" id="appointmentTime" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className={inputStyle} required />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-zolGold text-white font-semibold py-3 rounded-lg shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:transform-none">{isSubmitting ? 'Илгээж байна...' : 'Цаг товлох'}</button>
        </form>
      </div>
    </div>
  );
};


export default function PropertyDetailsClient({ property, relatedProperties }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppContext();

  if (!property) {
    return <div className="text-center p-8">Ачаалж байна...</div>;
  }

  const formatPrice = (price) => {
    if (typeof price !== 'number') return "Үнэ тохиролцоно";
    return `${price.toLocaleString()}₮`;
  };

  const handleScheduleTour = () => {
    if (!user) {
      toast.error("Цаг товлохын тулд эхлээд нэвтэрнэ үү.");
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      {/* --- 1. Дэвсгэрийг zolGreen/5 болгосон --- */}
      <div className="bg-zolGreen/5 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            <PropertyMediaGallery
              images={property.images}
              videos={property.videos}
              title={property.title}
            />

            <div className="space-y-8 lg:col-span-1">
              {/* --- 2. Үндсэн мэдээллийн картыг шинэчилсэн --- */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h1 className="font-playfair text-3xl font-bold tracking-tight text-zolGreen">{property.title}</h1>
                <div className="mt-2 flex items-center gap-2 text-zolDark/80"><MapPin size={16} /><p>{property.address}</p></div>
                <p className="font-playfair text-4xl font-bold text-zolGreen mt-4">{formatPrice(property.price)}</p>
                <div className="grid grid-cols-3 gap-4 text-center border-t border-b mt-6 py-4">
                  <div className="flex flex-col items-center gap-1"><BedDouble className="text-zolGreen"/> <span className="font-medium text-sm text-zolDark">{property.bedrooms} Ор</span></div>
                  <div className="flex flex-col items-center gap-1"><Bath className="text-zolGreen"/> <span className="font-medium text-sm text-zolDark">{property.bathrooms} Угаалгын</span></div>
                  <div className="flex flex-col items-center gap-1"><LandPlot className="text-zolGreen"/> <span className="font-medium text-sm text-zolDark">{property.area.toLocaleString()} м²</span></div>
                </div>
                <div className="mt-6">
                  <h3 className="font-semibold text-lg text-zolDark mb-2">Тодорхойлолт</h3>
                  <p className="text-zolDark/90 leading-relaxed whitespace-pre-line">{property.description}</p>
                </div>
                {property.features && property.features.length > 0 && (
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-semibold text-lg text-zolDark mb-4">Онцлог шинж чанарууд</h3>
                    <div className="flex flex-wrap gap-3">
                      {property.features.map(feature => (<span key={feature} className="bg-zolGreen/10 text-zolGreen text-sm font-medium px-4 py-2 rounded-full">{feature}</span>))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* --- 3. Агентын картыг шинэчилсэн --- */}
              <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-lg">
                  <h3 className="font-semibold text-zolDark mb-4 text-xl">Бүртгэсэн агент</h3>
                  <div className="flex items-center space-x-4">
                      <img src={property.userId?.image || '/default-agent.png'} alt={property.userId?.name || 'Агент'} className="h-16 w-16 rounded-full object-cover border-2 border-zolGold" />
                      <div>
                          <div className="font-bold text-lg text-zolGreen">{property.userId?.name || 'Манай агент'}</div>
                          <div className="text-sm text-zolDark/70">ZOL Pro Realty</div>
                      </div>
                  </div>
                  <div className="mt-6 space-y-3">
                      <button onClick={handleScheduleTour} className="w-full bg-zolGold hover:bg-opacity-90 text-white font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-105">Танилцах цаг товлох</button>
                      <button className="w-full bg-zolGreen hover:bg-opacity-90 text-white font-bold py-3 rounded-lg transition-all">Агенттай холбогдох</button>
                  </div>
              </div>
            </div>
          </div>
          
          {/* --- 4. Төстэй заруудын гарчгийг шинэчилсэн --- */}
          {relatedProperties && relatedProperties.length > 0 && (
            <div className="mt-24 border-t pt-16">
              <h2 className="font-playfair text-3xl font-bold text-zolGreen mb-8 text-center">Танд таалагдаж болох бусад зарууд</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {relatedProperties.map(prop => (
                  <PropertyCard key={prop._id} property={prop} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {isModalOpen && ( <AppointmentModal property={property} onClose={() => setIsModalOpen(false)} /> )}
      <Footer />
    </>
  );
}