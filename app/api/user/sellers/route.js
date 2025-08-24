import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Property from "@/models/Property";
import User from "@/models/User"; // <-- Your user model
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        const { userId } = getAuth(request);

        if (!userId || !authSeller(userId)) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Access Denied." },
                { status: 401 }
            );
        }

        await connectDB();

        // Find Mongo user from Clerk ID
        const mongoUser = await User.findOne({ clerkId: userId });
        if (!mongoUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Now query properties by Mongo ObjectId
        const properties = await Property.find({ userId: mongoUser._id })
            .sort({ createdAt: -1 });

        return NextResponse.json({ success: true, properties });

    } catch (error) {
        console.error("Error fetching seller properties:", error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
