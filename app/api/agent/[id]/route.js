// /app/api/agent/[id]/route.js
import { NextResponse } from 'next/server';
import Property from '@/models/Property';
import connectDB from '@/config/db';

// The second argument should be an object containing `params`
export async function GET(request, { params }) {
  try {
    await connectDB();
    
    // Destructure the id from params
    const { id: agentId } = await params;

    if (!agentId) {
      return NextResponse.json({ message: 'Agent ID is required' }, { status: 400 });
    }

    // Find all properties where the `userId` matches the agent's ID
    const properties = await Property.find({ userId: agentId }).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, properties }, { status: 200 });

  } catch (error) {
    console.error('Error fetching agent properties:', error);
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}