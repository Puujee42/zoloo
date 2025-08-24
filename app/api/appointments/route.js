// /app/api/appointments/route.js

import { NextResponse } from 'next/server';
import { connectDB } from '@/config/db';
import Appointment from '@/models/Appointment';
import Property from '@/models/Property';
import { getAuth } from '@clerk/nextjs/server';
import { clerkClient } from '@clerk/nextjs'; // Import the Clerk server client
import { Resend } from 'resend'; // Import Resend
import { SellerAppointmentRequestEmail } from '@/app/emails/SellerAppointmentRequest';
import { BuyerAppointmentConfirmationEmail } from '@/app/emails/BuyerAppointmentConfirmation';

// Initialize Resend with your API key from .env
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  await connectDB();
  const { userId: buyerId } = getAuth(req);

  if (!buyerId) {
    return NextResponse.json({ success: false, message: 'Authentication required.' }, { status: 401 });
  }

  try {
    const { propertyId, appointmentDate, message } = await req.json();

    // 1. Fetch property and buyer details in parallel for efficiency
    const [property, buyer] = await Promise.all([
      Property.findById(propertyId).populate('userId'), // Populate to get seller details
      clerkClient.users.getUser(buyerId) // Fetch the buyer's details from Clerk
    ]);
    
    if (!property) {
      return NextResponse.json({ success: false, message: 'Property not found.' }, { status: 404 });
    }

    const seller = property.userId; // The populated seller object

    // 2. Create the new appointment in the database
    const newAppointment = new Appointment({
      propertyId,
      sellerId: seller._id,
      buyerId,
      appointmentDate,
      message,
      status: 'pending',
    });
    await newAppointment.save();
    
    // 3. Send notification emails using Resend
    try {
      // Email to Seller
      await resend.emails.send({
        from: 'Your App <onboarding@resend.dev>', // Use your verified domain in production
        to: seller.email, // Seller's email from the populated user object
        subject: `New Tour Request for ${property.title}`,
        react: <SellerAppointmentRequestEmail 
                  propertyTitle={property.title}
                  buyerName={`${buyer.firstName || ''} ${buyer.lastName || ''}`.trim()}
                  appointmentDate={newAppointment.appointmentDate}
                  message={newAppointment.message}
                />,
      });

      // Email to Buyer
      const buyerEmail = buyer.emailAddresses.find(email => email.id === buyer.primaryEmailAddressId)?.emailAddress;
      if (buyerEmail) {
          await resend.emails.send({
            from: 'Your App <onboarding@resend.dev>',
            to: buyerEmail,
            subject: `Appointment Request Sent for ${property.title}`,
            react: <BuyerAppointmentConfirmationEmail 
                      propertyTitle={property.title}
                      appointmentDate={newAppointment.appointmentDate}
                    />,
          });
      }
    } catch (emailError) {
        console.error("Failed to send emails, but appointment was created:", emailError);
        // Don't fail the whole request if emails fail, just log the error.
    }

    return NextResponse.json({ success: true, appointment: newAppointment }, { status: 201 });

  } catch (error) {
    console.error("Appointment creation failed:", error);
    return NextResponse.json({ success: false, message: 'Server error.' }, { status: 500 });
  }
}