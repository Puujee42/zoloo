// /app/api/property/seller-list/route.js
import connectDB from '@/config/db';
import Property from '@/models/Property';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    const properties = await Property.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, properties });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
