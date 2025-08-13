'use client'

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import toast from 'react-hot-toast';
import { X } from 'lucide-react';

// You can make this list dynamic in the future
const availableTimes = ['09:00', '11:00', '14:00', '16:00'];

export const AppointmentModal = ({ property, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) {
      toast.error('Огноо, цагаа сонгоно уу.');
      return;
    }
    
    setIsSubmitting(true);
    
    const [hours, minutes] = selectedTime.split(':');
    const appointmentDateTime = new Date(selectedDate);
    appointmentDateTime.setHours(parseInt(hours), parseInt(minutes));

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property._id,
          appointmentDate: appointmentDateTime.toISOString(),
          message: message,
        }),
      });
      
      const result = await response.json();

      if (result.success) {
        toast.success('Таны цаг авах хүсэлтийг илгээлээ!');
        onClose();
      } else {
        throw new Error(result.message || 'Хүсэлт илгээхэд алдаа гарлаа.');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom styles for react-day-picker to match the brand
  const dayPickerStyles = {
    caption: { color: '#017666' }, // zolGreen
    head_cell: { color: '#017666', fontWeight: 'bold' },
    day: { color: '#333333' }, // zolDark
    day_selected: { 
      backgroundColor: '#BE8A27', // zolGold
      color: 'white',
      fontWeight: 'bold',
    },
    day_today: { color: '#BE8A27', fontWeight: 'bold' },
    day_disabled: { color: '#d1d5db' }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 font-poppins animate-in fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative text-zolDark animate-in zoom-in-95">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-zolDark transition-colors">
          <X size={24} />
        </button>
        
        {/* --- ГАРЧИГ: Playfair Display фонт, ногоон өнгөтэй болсон --- */}
        <h2 className="font-playfair text-3xl font-bold text-zolGreen mb-4">
          Танилцах цаг товлох
        </h2>
        <p className="mb-6">
          Үл хөдлөх: <span className="font-semibold">{property.title}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center border rounded-lg p-2">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              fromDate={new Date()}
              classNames={dayPickerStyles} // Apply custom brand styles
            />
          </div>

          <div>
            <h3 className="font-medium mb-3">Боломжит цаг сонгох</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {availableTimes.map(time => (
                <button
                  type="button" key={time} onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${
                    selectedTime === time 
                      ? 'bg-zolGreen text-white border-zolGreen' // Идэвхтэй үед ногоон
                      : 'bg-white hover:bg-zolGold/10 hover:border-zolGold border-gray-300 text-zolDark' // Идэвхгүй үед
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          <textarea
            value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Агентад илгээх нэмэлт зурвас (заавал биш)..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-zolGold focus:border-zolGold transition-colors"
            rows={3}
          ></textarea>

          {/* --- ҮНДСЭН ТОВЧЛУУР: Алтан шаргал өнгөтэй болсон --- */}
          <button
            type="submit"
            disabled={isSubmitting || !selectedDate || !selectedTime}
            className="w-full bg-zolGold text-white font-medium py-3 rounded-lg transition-all transform hover:scale-[1.02] disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isSubmitting ? 'Илгээж байна...' : 'Цаг авах хүсэлт илгээх'}
          </button>
        </form>
      </div>
    </div>
  );
};