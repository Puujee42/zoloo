'use client'

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
        <SignIn
          routing="path"  // Explicitly use path-based routing (requires catch-all)
          afterSignInUrl="/seller"  // Redirect to seller dashboard after sign-in (customize as needed; was "/" before)
          signUpUrl="/sign-up"  // Link to sign-up page
        />
        <p className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}