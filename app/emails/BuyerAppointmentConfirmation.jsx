import React from 'react';

export const BuyerAppointmentConfirmationEmail = ({ propertyTitle, appointmentDate }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#052e16' }}>Appointment Request Sent!</h1>
    <p>Your request to view the property below has been sent to the seller.</p>
    <p><strong>Property:</strong> {propertyTitle}</p>
    <p><strong>Requested Date & Time:</strong> {new Date(appointmentDate).toLocaleString()}</p>
    <p>The seller will contact you shortly to confirm. Thank you!</p>
  </div>
);