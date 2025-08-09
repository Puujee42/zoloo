// Likely at: /app/api/seller/products/route.js

import authSeller from "@/lib/authSeller";
import connectDB from "@/config/db"; // <-- FIX: Import database connection
import Product from "@/models/Product"; // <-- FIX: Import your Product model
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// This configuration is perfect
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'Not authorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const files = formData.getAll('images');

        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: 'No images provided' }, { status: 400 });
        }

        // 1. Upload images to Cloudinary
        const uploadResults = await Promise.all(
            files.map(async (file) => {
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                return new Promise((resolve, reject) => {
                    // FIX #1: Correct syntax for upload_stream
                    // The options and the callback are two separate arguments.
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: 'auto' }, // options object
                        (error, result) => {       // callback function
                            if (error) {
                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );
                    stream.end(buffer);
                });
            })
        );

        // Extract the secure URLs from the upload results
        const imageUrls = uploadResults.map(result => result.secure_url);

        // FIX #2: Save the new product to your database
        await connectDB();
        
        const newProduct = {
            name,
            description,
            category,
            price,
            offerPrice,
            images: imageUrls, // Save the array of Cloudinary URLs
            sellerId: userId // It's good practice to link the product to the seller
        };

        await Product.create(newProduct);

        return NextResponse.json({ success: true, message: 'Product created successfully' });

    } catch (error) {
        // FIX #3: Provide a more helpful error message
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, message: 'Error creating product on the server.' }, { status: 500 });
    }
}