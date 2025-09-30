
// /app/api/property/[id]/route.js

import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";

/**
 * Extract Cloudinary public_id from URL
 */
function getPublicIdFromUrl(url) {
  const regex = /\/upload\/(?:v\d+\/)?([^\.]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
}

// --- GET /api/property/:id ---
export async function GET(req, { params }) {
  try {
    await connectDB();
    const { id } = params;

    const property = await Property.findById(id).select("-__v").lean();

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, property },
      {
        status: 200,
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=600",
        },
      }
    );
  } catch (error) {
    console.error("Error in GET /api/property/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}

// --- PUT /api/property/:id ---
export async function PUT(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const property = await Property.findById(id).select("userId").lean();
    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.userId.toString() !== userId) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    // --- Parse JSON instead of FormData (faster, client uploads files directly to Cloudinary) ---
    const body = await req.json();

    const updateFields = {
      ...(body.title && { title: body.title }),
      ...(body.description && { description: body.description }),
      ...(body.address && { address: body.address }),
      ...(body.type && { type: body.type }),
      ...(body.status && { status: body.status }),
      ...(body.price && { price: Number(body.price) }),
      ...(body.area && { area: Number(body.area) }),
      ...(body.number && { number: body.number }),
      ...(body.duureg && { duureg: body.duureg }),
      ...(body.khoroo && { khoroo: body.khoroo }),
      ...(body.davhar && { davhar: Number(body.davhar) }),
      ...(body.roomCount && { roomCount: Number(body.roomCount) }),

      // Booleans
      oirhonTogloomiinTalbai: body.oirhonTogloomiinTalbai === true,
      surguuli: body.surguuli === true,
      zeel: body.zeel === true,
      barter: body.barter === true,
      lizing: body.lizing === true,

      // Arrays
      ...(body.features && {
        features: body.features.filter(Boolean),
      }),
    };

    const updateOps = {
      $set: updateFields,
      ...(body.newImageUrls?.length && {
        $push: { images: { $each: body.newImageUrls } },
      }),
      ...(body.newVideoUrls?.length && {
        $push: { videos: { $each: body.newVideoUrls } },
      }),
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, updateOps, {
      new: true,
    }).lean();

    return NextResponse.json(
      { success: true, property: updatedProperty },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT /api/property/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Server error during update" },
      { status: 500 }
    );
  }
}

// --- DELETE /api/property/:id ---
export async function DELETE(req, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const property = await Property.findById(id).lean();

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.userId.toString() !== userId) {
      return NextResponse.json(
        { success: false, error: "Forbidden" },
        { status: 403 }
      );
    }

    const videoIds = (property.videos || [])
      .map(getPublicIdFromUrl)
      .filter(Boolean);
    const imageIds = (property.images || [])
      .map(getPublicIdFromUrl)
      .filter(Boolean);

    // --- Parallel delete ---
    await Promise.all([
      Property.findByIdAndDelete(id),
      imageIds.length &&
        cloudinary.api.delete_resources(imageIds, { resource_type: "image" }),
      videoIds.length &&
        cloudinary.api.delete_resources(videoIds, { resource_type: "video" }),
    ]);
    console.log(userId)
    return NextResponse.json(
      { success: true, message: "Property deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in DELETE /api/property/[id]:", error);
    return NextResponse.json(
      { success: false, error: "Server error during deletion" },
      { status: 500 }
    );
  }
}
