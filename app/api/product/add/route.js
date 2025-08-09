// FILE: /app/api/product/add/route.js

import connectDB from "@/config/db";
import Product from "@/models/Product"; // Make sure your Product model is imported
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// ... (cloudinary config)

export async function POST(request) {
    try {
        const { userId, sessionClaims } = getAuth(request);

        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }
        if (sessionClaims?.role !== 'seller') {
            return NextResponse.json({ success: false, message: 'Forbidden: Access denied.' }, { status: 403 });
        }

        const formData = await request.formData();
        // ... (get all form data fields)
        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const files = formData.getAll('images');
        
        // ... (image upload logic)
        const uploadResults = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream({ resource_type: 'auto' }, (error, result) => {
                        if (error) { reject(error); } else { resolve(result); }
                    });
                    stream.end(buffer);
                });
            })
        );
        const imageUrls = uploadResults.map(result => result.secure_url);

        await connectDB();

        // --- THE FINAL FIX IS HERE ---
        const newProduct = {
            name,
            description,
            category,
            price,
            offerPrice,
            images: imageUrls,
            userId: userId, // Add the authenticated user's ID
            date: new Date()  // Add the current date
        };
        // --- END OF FIX ---

        await Product.create(newProduct);

        return NextResponse.json({ success: true, message: 'Product Created Successfully' });

    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
    }
}