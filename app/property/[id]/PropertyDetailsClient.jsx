'use client'

import React, { useState } from 'react';
import { BedDouble, LandPlot, MapPin, X, Calendar, Clock, Phone, Trash2, Building, School, PlayCircle, Banknote, Repeat, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import toast from 'react-hot-toast';
import PropertyMediaGallery from '@/components/PropertyMediaGallery';
import PropertyCard from '@/components/PropertyCard';

// Appointment Modal (Энэ хэсэгт өөрчлөлт ороогүй)
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

  const inputStyle =
    "block w-full rounded-lg border-gray-300 shadow-sm focus:border-zolGold focus:ring-zolGold py-3 px-4 transition-all text-zolDark bg-gray-50";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full font-poppins animate-in fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-zolDark transition-colors"
          aria-label="Close Modal"
        >
          <X size={24} />
        </button>
        <h2 className="font-playfair text-2xl font-bold text-zolGreen mb-6">Танилцах цаг товлох</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zolDark/80 mb-2">
              <Calendar size={16} /> Огноо
            </label>
            <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} min={new Date().toISOString().split("T")[0]} className={inputStyle} required />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-zolDark/80 mb-2">
              <Clock size={16} /> Цаг
            </label>
            <input type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className={inputStyle} required />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zolGold hover:bg-zolGold/90 text-white font-semibold py-3 rounded-lg shadow-md transition-transform hover:scale-105 disabled:opacity-50"
          >
            {isSubmitting ? 'Илгээж байна...' : 'Цаг товлох'}
          </button>
        </form>
      </div>
    </div>
  );
};


export default function PropertyDetailsClient({ property, relatedProperties }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAppContext();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!property) return <div className="text-center p-12">Ачаалж байна...</div>;

  const handleDelete = async () => {
    if (!window.confirm("Та энэ зарын мэдээллийг бүр мөсөн устгахдаа итгэлтэй байна уу?")) return;
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/property/${property._id}`, { method: 'DELETE' });
      const data = await response.json();
      if (response.ok && data.success) {
        toast.success('Зар амжилттай устгагдлаа!');
        router.push('/all-properties');
        router.refresh();
      } else {
        throw new Error(data.error || 'Failed to delete the property.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const formatPrice = (price) =>
    typeof price === 'number' ? `${price.toLocaleString()}₮` : "Үнэ тохиролцоно";

  const isOwner = user && user.id === property.userId;
  const showBuildingDetails = property.type === 'Apartment' || property.type === 'House';

  return (
    <>
      <div className="bg-zolGreen/5 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            <PropertyMediaGallery images={property.images} videos={property.videos} title={property.title} />

            {/* FIX: Changed lg-col-span-1 to lg:col-span-1 */}
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow">
                <h1 className="font-playfair text-3xl font-safir text-zolGreen">
                  {property.title}
                </h1>
                <div className="mt-2 flex items-center gap-2 text-zolDark/70">
                  <MapPin size={16} />
                  <p>{`${property.duureg}, ${property.khoroo}, ${property.address}`}</p>
                </div>

                <p className="font-playfair text-4xl font-bold text-zolGold mt-6 font-safir">
                  {formatPrice(property.price)}
                </p>

                <div className="grid grid-cols-3 gap-6 text-center border-t border-b mt-6 py-6">
                  <div className="flex flex-col items-center gap-1">
                    <LandPlot className="text-zolGreen" />
                    <span className="text-sm font-medium font-safir">{property.area?.toLocaleString() || 0} м²</span>
                  </div>
                  {showBuildingDetails && property.roomCount > 0 && (
                    <div className="flex flex-col items-center gap-1">
                      <BedDouble className="text-zolGreen" />
                      <span className="text-sm font-medium"><span className="font-safir">{property.roomCount}</span> өрөө</span>
                    </div>
                  )}
                  {showBuildingDetails && typeof property.davhar === 'number' && (
                    <div className="flex flex-col items-center gap-1">
                      <Building className="text-zolGreen" />
                      <span className="text-sm font-medium"><span className="font-safir">{property.davhar}</span>-р давхар</span>
                    </div>
                  )}
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg text-zolDark mb-2">Тодорхойлолт</h3>
                  <p className="text-zolDark/90 leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </div>
                
                {(property.surguuli || property.oirhonTogloomiinTalbai) && (
                    <div className="border-t pt-6 mt-6">
                        <h3 className="font-semibold text-lg text-zolDark mb-4">Орчны мэдээлэл</h3>
                        <div className="space-y-3">
                            {property.surguuli && (
                                <div className="flex items-center gap-3">
                                    <School className="text-zolGreen" size={20} />
                                    <span className="text-zolDark/90">Сургууль ойрхон</span>
                                </div>
                            )}
                            {property.oirhonTogloomiinTalbai && (
                                <div className="flex items-center gap-3">
                                    <PlayCircle className="text-zolGreen" size={20} />
                                    <span className="text-zolDark/90">Тоглоомын талбай ойрхон</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {(property.zeel || property.barter || property.lizing) && (
                    <div className="border-t pt-6 mt-6">
                        <h3 className="font-semibold text-lg text-zolDark mb-4">Төлбөрийн нөхцөл</h3>
                        <div className="space-y-3">
                            {property.zeel && (
                                <div className="flex items-center gap-3">
                                    <Banknote className="text-zolGreen" size={20} />
                                    <span className="text-zolDark/90">Банкны зээлээр авах боломжтой</span>
                                </div>
                            )}
                            {property.barter && (
                                <div className="flex items-center gap-3">
                                    <Repeat className="text-zolGreen" size={20} />
                                    <span className="text-zolDark/90">Бартер хийх боломжтой</span>
                                </div>
                            )}
                            {property.lizing && (
                                <div className="flex items-center gap-3">
                                    <FileText className="text-zolGreen" size={20} />
                                    <span className="text-zolDark/90">Лизингээр авах боломжтой</span>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {property.features?.length > 0 && (
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-semibold text-lg text-zolDark mb-4">Онцлог шинж чанарууд</h3>
                    <div className="flex flex-wrap gap-3">
                      {property.features.map((feature) => (
                        <span
                          key={feature}
                          className="bg-zolGreen/10 text-zolGreen text-sm font-medium px-4 py-2 rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {property.number && (
                  <div className="flex items-center bg-green-50 p-4 rounded-lg my-6 border border-green-100 shadow-sm">
                    <Phone className="mr-2 text-green-700" />
                    <span className="text-green-800 font-semibold">
                      Холбогдох дугаар: 
                      <span className="font-safir tracking-wider ml-1">{property.number}</span>
                    </span>
                  </div>
                )}

                {isOwner && (
                  <div className="mt-6 border-t pt-6">
                    <button
                      onClick={handleDelete}
                      disabled={isDeleting}
                      className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-3 rounded-lg shadow-md transition-transform hover:scale-105 hover:bg-red-700 disabled:bg-red-400"
                    >
                      <Trash2 size={18} />
                      {isDeleting ? 'Устгаж байна...' : 'Зар устгах'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {relatedProperties?.length > 0 && (
            <div className="mt-24 border-t pt-16">
              <h2 className="font-playfair text-3xl font-bold text-zolGreen mb-12 text-center">
                Танд таалагдаж болох бусад зарууд
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {relatedProperties.map((prop) => (
                  <PropertyCard key={prop._id} property={prop} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && <AppointmentModal property={property} onClose={() => setIsModalOpen(false)} />}
    </>
  );
}