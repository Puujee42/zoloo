// /app/api/seller/products/route.js

import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server"; // This is the key for security
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Your Cloudinary config is perfect
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export async function POST(request) {
    try {
        // --- THIS IS THE NEW, MORE SECURE AUTHENTICATION ---
        const { userId, sessionClaims } = getAuth(request);

        // 1. First, check if the user is even logged in.
        if (!userId) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        // 2. Second, check if their role in Clerk's metadata is 'seller'.
        // This is the most secure way to check permission.
        if (sessionClaims?.metadata?.role !== 'seller') {
            return NextResponse.json({ success: false, message: 'Forbidden: Access denied.' }, { status: 403 });
        }
        // --- END OF SECURITY REFACTOR ---


        const formData = await request.formData();
        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const files = formData.getAll('images');

        // The rest of your file upload and database logic is excellent.
        if (!files || files.length === 0) {
            return NextResponse.json({ success: false, message: 'No images were provided.' }, { status: 400 });
        }

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
        const newProduct = {
            name,
            description,
            category,
            price,
            offerPrice,
            images: imageUrls,
            sellerId: userId // Linking the product to the seller is great practice
        };
        await Product.create(newProduct);

        return NextResponse.json({ success: true, message: 'Product created successfully' });

    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
    }
}