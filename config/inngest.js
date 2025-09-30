import User from "@/models/User";
import { Inngest } from "inngest";
import connectDB from "./db";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "zulaa" });

// --- USER CREATION ---
export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "user.created" }, // ✅ matches Clerk's actual event
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      // ✅ use Clerk ID as string (make sure schema supports String _id)
      _id: id,
      email: email_addresses?.[0]?.email_address ?? null, // ✅ safe access
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      imageUrl: image_url ?? null,
    };

    await connectDB();

    try {
      await User.findOneAndUpdate(
        { _id: id },
        { $set: userData },
        { upsert: true, new: true }
      );

      console.log(`✅ User ${id} synced successfully.`);
      return { message: `User ${id} synced successfully.` };
    } catch (error) {
      console.error(`❌ FAILED to sync user ${id}. Reason:`, error);
      throw error; // let Inngest retry
    }
  }
);

// --- USER UPDATION ---
export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "user.updated" }, // ✅ matches Clerk's actual event
  async ({ event }) => {
    const { id, first_name, last_name, image_url } = event.data;

    const userData = {
      name: `${first_name ?? ""} ${last_name ?? ""}`.trim(),
      imageUrl: image_url ?? null,
    };

    await connectDB();
    await User.findOneAndUpdate({ _id: id }, userData);

    return { message: `User ${id} updated successfully.` };
  }
);

// --- USER DELETION ---
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "user.deleted" }, // ✅ matches Clerk's actual event
  async ({ event }) => {
    const { id } = event.data;

    if (!id) {
      return { message: "Deletion event received without a user ID. Skipping." };
    }

    await connectDB();
    await User.findOneAndDelete({ _id: id });

    return { message: `User ${id} deleted successfully.` };
  }
);
