// app/api/property/add/route.js
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Property from "@/models/Property";

// POST /api/property/add
export async function POST(req) {
  try {
    // Connect to MongoDB
    await connectDB();

    // Get data from request body
    const body = await req.json();

    // Validate required fields
    const requiredFields = [
      "userId", "title", "description", "price",
      "address", "bedrooms", "bathrooms", "area",
      "status", "type","number"
    ];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required.` },
          { status: 400 }
        );
      }
    }

    // Create a new property
    const property = new Property({
      userId: body.userId,
      title: body.title,
      description: body.description,
      price: body.price,
      address: body.address,
      bedrooms: body.bedrooms,
      bathrooms: body.bathrooms,
      area: body.area,
      status: body.status,
      type: body.type,
      images: body.images || [],
      features: body.features || [],
      number: body.number
    });

    // Save to DB
    await property.save();

    return NextResponse.json(
      { message: "Property added successfully", property },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error adding property:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
