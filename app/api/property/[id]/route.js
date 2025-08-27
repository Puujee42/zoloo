// /app/api/property/[id]/route.js

import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";
import { streamToBuffer } from '@/utils/streamToBuffer'; // A helper you might need

/**
 * Helper function to extract the public_id from a Cloudinary URL.
 */
function getPublicIdFromUrl(url) {
  const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// --- GET /api/property/:id ---
// (This function remains unchanged)
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const property = await Property.findById(id);
    if (!property) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, property }, { status: 200 });
  } catch (error) {
    console.error("Error in GET /api/property/[id]:", error);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

// --- NEW: PUT /api/property/:id ---
// Updates an existing property.
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { userId } = getAuth(req);

    // 1. Authorization Check
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }

    // Ensure the user updating the property is the owner
    if (property.userId.toString() !== userId) {
      return NextResponse.json({ success: false, error: "Forbidden: You do not own this property" }, { status: 403 });
    }

    // 2. Process FormData
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    // 3. Handle File Uploads (for new files)
    const newImages = formData.getAll('images').filter(file => file.size > 0);
    const newVideos = formData.getAll('videos').filter(file => file.size > 0);
    
    const newImageUrls = [];
    const newVideoUrls = [];

    // Upload new images
    for (const image of newImages) {
      const buffer = await streamToBuffer(image.stream());
      const result = await cloudinary.uploader.upload(
        `data:${image.type};base64,${buffer.toString('base64')}`,
        { resource_type: "image", folder: "zol-property" }
      );
      newImageUrls.push(result.secure_url);
    }

    // Upload new videos
    for (const video of newVideos) {
      const buffer = await streamToBuffer(video.stream());
      const result = await cloudinary.uploader.upload(
        `data:${video.type};base64,${buffer.toString('base64')}`,
        { resource_type: "video", folder: "zol-property" }
      );
      newVideoUrls.push(result.secure_url);
    }

    // 4. Update Property Fields
    // Text and numeric fields
    property.title = data.title;
    property.description = data.description;
    property.address = data.address;
    property.type = data.type;
    property.status = data.status;
    property.price = Number(data.price);
    property.area = Number(data.area);
    property.number = data.number;
    property.duureg = data.duureg;
    property.khoroo = data.khoroo;
    property.davhar = data.davhar ? Number(data.davhar) : undefined;
    property.roomCount = data.roomCount ? Number(data.roomCount) : undefined;

    // Boolean fields (FormData sends them as strings "true"/"false")
    property.oirhonTogloomiinTalbai = data.oirhonTogloomiinTalbai === 'true';
    property.surguuli = data.surguuli === 'true';
    property.zeel = data.zeel === 'true';
    property.barter = data.barter === 'true';
    property.lizing = data.lizing === 'true';

    // Array field
    property.features = data.features ? data.features.split(',').map(f => f.trim()).filter(Boolean) : [];
    
    // Append new media URLs to existing arrays
    if (newImageUrls.length > 0) {
      property.images.push(...newImageUrls);
    }
    if (newVideoUrls.length > 0) {
      property.videos.push(...newVideoUrls);
    }
    
    // 5. Save to Database
    await property.save();

    return NextResponse.json({ success: true, property }, { status: 200 });

  } catch (error) {
    console.error("Error in PUT /api/property/[id]:", error);
    return NextResponse.json({ success: false, error: "Server error during update" }, { status: 500 });
  }
}


// --- DELETE /api/property/:id ---
// (This function remains unchanged)
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { userId } = getAuth(req);

    // 1. Authorization Check
    if (!userId) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json({ success: false, error: "Property not found" }, { status: 404 });
    }

    // Ensure the user deleting the property is the owner
    if (property.userId.toString() !== userId) {
      return NextResponse.json({ success: false, error: "Forbidden: You do not own this property" }, { status: 403 });
    }

    // 2. Cloudinary Cleanup
    const videoIds = (property.videos || []).map(getPublicIdFromUrl).filter(Boolean);
    const imageIds = (property.images || []).map(getPublicIdFromUrl).filter(Boolean);
    
    if (imageIds.length > 0) {
      await cloudinary.api.delete_resources(imageIds, { resource_type: 'image' });
    }
    if (videoIds.length > 0) {
      await cloudinary.api.delete_resources(videoIds, { resource_type: 'video' });
    }

    // 3. Database Deletion
    await Property.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Property deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Error in DELETE /api/property/[id]:", error);
    return NextResponse.json({ success: false, error: "Server error during deletion" }, { status: 500 });
  }
}