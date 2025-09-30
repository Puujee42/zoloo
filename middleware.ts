// src/middleware.ts
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware({
  // Add the webhook route to the public routes.
  // This tells Clerk to skip authentication for this specific route.
  publicRoutes: ["/api/inngest"],
});

export const config = {
  // The matcher needs to include the API route
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};