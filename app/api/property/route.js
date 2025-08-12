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
    try {
        console.log("--- API Route /api/property POST hit ---");
        const { userId, sessionClaims } = getAuth(request);

        if (!userId || sessionClaims?.role !== 'seller') {
            return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 });
        }

        const formData = await request.formData();
        
        // --- DETAILED LOGGING OF ALL FORM FIELDS ---
        const propertyData = {
            title: formData.get('title'),
            description: formData.get('description'),
            address: formData.get('address'),
            type: formData.get('type'),
            status: formData.get('status'),
            price: formData.get('price'),
            bedrooms: formData.get('bedrooms'),
            bathrooms: formData.get('bathrooms'),
            area: formData.get('area'),
            features: formData.get('features'),
        };
        console.log("Received Form Data:", propertyData);
        
        const files = formData.getAll('images');
        console.log(`Received ${files.length} images to upload.`);

        // --- Image Upload Logic ---
        const uploadPromises = files.map(file => {
            return new Promise(async (resolve, reject) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                cloudinary.uploader.upload_stream(
                    { folder: 'realestate/properties' },
                    (error, result) => {
                        if (error) return reject(error);
                        return resolve(result);
                    }
                ).end(buffer);
            });
        });
        
        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);
        console.log("Cloudinary Upload Successful. URLs:", imageUrls);

        // --- Database Creation Logic ---
        await connectDB();
        const newProperty = {
            userId,
            ...propertyData,
            price: Number(propertyData.price),
            bedrooms: Number(propertyData.bedrooms),
            bathrooms: Number(propertyData.bathrooms),
            area: Number(propertyData.area),
            features: propertyData.features ? propertyData.features.split(',').map(f => f.trim()) : [],
            images: imageUrls,
        };

        console.log("Attempting to save this object to DB:", newProperty);
        await Property.create(newProperty);
        console.log("Property successfully saved to database.");

        return NextResponse.json({ success: true, message: 'Property Listed Successfully' });

    } catch (error) {
        // This will print the detailed backend error to your server terminal
        console.error("!!! API ROUTE CRASHED !!!:", error); 
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}