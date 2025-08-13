// /components/AppointmentModal.jsx

'use client'

import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
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

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800">
          <X size={24} />
        </button>
        
        <h2 className="text-2xl font-bold text-green-900 mb-4">Танилцах цаг товлох</h2>
        <p className="text-gray-600 mb-2">Үл хөдлөх: <span className="font-semibold">{property.title}</span></p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center border rounded-lg p-2">
            <DayPicker mode="single" selected={selectedDate} onSelect={setSelectedDate} fromDate={new Date()} />
          </div>

          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Цаг сонгох</h3>
            <div className="grid grid-cols-2 gap-3">
              {availableTimes.map(time => (
                <button
                  type="button" key={time} onClick={() => setSelectedTime(time)}
                  className={`p-3 rounded-lg border text-sm font-semibold transition-colors ${
                    selectedTime === time 
                      ? 'bg-green-800 text-white border-green-800'
                      : 'bg-gray-100 hover:bg-gray-200 border-gray-200'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          
          <textarea
            value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Агентад илгээх нэмэлт зурвас..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500" rows={3}
          ></textarea>

          <button
            type="submit" disabled={isSubmitting || !selectedDate || !selectedTime}
            className="w-full bg-amber-500 text-green-900 font-bold py-3 rounded-lg transition-all transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Илгээж байна...' : 'Цаг авах хүсэлт илгээх'}
          </button>
        </form>
      </div>
    </div>
  );
};