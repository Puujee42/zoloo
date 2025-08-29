// /app/api/property/[id]/route.js

import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";
import { streamToBuffer } from "@/utils/streamToBuffer";

/**
 * Helper function to extract the public_id from a Cloudinary URL.
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

    // lean() = faster JSON docs, select = avoid unused fields
    const property = await Property.findById(id).select("-__v").lean();

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, property }, { status: 200 });
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

    const property = await Property.findById(id).select("userId");
    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.userId.toString() !== userId) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You do not own this property" },
        { status: 403 }
      );
    }

    // --- Process FormData ---
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());

    // Files
    const newImages = formData.getAll("images").filter(f => f.size > 0);
    const newVideos = formData.getAll("videos").filter(f => f.size > 0);

    // Upload in parallel
    const uploadImages = newImages.map(async (img) => {
      const buffer = await streamToBuffer(img.stream());
      return cloudinary.uploader.upload(
        `data:${img.type};base64,${buffer.toString("base64")}`,
        { resource_type: "image", folder: "zol-property" }
      );
    });

    const uploadVideos = newVideos.map(async (vid) => {
      const buffer = await streamToBuffer(vid.stream());
      return cloudinary.uploader.upload(
        `data:${vid.type};base64,${buffer.toString("base64")}`,
        { resource_type: "video", folder: "zol-property" }
      );
    });

    const [imageResults, videoResults] = await Promise.all([
      Promise.all(uploadImages),
      Promise.all(uploadVideos),
    ]);

    const newImageUrls = imageResults.map(r => r.secure_url);
    const newVideoUrls = videoResults.map(r => r.secure_url);

    // --- Build Update Object ---
    const updateFields = {
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.address && { address: data.address }),
      ...(data.type && { type: data.type }),
      ...(data.status && { status: data.status }),
      ...(data.price && { price: Number(data.price) }),
      ...(data.area && { area: Number(data.area) }),
      ...(data.number && { number: data.number }),
      ...(data.duureg && { duureg: data.duureg }),
      ...(data.khoroo && { khoroo: data.khoroo }),
      ...(data.davhar && { davhar: Number(data.davhar) }),
      ...(data.roomCount && { roomCount: Number(data.roomCount) }),

      // Booleans
      oirhonTogloomiinTalbai: data.oirhonTogloomiinTalbai === "true",
      surguuli: data.surguuli === "true",
      zeel: data.zeel === "true",
      barter: data.barter === "true",
      lizing: data.lizing === "true",

      // Arrays
      ...(data.features && {
        features: data.features
          .split(",")
          .map(f => f.trim())
          .filter(Boolean),
      }),
    };

    const updateOps = {
      $set: updateFields,
      ...(newImageUrls.length > 0 && { $push: { images: { $each: newImageUrls } } }),
      ...(newVideoUrls.length > 0 && { $push: { videos: { $each: newVideoUrls } } }),
    };

    // --- Update in one query ---
    const updatedProperty = await Property.findByIdAndUpdate(id, updateOps, {
      new: true,
    });

    return NextResponse.json({ success: true, property: updatedProperty }, { status: 200 });
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

    const property = await Property.findById(id);

    if (!property) {
      return NextResponse.json(
        { success: false, error: "Property not found" },
        { status: 404 }
      );
    }

    if (property.userId.toString() !== userId) {
      return NextResponse.json(
        { success: false, error: "Forbidden: You do not own this property" },
        { status: 403 }
      );
    }

    // Collect Cloudinary IDs
    const videoIds = (property.videos || []).map(getPublicIdFromUrl).filter(Boolean);
    const imageIds = (property.images || []).map(getPublicIdFromUrl).filter(Boolean);

    // Parallel delete
    await Promise.all([
      imageIds.length && cloudinary.api.delete_resources(imageIds, { resource_type: "image" }),
      videoIds.length && cloudinary.api.delete_resources(videoIds, { resource_type: "video" }),
    ]);

    // Remove from DB
    await Property.findByIdAndDelete(id);

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
