// /app/api/property/[id]/route.js

import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";

/**
 * Helper function to extract the public_id from a Cloudinary URL.
 */
function getPublicIdFromUrl(url) {
  const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// --- GET /api/property/:id ---
// Fetches a single property by its ID.
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


// --- DELETE /api/property/:id ---
// Deletes a property and its associated Cloudinary media.
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

    // 2. Cloudinary Cleanup (Images and Videos)
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