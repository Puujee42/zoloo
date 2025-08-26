import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import cloudinary from "@/lib/cloudinary";

// Энэ туслах функц нь төгс ажиллаж байгаа тул өөрчлөлт хийх шаардлагагүй.
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

    const images = formData
      .getAll('images')
      .filter((image) => image instanceof File && image.size > 0);

    const videos = formData
      .getAll('videos')
      .filter((video) => video instanceof File && video.size > 0);

    if (images.length === 0) {
      return NextResponse.json({ success: false, error: "Доод тал нь нэг зураг оруулах шаардлагатай." }, { status: 400 });
    }

    const uploadPromises = [];
    images.forEach(image => {
      uploadPromises.push(uploadFileToCloudinary(image, 'property_images'));
    });
    videos.forEach(video => {
      uploadPromises.push(uploadFileToCloudinary(video, 'property_videos'));
    });

    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults
      .filter(result => result.resource_type === 'image')
      .map(result => result.secure_url);

    const videoUrls = uploadResults
      .filter(result => result.resource_type === 'video')
      .map(result => result.secure_url);


    // Мэдээллийн санд хадгалах үл хөдлөх хөрөнгийн эцсийн өгөгдлийг бэлтгэх
    const propertyData = {
      userId,
      title: formData.get("title"),
      description: formData.get("description"),
      address: formData.get("address"),
      type: formData.get("type"),
      status: formData.get("status"),
      price: Number(formData.get("price")),
      area: Number(formData.get("area")),
      number: Number(formData.get("number")),
      features: formData.get("features")?.split(",").map((f) => f.trim()).filter(Boolean) || [],
      images: imageUrls,
      videos: videoUrls,
      duureg: formData.get("duureg"),
      khoroo: formData.get("khoroo"),
      davhar: Number(formData.get("davhar")),
      roomCount: Number(formData.get("roomCount")),
      oirhonTogloomiinTalbai: formData.get("oirhonTogloomiinTalbai") === 'true',
      surguuli: formData.get("surguuli") === 'true',

      // MODIFICATION: Шинээр нэмэгдсэн төлбөрийн нөхцөлийн талбарууд
      zeel: formData.get("zeel") === 'true',
      barter: formData.get("barter") === 'true',
      lizing: formData.get("lizing") === 'true',
    };

    // Шаардлагатай талбарууд бөглөгдсөн эсэхийг шалгах
    const requiredFields = ["title", "duureg", "khoroo", "price", "area"];
    for (const field of requiredFields) {
      // Use `formData.get()` to check directly as propertyData might have 0 or empty strings
      if (!formData.get(field)) {
          return NextResponse.json({ success: false, error: `${field} талбарыг заавал бөглөнө үү.` }, { status: 400 });
      }
    }

    // Check for building-specific fields only if it's a house or apartment
    if (propertyData.type === 'Apartment' || propertyData.type === 'House') {
        if (!formData.get('davhar') || !formData.get('roomCount')) {
            return NextResponse.json({ success: false, error: `Давхар болон өрөөний тоог заавал бөглөнө үү.` }, { status: 400 });
        }
    }

    const newProperty = await Property.create(propertyData);

    return NextResponse.json({ success: true, property: newProperty }, { status: 201 });

  } catch (error) {
    console.error("Error in POST /api/property:", error);
    if (error.name === 'ValidationError') {
        return NextResponse.json({ success: false, error: "Validation failed", details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: "Сервер дээр алдаа гарлаа." }, { status: 500 });
  }
}