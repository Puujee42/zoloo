// /app/property/[id]/PropertyDetailsClient.jsx
'use client'
import React, { useState } from 'react';
import { BedDouble, Bath, LandPlot, MapPin, X } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';

// --- NEW: Import the independent gallery component ---
import PropertyMediaGallery from '@/components/PropertyMediaGallery';

// --- Appointment Modal Component ---
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors" aria-label="Close Modal"><X size={24} /></button>
        <h2 className="text-xl font-bold text-green-900 mb-4">Танилцах цаг товлох</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="appointmentDate" className="block text-sm font-medium text-gray-700">Огноо</label>
            <input type="date" id="appointmentDate" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-black" required />
          </div>
          <div>
            <label htmlFor="appointmentTime" className="block text-sm font-medium text-gray-700">Цаг</label>
            <input type="time" id="appointmentTime" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 text-black" required />
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-105 disabled:opacity-50">{isSubmitting ? 'Ачаалж байна...' : 'Цаг товлох'}</button>
        </form>
      </div>
    </div>
  );
};


// This is the main client component for the details page.
// All media logic has been removed and placed in PropertyMediaGallery.
export default function PropertyDetailsClient({ property, relatedProperties }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppContext();

  // A check to prevent errors if property data is somehow missing.
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
      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* --- CLEAN: Use the new independent component --- */}
            {/* We pass only the necessary props to the gallery component. */}
            <PropertyMediaGallery
              images={property.images}
              videos={property.videos}
              title={property.title}
            />

            {/* --- Property Info & Agent Card Section --- */}
            <div className="space-y-8 lg:col-span-1">
              {/* Basic Info Card */}
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <h1 className="text-3xl font-bold tracking-tight text-green-900">{property.title}</h1>
                <div className="mt-2 flex items-center gap-2 text-gray-600"><MapPin size={16} /><p>{property.address}</p></div>
                <p className="text-4xl font-extrabold text-green-900 mt-4">{formatPrice(property.price)}</p>
                <div className="grid grid-cols-3 gap-4 text-center border-t border-b mt-6 py-4">
                  <div className="flex flex-col items-center gap-1"><BedDouble className="text-green-800"/> <span className="font-medium text-sm text-gray-700">{property.bedrooms} Ор</span></div>
                  <div className="flex flex-col items-center gap-1"><Bath className="text-green-800"/> <span className="font-medium text-sm text-gray-700">{property.bathrooms} Угаалгын өрөө</span></div>
                  <div className="flex flex-col items-center gap-1"><LandPlot className="text-green-800"/> <span className="font-medium text-sm text-gray-700">{property.area.toLocaleString()} м²</span></div>
                </div>
                <div className="mt-6">
                  <h3 className="font-bold text-lg text-green-900 mb-2">Тодорхойлолт</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">{property.description}</p>
                </div>
                {property.features && property.features.length > 0 && (
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-bold text-lg text-green-900 mb-4">Онцлог шинж чанарууд</h3>
                    <div className="flex flex-wrap gap-3">
                      {property.features.map(feature => (<span key={feature} className="bg-green-100 text-green-800 text-sm font-medium px-4 py-2 rounded-full">{feature}</span>))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Agent/Contact Card */}
              <div className="p-6 border border-gray-200 rounded-xl bg-white shadow-lg">
                  <h3 className="font-semibold text-green-900 mb-4 text-xl">Бүртгэсэн</h3>
                  <div className="flex items-center space-x-4">
                      {/* This now expects a populated user object from the server */}
                      <img src={property.userId?.image || '/default-agent.png'} alt={property.userId?.name || 'Агент'} className="h-16 w-16 rounded-full object-cover border-2 border-amber-500" />
                      <div>
                          <div className="font-bold text-lg text-green-900">{property.userId?.name || 'Манай агент'}</div>
                          <div className="text-sm text-gray-500">Pro Realty Group</div>
                      </div>
                  </div>
                  <div className="mt-6 space-y-3">
                      <button onClick={handleScheduleTour} className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg shadow-md transition-all transform hover:scale-105">Танилцах цаг товлох</button>
                      <button className="w-full bg-green-800 hover:bg-green-900 text-white font-bold py-3 rounded-lg transition-all">Агенттай холбогдох</button>
                  </div>
              </div>
            </div>
          </div>
          
          {/* --- Related Properties Section --- */}
          {relatedProperties && relatedProperties.length > 0 && (
            <div className="mt-24 border-t pt-16">
              <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">Төстэй үл хөдлөх хөрөнгө</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {/* Your PropertyCard components would be rendered here */}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* --- RENDER THE MODAL WHEN isModalOpen IS TRUE --- */}
      {isModalOpen && ( <AppointmentModal property={property} onClose={() => setIsModalOpen(false)} /> )}
    </>
  );
}