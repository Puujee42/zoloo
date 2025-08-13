import { NextResponse } from 'next/server';
import Property from '@/models/Property';
import connectDB from '@/config/db';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('q');
    const propertyType = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    // Add more params as needed (bedrooms, bathrooms, etc.)

    // Build the query object dynamically
    const query = {};

    if (searchTerm) {
      // Use $regex for a flexible, case-insensitive search on title and address
      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { address: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    if (propertyType) {
      query.type = propertyType;
    }

    // Handle price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }
    
    const properties = await Property.find(query).sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: properties });

  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}