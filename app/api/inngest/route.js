import { serve } from "inngest/next";
import { inngest, syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/inngest";

// This API route serves your Inngest functions and handles webhooks
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion
  ],
  // --- THIS IS THE FIX ---
  // This line tells Inngest to use your Clerk Webhook Signing Secret
  // to verify the signature of incoming webhooks. If the signature is
  // valid, it will process the event. If not, it will reject it.
  signingKey: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
});