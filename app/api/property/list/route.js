// /app/api/property/list/route.js

import connectDB from "@/config/db";
import Property from "@/models/Property"; // CHANGE 1: Renamed 'Product' to 'Property' for clarity
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        await connectDB();
        
        // CHANGE 2: Use the correct model and variable name, and sort by newest
        const properties = await Property.find({}).sort({ createdAt: -1 });
        
        // CHANGE 3: Return the data using the 'properties' key
        return NextResponse.json({ success: true, properties });

    } catch (error) {
        // Best practice: Add a status code to the error response
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}