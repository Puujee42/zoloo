import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ✅ string for Clerk user IDs
  title: { type: String, required: true },
  description: String,
  address: String,
  type: String,
  status: String,
  price: Number,
  area: Number,
  number: Number,
  images: { type: [String], required: true },
  videos: { type: [String], default:[] }, // ✅ Add this line for the video URL
  features: [String],
  createdAt: { type: Date, default: Date.now },
  RoomCount:Number
});

export default mongoose.models.Property || mongoose.model('Property', PropertySchema);