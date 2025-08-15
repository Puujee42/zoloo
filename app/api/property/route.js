import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  try {
    await connectDB();

    const { userId } = auth();

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized. Please log in." },
        { status: 401 }
      );
    }

    const formData = await req.formData();

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
      features: formData
        .get("features")
        ?.split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    const newProperty = await Property.create(propertyData);

    return NextResponse.json({ success: true, property: newProperty }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
