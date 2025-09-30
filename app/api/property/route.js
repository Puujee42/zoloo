// This file is likely located at /app/api/properties/route.js

import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";
import User from "@/models/User"; // <-- 1. NEW: Import the User model

// ✅ Upload helper (unchanged)
async function uploadFileToCloudinary(file, folder) {
  const fileBuffer = await file.arrayBuffer();
  const mimeType = file.type;
  const encoding = "base64";
  const base64Data = Buffer.from(fileBuffer).toString(encoding);
  const fileUri = `data:${mimeType};${encoding},${base64Data}`;
  const resource_type = mimeType.startsWith("video/") ? "video" : "image";

  return cloudinary.uploader.upload(fileUri, {
    folder,
    resource_type,
  });
}

// ✅ Route Handler
export async function POST(req) {
  try {
    await connectDB();
    const { userId } = getAuth(req);

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    // --- 2. NEW: FETCH THE USER'S NAME ---
    const user = await User.findById(userId).select("name").lean();
    const agentName = user ? user.name : "Мэдээлэл байхгүй"; // Set a fallback name
    // --- END OF NEW CODE ---

    const formData = await req.formData();

    // ✅ Check required fields BEFORE uploading
    const requiredFields = ["title", "duureg", "khoroo", "price", "area"];
    for (const field of requiredFields) {
      if (!formData.get(field)) {
        return NextResponse.json(
          { success: false, error: `${field} талбарыг заавал бөглөнө үү.` },
          { status: 400 }
        );
      }
    }

    // ✅ Collect files
    const images = formData
      .getAll("images")
      .filter((file) => file instanceof File && file.size > 0);

    const videos = formData
      .getAll("videos")
      .filter((file) => file instanceof File && file.size > 0);

    if (images.length === 0) {
      return NextResponse.json(
        { success: false, error: "Доод тал нь нэг зураг оруулах шаардлагатай." },
        { status: 400 }
      );
    }

    // ✅ Upload files in parallel
    const uploadResults = await Promise.all([
      ...images.map((img) => uploadFileToCloudinary(img, "property_images")),
      ...videos.map((vid) => uploadFileToCloudinary(vid, "property_videos")),
    ]);

    const imageUrls = uploadResults
      .filter((r) => r.resource_type === "image")
      .map((r) => r.secure_url);

    const videoUrls = uploadResults
      .filter((r) => r.resource_type === "video")
      .map((r) => r.secure_url);

    // ✅ Prepare property data safely
    const propertyData = {
      userId,
      agentName, // <-- 3. NEW: Add the agent's name to the data object
      title: formData.get("title")?.trim(),
      description: formData.get("description")?.trim() || "",
      address: formData.get("address")?.trim() || "",
      type: formData.get("type") || "Other",
      status: formData.get("status") || "Available",
      price: Number(formData.get("price")) || 0,
      area: Number(formData.get("area")) || 0,
      number: Number(formData.get("number")) || 0,
      features:
        formData
          .get("features")
          ?.split(",")
          .map((f) => f.trim())
          .filter(Boolean) || [],
      images: imageUrls,
      videos: videoUrls,
      duureg: formData.get("duureg"),
      khoroo: formData.get("khoroo"),
      davhar: Number(formData.get("davhar")) || null,
      roomCount: Number(formData.get("roomCount")) || null,
      oirhonTogloomiinTalbai: formData.get("oirhonTogloomiinTalbai") === "true",
      surguuli: formData.get("surguuli") === "true",
      zeel: formData.get("zeel") === "true",
      barter: formData.get("barter") === "true",
      lizing: formData.get("lizing") === "true",
    };
    // ✅ Extra validation for Apartment/House
    if (
      ["Apartment", "House"].includes(propertyData.type) &&
      (!propertyData.davhar || !propertyData.roomCount)
    ) {
      return NextResponse.json(
        { success: false, error: "Давхар болон өрөөний тоог заавал бөглөнө үү." },
        { status: 400 }
      );
    }

    // ✅ Save to DB
    const newProperty = await Property.create(propertyData);

    return NextResponse.json(
      { success: true, property: newProperty },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/property:", error);

    if (error.name === "ValidationError") {
      return NextResponse.json(
        { success: false, error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Сервер дээр алдаа гарлаа." },
      { status: 500 }
    );
  }
}