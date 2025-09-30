import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 2. Get the authenticated user's ID from Clerk
    const { userId } = getAuth(request); // Pass the request object here

    // 3. If no user is logged in, return an unauthorized error
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // 4. Create a filter object to use in both queries
    const queryFilter = { userId: userId };
    console.log(userId)
    // 5. Fetch properties AND total count that match the seller's ID
    const [properties, total] = await Promise.all([
      Property.find(queryFilter, "-__v") // Use the filter
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean()
        .exec(),
      Property.countDocuments(queryFilter), // Use the same filter for the count
    ]);

    return NextResponse.json({
      success: true,
      page,
      totalPages: Math.ceil(total / limit),
      total,
      properties,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}