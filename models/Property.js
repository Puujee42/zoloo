// /models/Property.js

import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    // ===================================================================
    // THE FIX IS HERE
    // ===================================================================
    userId: { 
        // Tell Mongoose this field will store a MongoDB ObjectId
        type: mongoose.Schema.Types.ObjectId,
        // Tell Mongoose that this ObjectId refers to a document in the 'User' collection
        ref: 'User',
        required: true 
    },
    // ===================================================================
    
    // Core Property Details
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true, trim: true },

    // Property Specifications
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    area: { type: Number, required: true, comment: "Area in square meters" },

    // Categorization
   status: {
    type: String,
    required: true,
    enum: ['For Sale', 'For Rent', 'Зарагдана', 'Түрээслүүлнэ'], 
    default: 'For Sale',
    },
    type: {
        type: String,
        required: true,
        enum: ["House", "Apartment", "Condo", "Villa", "Land", "Townhouse"],
    },
    
    // Media
    images: [{ type: String }],
    videos: [{ type: String }],
    
    // Additional Features
    features: { type: [String], default: [] },

}, { 
    timestamps: true 
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property;