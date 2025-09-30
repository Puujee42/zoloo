import User from "@/models/User";
import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "zulaa" });

// --- USER CREATION (THE FIX) ---
// This function now handles user creation and prevents duplicate errors.
export const syncUserCreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    }, 
    {
        event: 'clerk/user.created'
    },
    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url } = event.data;
        
        // Prepare user data object that matches your schema
        const userData = {
            _id: id,
            email: email_addresses[0].email_address,
            name: `${first_name} ${last_name}`.trim(), // Use trim() as a safeguard
            imageUrl: image_url
        };

        await connectDB();

        // **THE FIX IS HERE:**
        // We use `findOneAndUpdate` with the `upsert` option.
        // This command tells the database:
        // 1. TRY to find a document where the `_id` matches the user's Clerk ID.
        // 2. IF it exists, UPDATE it with the new `userData`.
        // 3. IF it DOES NOT exist, CREATE a new document using the `userData`.
        // This makes the function "idempotent" and completely prevents the duplicate key error.
        try {
            await User.findOneAndUpdate(
            { _id: id },        // The condition to find the user
            { $set: userData }, // The data to set on the user
            { upsert: true }    // `upsert: true` creates the document if it doesn't exist
        );

        return { message: `User ${id} synced successfully.` };
        } catch (error) {
            return {message:`user $`}
        }
    }
);

// --- USER UPDATION (This was already correct) ---
// This function correctly handles updates to a user's profile.
export const syncUserUpdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk/user.updated'
    },
    async ({ event }) => {
        const { id, first_name, last_name, image_url } = event.data;
        
        const userData = {
            name: `${first_name} ${last_name}`.trim(),
            imageUrl: image_url
        };

        await connectDB();

        // Your logic was correct: find the user by their Clerk ID and update their data.
        await User.findOneAndUpdate({ _id: id }, userData);

        return { message: `User ${id} updated successfully.` };
    }
);

// --- USER DELETION (This was already correct) ---
// This function correctly handles deleting a user from your database.
export const syncUserDeletion = inngest.createFunction(
    {
        id: 'delete-user-with-clerk'
    },
    {
        event: 'clerk/user.deleted'
    },
    async ({ event }) => {
        const { id } = event.data;
        
        // This check handles a rare edge case where a deleted event might be sent for a user that was never created.
        if (!id) {
            return { message: 'Deletion event received without a user ID. Skipping.' };
        }

        await connectDB();

        // Your logic was correct: find the user by their Clerk ID and delete them.
        await User.findOneAndDelete({ _id: id });

        return { message: `User ${id} deleted successfully.` };
    }
);