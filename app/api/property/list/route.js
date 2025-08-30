// /app/api/property/list/route.js
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();

        // ✅ Read query params for pagination
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 20;
        const skip = (page - 1) * limit;

        // ✅ Fetch data efficiently
        const [properties, total] = await Promise.all([
            Property.find({}, "-__v")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(200)
                .lean()
                .exec(),
            Property.countDocuments()
        ]);

        return NextResponse.json({
            success: true,
            page,
            totalPages: Math.ceil(total / limit),
            total,
            properties,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
