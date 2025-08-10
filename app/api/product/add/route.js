import connectDB from "@/config/db";
import Product from "@/models/Product";
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

        if (!name || !description || !category || !price || !offerPrice) {
            return NextResponse.json({ success: false, message: 'All fields are required' }, { status: 400 });
        }

        const uploadResults = await Promise.all(
            files.map(async (file) => {
                if (!file || typeof file.arrayBuffer !== 'function') return null;
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);
                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: 'image', folder: 'quickcart/products' },
                        (error, result) => {
                            if (error) reject(error);
                            else resolve(result);
                        }
                    );
                    stream.end(buffer);
                });
            })
        );

        const imageUrls = uploadResults.filter(Boolean).map(r => r.secure_url);

        await connectDB();

        await Product.create({
            name,
            description,
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            images: imageUrls,
            userId,
            date: Date.now()
        });

        return NextResponse.json({ success: true, message: 'Product Created Successfully' });

    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json({ success: false, message: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
