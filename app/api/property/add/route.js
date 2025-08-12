// /app/api/property/route.js

import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

export async function POST(request) {
    console.log("--- API ROUTE HIT ---"); // 1. Check if the route is even being reached.

    try {
        const { userId, sessionClaims } = getAuth(request);
        
        // --- DEBUGGING LOG ---
        console.log("User ID:", userId);
        console.log("User Claims:", sessionClaims);

        if (!userId || sessionClaims?.role !== 'seller') {
            console.error("Authorization failed.");
            return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
        }

        const formData = await request.formData();
        const title = formData.get('title');
        const price = formData.get('price');
        
        // --- DEBUGGING LOG ---
        console.log("Received Title:", title);
        console.log("Received Price (as string):", price);
        
        // ... (get other form data) ...

        // ... (your image upload logic) ...
        const files = formData.getAll('images');
        const uploadResults = await Promise.all( /* ... your map function ... */ );
        const imageUrls = uploadResults.filter(Boolean).map(r => r.secure_url);

        await connectDB();

        console.log("Attempting to create property in database...");
        await Property.create({
             // ... your property data object ...
             title: title,
             price: Number(price), // Make sure to convert to Number
             // etc.
        });
        console.log("Property created successfully.");

        return NextResponse.json({ success: true, message: 'Property Listed Successfully' });

    } catch (error) {
        // --- THIS IS THE MOST IMPORTANT LOG ---
        // This will print the detailed backend error to your server terminal.
        console.error("!!! BACKEND CRASH !!!:", error); 
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}