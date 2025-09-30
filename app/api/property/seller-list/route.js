// /app/api/property/seller-list/route.js
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";
import { getAuth } from '@clerk/nextjs/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    console.log('CLERK AUTH STATE USING getAuth(request):', { userId });

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: getAuth(request) failed to find user." },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    // --- FIX IS HERE ---
    // Corrected variable name from search_params to searchParams
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // This query is now correct as well
    const queryFilter = { userId };

    const [properties, total] = await Promise.all([
      Property.find(queryFilter, "-__v").sort({ createdAt: -1 }).skip(skip).limit(limit).lean().exec(),
      Property.countDocuments(queryFilter),
    ]);

    return NextResponse.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      properties,
    });
  } catch (err) {
    console.error("API Error in /api/property/seller-list:", err);
    return NextResponse.json(
      { success: false, message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}