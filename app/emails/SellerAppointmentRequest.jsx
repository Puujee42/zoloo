import React from 'react';

export const SellerAppointmentRequestEmail = ({ propertyTitle, buyerName, appointmentDate, message }) => (
  <div style={{ fontFamily: 'sans-serif', padding: '20px', color: '#333' }}>
    <h1 style={{ color: '#052e16' }}>New Tour Request!</h1>
    <p>You have a new viewing request for your property:</p>
    <p><strong>Property:</strong> {propertyTitle}</p>
    <p><strong>Requested By:</strong> {buyerName}</p>
    <p><strong>Requested Date & Time:</strong> {new Date(appointmentDate).toLocaleString()}</p>
    {message && (
      <>
        <p><strong>Message from the buyer:</strong></p>
        <p style={{ fontStyle: 'italic', borderLeft: '3px solid #ccc', paddingLeft: '10px' }}>"{message}"</p>
      </>
    )}
    <p>Please log in to your dashboard to confirm or reschedule this appointment.</p>
  </div>
);