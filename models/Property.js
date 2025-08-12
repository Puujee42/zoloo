import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    // --- THIS IS THE FIX ---
    // The userId is now a String to store the Clerk user ID.
    userId: { 
        type: String, 
        required: true 
    },
    
    // Core Property Details
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true, trim: true },

    // Property Specifications
    bedrooms: { type: Number, required: true, min: 0 },
    bathrooms: { type: Number, required: true, min: 0 },
    area: { type: Number, required: true, comment: "Area in square feet" },

    // Categorization
   status: {
    type: String,
    required: true,
    // Add the Mongolian values to the list of allowed values
    enum: ['For Sale', 'For Rent', 'Зарагдана', 'Түрээслүүлнэ'], 
    default: 'For Sale',
    },
    type: {
        type: String,
        required: true,
        enum: ["House", "Apartment", "Condo", "Villa", "Land", "Townhouse"],
    },
    
    // Media
    images: { type: [String], required: true },
    
    // Additional Features
    features: { type: [String], default: [] },

}, { 
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
});

const Property = mongoose.models.Property || mongoose.model('Property', propertySchema);

export default Property;