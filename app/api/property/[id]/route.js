// Recommended file path: /app/api/properties/[id]/route.js

import { NextResponse } from 'next/server';
// Import the new data fetching function for properties
import { getPropertyById } from '@/lib/data';

export async function GET(request, { params }) {
  const { id } = params;

  // Use the new function to fetch the property
  const property = await getPropertyById(id);

  // If no property is found, return a clear, resource-specific error
  if (!property) {
    return NextResponse.json({ error: 'Property not found' }, { status: 404 });
  }

  // Return the fetched property under the "property" key
  return NextResponse.json({ property });
}