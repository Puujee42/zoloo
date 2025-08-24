import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

// --- Cloudinary Configuration ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Helper function to upload files ---
// This helper function is already perfect for handling both images and videos. No changes needed here.
async function uploadFileToCloudinary(file, folder) {
  const fileBuffer = await file.arrayBuffer();
  const mimeType = file.type;
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = `data:${mimeType};base64,${base64Data}`;
  const resource_type = mimeType.startsWith('video/') ? 'video' : 'image';

  // For videos, specify a larger chunk size for better performance with larger files
  const options = {
    resource_type,
    folder,
    ...(resource_type === 'video' && { chunk_size: 6000000 })
  };

  return cloudinary.uploader.upload(fileUri, options);
}

// --- Main POST Handler ---
export async function POST(req) {
  try {
    await connectDB();

    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());

    const requiredFields = ["title", "description", "price", "address", "area", "status", "type", "number"];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `${field} is required.` }, { status: 400 });
      }
    }

    // --- Get all images and videos from formData ---
    const images = formData.getAll("images").filter(img => img.size > 0);
    // MODIFICATION: Use getAll("videos") to capture multiple video files
    const videos = formData.getAll("videos").filter(vid => vid.size > 0);

    if (images.length === 0) {
      return NextResponse.json({ error: "At least one image is required." }, { status: 400 });
    }

    // --- Create upload promises for all files ---
    const imageUploadPromises = images.map(image => uploadFileToCloudinary(image, "property_images"));
    // MODIFICATION: Create an array of upload promises for videos
    const videoUploadPromises = videos.map(video => uploadFileToCloudinary(video, "property_videos"));

    // Combine all promises to run them concurrently
    const allUploadPromises = [...imageUploadPromises, ...videoUploadPromises];
    const uploadResults = await Promise.all(allUploadPromises);

    // --- Filter results to get separate image and video URLs ---
    const imageUrls = uploadResults
      .filter(r => r.resource_type === 'image')
      .map(r => r.secure_url);

    // MODIFICATION: Filter for all video results and collect their URLs
    const videoUrls = uploadResults
      .filter(r => r.resource_type === 'video')
      .map(r => r.secure_url);

    // --- Create and Save Property ---
    const property = new Property({
      userId: userId,
      title: body.title,
      description: body.description,
      price: body.price,
      address: body.address,
      area: body.area,
      status: body.status,
      type: body.type,
      number: body.number,
      features: body.features ? body.features.split(',').map(f => f.trim()) : [],
      images: imageUrls,
      RoomCount:body.RoomCount,
      // MODIFICATION: Save the array of video URLs
      videos: videoUrls,
    });

    await property.save();

    return NextResponse.json(
      { message: "Property added successfully", property },
      { status: 201 }
    );

  } catch (error) {
    console.error("--- Internal Server Error ---");
    console.error("Error adding property:", error);
    if (error.name === 'ValidationError') {
      return NextResponse.json({ error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}