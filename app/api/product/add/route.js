// FILE: /app/api/product/add/route.js

import connectDB from "@/config/db";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// --- THIS IS THE FIX ---
// This part was missing. It reads the secret keys from Vercel's
// environment variables and gives them to the Cloudinary library.
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
// --- END OF FIX ---

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
        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        const files = formData.getAll('images');
        
        // This line will now work because Cloudinary has its keys.
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
            userId: userId,
            date: new Date()
        };
        await Product.create(newProduct);

        return NextResponse.json({ success: true, message: 'Product Created Successfully' });

    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
    }
}