import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ✅ string for Clerk user IDs
  title: { type: String, required: true },
  description: String,
  address: String,
  type: String,
  status: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  area: Number,
  features: [String],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);
