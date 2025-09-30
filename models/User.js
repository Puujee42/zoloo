// models/User.js

import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true },   // keep Clerk ID as _id
    name: { type: String },                  // optional
    email: { type: String, unique: true },   // optional
    imageUrl: { type: String },              // optional
    cartItems: { type: Object, default: {} }
  },
  { minimize: false }
);

// --- FIX THIS LINE ---
// Use 'User' (PascalCase) in both places
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;