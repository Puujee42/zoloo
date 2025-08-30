import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware(); // Correctly creates the middleware

export const config = {
  // This matcher is the standard and recommended way to apply middleware
  // while avoiding static files and internal Next.js assets.
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};