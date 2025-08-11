import mongoose from 'mongoose';
import connectDB from '@/config/db';
import Product from '@/models/Product';

// --- This function is the same as before, just ensure it's here ---
export async function getProductById(id) {
  if (typeof id !== 'string' || !id) return null;
  const cleanId = id.trim();
  if (!mongoose.Types.ObjectId.isValid(cleanId)) return null;
  try {
    await connectDB();
    const product = await Product.findById(cleanId).lean();
    if (!product) return null;
    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.error('[data.js] DB Error in getProductById:', error);
    return null;
  }
}

// --- ADD THIS NEW FUNCTION ---
// Fetches a few products to display in the "You might also like" section.
export async function getProducts(limit = 4) {
  try {
    await connectDB();
    // Find some products, sort by date, limit the result.
    const products = await Product.find({}).sort({ date: -1 }).limit(limit).lean();
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("[data.js] DB Error in getProducts:", error);
    return [];
  }
}