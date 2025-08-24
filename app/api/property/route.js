import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";

// This helper function is already perfect. No changes needed here.
async function uploadFileToCloudinary(file, folder) {
  const fileBuffer = await file.arrayBuffer();
  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString(encoding);
  const fileUri = `data:${mimeType};${encoding},${base64Data}`;
  const resource_type = mimeType.startsWith('video/') ? 'video' : 'image';

  const result = await cloudinary.uploader.upload(fileUri, {
    folder,
    resource_type,
  });

  return result;
}

// ROUTE HANDLER
// POST /api/property
export async function POST(req) {
  try {
    await connectDB();
    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();

    // Get images and filter out any empty file inputs (this part is correct)
    const images = formData
      .getAll('images')
      .filter((image) => image instanceof File && image.size > 0);

    // MODIFICATION 1: Get all video files instead of just one.
    // Ensure the key 'videos' matches the key used in your frontend's FormData.
    const videos = formData
      .getAll('videos')
      .filter((video) => video instanceof File && video.size > 0);

    if (images.length === 0) {
      return NextResponse.json({ success: false, error: "At least one image is required." }, { status: 400 });
    }

    // Prepare to upload all files (images and videos) concurrently.
    const uploadPromises = [];

    // Add image upload promises to the array
    images.forEach(image => {
      uploadPromises.push(uploadFileToCloudinary(image, 'property_images'));
    });

    // MODIFICATION 2: Loop through the videos array and create an upload promise for each one.
    videos.forEach(video => {
      uploadPromises.push(uploadFileToCloudinary(video, 'property_videos'));
    });

    // Await all uploads to complete
    const uploadResults = await Promise.all(uploadPromises);

    // Separate the URLs based on the resource type returned from Cloudinary.
    const imageUrls = uploadResults
      .filter(result => result.resource_type === 'image')
      .map(result => result.secure_url);

    // MODIFICATION 3: Filter for ALL video results and map them to their URLs.
    const videoUrls = uploadResults
      .filter(result => result.resource_type === 'video')
      .map(result => result.secure_url);


    // Assemble the final property data for the database
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
      // MODIFICATION 4: Save the array of video URLs.
      // The field name is now 'videos' (plural).
      videos: videoUrls,
    };

    const newProperty = await Property.create(propertyData);

    return NextResponse.json({ success: true, property: newProperty }, { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/property:", error);
    return NextResponse.json({ success: false, error: "Something went wrong on the server." }, { status: 500 });
  }
}