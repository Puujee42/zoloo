import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";

// --- Cloudinary Config ---
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// --- Stream Upload (memory-safe for large files) ---
function uploadStreamToCloudinary(file, folder, resource_type) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, resource_type, ...(resource_type === "video" && { chunk_size: 6000000 }) },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    file.stream().pipe(uploadStream);
  });
}

// --- POST Handler (Create Property) ---
export async function POST(req) {
  try {
    await connectDB();

    const { userId } = getAuth(req);
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const body = Object.fromEntries(formData.entries());

    const requiredFields = [
      "title", "description", "price", "address", "area",
      "status", "type", "number", "duureg", "khoroo",
      "davhar", "roomCount"
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return NextResponse.json({ error: `${field} талбарыг заавал бөглөнө үү.` }, { status: 400 });
      }
    }

    const images = formData.getAll("images").filter(f => f.size > 0);
    const videos = formData.getAll("videos").filter(f => f.size > 0);

    if (images.length === 0) {
      return NextResponse.json({ error: "Доод тал нь нэг зураг оруулах шаардлагатай." }, { status: 400 });
    }

    // Upload in parallel (streaming, memory-safe)
    const imageResults = await Promise.all(images.map(img =>
      uploadStreamToCloudinary(img, "property_images", "image")
    ));

    const videoResults = await Promise.all(videos.map(vid =>
      uploadStreamToCloudinary(vid, "property_videos", "video")
    ));

    const imageUrls = imageResults.map(r => r.secure_url);
    const videoUrls = videoResults.map(r => r.secure_url);

    // --- Prepare property data ---
    const propertyData = {
      userId,
      agentName: body.agentName, // <--- ЭНЭ ХЭСЭГТ НЭМЭГДСЭН
      title: body.title,
      description: body.description,
      price: Number(body.price),
      address: body.address,
      area: Number(body.area),
      status: body.status,
      type: body.type,
      number: body.number,
      features: body.features ? body.features.split(",").map(f => f.trim()).filter(Boolean) : [],
      images: imageUrls,
      videos: videoUrls,
      duureg: body.duureg,
      khoroo: body.khoroo,
      davhar: Number(body.davhar),
      roomCount: Number(body.roomCount),
      oirhonTogloomiinTalbai: body.oirhonTogloomiinTalbai === "true",
      surguuli: body.surguuli === "true",
      zeel: body.zeel === "true",
      barter: body.barter === "true",
      lizing: body.lizing === "true",
    };

    const property = new Property(propertyData);
    await property.save();

    return NextResponse.json(
      { success: true, message: "Үл хөдлөх хөрөнгийг амжилттай нэмлээ", property },
      { status: 201 }
    );

  } catch (error) {
    console.error("--- Internal Server Error ---");
    console.error("Error adding property:", error);
    if (error.name === "ValidationError") {
      return NextResponse.json({ success: false, error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}