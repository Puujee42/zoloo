import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    await connectDB();

    // --- FIX: Use Clerk's auth() helper to get the userId ---
    const { userId } = auth();

    // Security Check: Ensure the user is logged in
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    // The rest of your code for handling FormData is correct
    const formData = await req.formData();

    const propertyData = {
      // --- FIX: Add the userId from Clerk to the data ---
      userId,
      title: formData.get('title'),
      description: formData.get('description'),
      address: formData.get('address'),
      type: formData.get('type'),
      status: formData.get('status'),
      price: formData.get('price'),
      bedrooms: formData.get('bedrooms'),
      bathrooms: formData.get('bathrooms'),
      area: formData.get('area'),
      features: formData.get('features').split(',').map(feature => feature.trim()).filter(Boolean),
    };

    const images = formData.getAll('images').filter((image) => image.name !== '');
    const videos = formData.getAll('videos').filter((video) => video.name !== '');

    console.log('User ID:', userId);
    console.log('Received property data:', propertyData);

    // TODO: Add logic to upload images and videos to a cloud service (Cloudinary, S3, etc.)
    // and store the URLs in your propertyData object.

    const newProperty = await Property.create(propertyData);

    return NextResponse.json({
      success: true,
      property: newProperty
    }, { status: 201 });

  } catch (error) {
    console.error("Error adding property:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Something went wrong."
    }, { status: 500 });
  }
}