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
async function uploadFileToCloudinary(file, folder) {
  const fileBuffer = await file.arrayBuffer();
  const mimeType = file.type;
  const base64Data = Buffer.from(fileBuffer).toString("base64");
  const fileUri = `data:${mimeType};base64,${base64Data}`;
  const resource_type = mimeType.startsWith('video/') ? 'video' : 'image';

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

    const requiredFields = [
      "title",
      "description",
      "price",
      "address",
      "area",
      "status",
      "type",
      "number",
      "duureg",
      "khoroo",
      "davhar",
      "roomCount"
    ];

    for (const field of requiredFields) {
      // 'davhar' and 'roomCount' can be 0, so we check if the field is undefined or null
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        return NextResponse.json({ error: `${field} талбарыг заавал бөглөнө үү.` }, { status: 400 });
      }
    }

    const images = formData.getAll("images").filter(img => img.size > 0);
    const videos = formData.getAll("videos").filter(vid => vid.size > 0);

    if (images.length === 0) {
      return NextResponse.json({ error: "Доод тал нь нэг зураг оруулах шаардлагатай." }, { status: 400 });
    }

    const imageUploadPromises = images.map(image => uploadFileToCloudinary(image, "property_images"));
    const videoUploadPromises = videos.map(video => uploadFileToCloudinary(video, "property_videos"));

    const allUploadPromises = [...imageUploadPromises, ...videoUploadPromises];
    const uploadResults = await Promise.all(allUploadPromises);

    const imageUrls = uploadResults
      .filter(r => r.resource_type === 'image')
      .map(r => r.secure_url);

    const videoUrls = uploadResults
      .filter(r => r.resource_type === 'video')
      .map(r => r.secure_url);

    // --- Property-ийн өгөгдлийг бэлтгэх ---
    const propertyData = {
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
      videos: videoUrls,
      duureg: body.duureg,
      khoroo: body.khoroo,
      davhar: body.davhar,
      roomCount: body.roomCount,
      oirhonTogloomiinTalbai: body.oirhonTogloomiinTalbai === 'true',
      surguuli: body.surguuli === 'true',

      // MODIFICATION: Шинээр нэмэгдсэн төлбөрийн нөхцөлийн талбарууд
      zeel: body.zeel === 'true',
      barter: body.barter === 'true',
      lizing: body.lizing === 'true',
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
    if (error.name === 'ValidationError') {
      return NextResponse.json({ success: false, error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}