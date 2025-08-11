// pages/api/product/[id].js

import { ObjectId } from 'mongodb';
import { getProductById } from '@/lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  // Validate ObjectId format
  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: 'Invalid product ID' });
  }

  // Fetch product by id
  const product = await getProductById(id);

  if (!product) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }

  // Convert _id to string before sending
  const productWithStringId = {
    ...product,
    _id: product._id.toString(),
  };

  res.status(200).json({ success: true, product: productWithStringId });
}
