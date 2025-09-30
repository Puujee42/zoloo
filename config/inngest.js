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

        try {
            await User.findOneAndUpdate(
                { _id: id },
                { $set: userData },
                { upsert: true, new: true } // 'new: true' is good practice, returns the doc
            );
            console.log(`User ${id} synced successfully.`);
            return { message: `User ${id} synced successfully.` };

        } catch (error) {
            // --- THIS IS THE FIX ---
            console.error(`FAILED to sync user ${id}. Reason:`, error);

            // Re-throwing the error will make the Inngest run fail,
            // which is the CORRECT behavior when something goes wrong.
            // This allows you to see the error in the Inngest dashboard and trigger retries.
            throw error; 
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