// /app/api/property/seller-list/route.js

import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller"; // Assuming this function is correct
import Property from "@/models/Property";  // CHANGE 1: Use the correct Model name
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // --- Authentication & Authorization ---
        const { userId } = getAuth(request);

        // This check is good, but let's make the response standard
        if (!userId || !authSeller(userId)) { 
            return NextResponse.json({ success: false, message: "Unauthorized: Access Denied." }, { status: 401 });
        }

        await connectDB();

        // --- THE CRITICAL FIX ---
        // CHANGE 2: Find properties where the 'userId' field matches the logged-in user's ID.
        // Also, use the 'properties' variable name and sort by newest.
        const properties = await Property.find({ userId: userId }).sort({ createdAt: -1 });

        // CHANGE 3: Return the fetched data under the 'properties' key
        return NextResponse.json({ success: true, properties });

    } catch (error) {
        console.error("Error fetching seller properties:", error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}