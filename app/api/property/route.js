import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary"; // Corrected your import path from the error log

/**
 * Helper function to upload images to Cloudinary.
 */
async function uploadImagesToCloudinary(images) {
  const uploadPromises = images.map(async (image) => {
    // Convert the image file to a buffer, then to a Base64 string
    const imageBuffer = await image.arrayBuffer();
    const imageArray = Array.from(new Uint8Array(imageBuffer));
    const imageData = Buffer.from(imageArray);
    const imageBase64 = imageData.toString('base64');

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${imageBase64}`,
      {
        folder: 'properties',
      }
    );
    return result.secure_url;
  });
  return Promise.all(uploadPromises);
}

// ROUTE HANDLER
// POST /api/property/add
export async function POST(req) {
  try {
    await connectDB();
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    // --- THIS IS THE FIX ---
    // The filter now ensures we only process actual files that have content.
    const images = formData
      .getAll('images')
      .filter((image) => image instanceof File && image.size > 0);
    // ----------------------

    if (images.length === 0) {
      return NextResponse.json({ success: false, error: "At least one image is required." }, { status: 400 });
    }

    const imageUrls = await uploadImagesToCloudinary(images);

    const propertyData = {
      userId,
      title: formData.get("title"),
      description: formData.get("description"),
      address: formData.get("address"),
      type: formData.get("type"),
      status: formData.get("status"),
      price: Number(formData.get("price")),
      bedrooms: Number(formData.get("bedrooms")),
      bathrooms: Number(formData.get("bathrooms")),
      area: Number(formData.get("area")),
      number: Number(formData.get("number")),
      features: formData.get("features")?.split(",").map((f) => f.trim()).filter(Boolean) || [],
      images: imageUrls,
    };

    const newProperty = await Property.create(propertyData);

    return NextResponse.json({ success: true, property: newProperty }, { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/property/add:", error);
    return NextResponse.json({ success: false, error: "Something went wrong on the server." }, { status: 500 });
  }
}