import mongoose from 'mongoose';
import connectDB from '@/config/db';
import Property from '@/models/Property'; // Your new Property model
import User from '@/models/User';       // Your new User model

/**
 * Fetches a single property by its ID and manually "populates" the user details.
 * @param {string} id The MongoDB ObjectId of the property.
 * @returns {object|null} The property object with an embedded 'user' object, or null.
 */
export async function getPropertyById(id) {
    if (typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
        return null;
    }

    try {
        await connectDB();
        // Step 1: Fetch the property document.
        const property = await Property.findById(id).lean();

        if (!property) return null;

        // Step 2: Use the `userId` string from the property to find the corresponding user.
        // Assumes your User model stores the Clerk ID in a 'clerkId' field.
        const user = await User.findOne({ clerkId: property.userId }).select('name image').lean();

        // Step 3: Attach the fetched user details to the property object.
        property.user = user || null; // Attach the user or null if not found

        return JSON.parse(JSON.stringify(property));
    } catch (error) {
        console.error('[data.js] DB Error in getPropertyById:', error);
        return null;
    }
}

/**
 * Fetches multiple properties and efficiently "populates" their user details.
 * This approach avoids the N+1 query problem.
 * @param {number} [limit=0] - The number of properties to return. 0 means no limit.
 * @returns {Array} An array of property objects, each with an embedded 'user' object.
 */
export async function getProperties(limit = 0) {
    try {
        await connectDB();

        // Step 1: Fetch all the base properties.
        const query = Property.find({}).sort({ createdAt: -1 });
        if (limit > 0) {
            query.limit(limit);
        }
        const properties = await query.lean();

        if (properties.length === 0) return [];

        // Step 2: Collect all unique user (Clerk) IDs from the properties.
        const userIds = [...new Set(properties.map(p => p.userId))];

        // Step 3: Fetch all the required users in a single database query.
        const users = await User.find({ clerkId: { $in: userIds } }).select('clerkId name image').lean();

        // Step 4: Create a map for quick lookups (clerkId -> user object).
        const userMap = users.reduce((acc, user) => {
            acc[user.clerkId] = user;
            return acc;
        }, {});

        // Step 5: Attach the user object to each corresponding property.
        const propertiesWithUsers = properties.map(property => {
            property.user = userMap[property.userId] || null;
            return property;
        });

        return JSON.parse(JSON.stringify(propertiesWithUsers));
    } catch (error) {
        console.error("[data.js] DB Error in getProperties:", error);
        return [];
    }
}