
// /app/sign-in/page.jsx
'use client'

import { SignIn } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Sign In</h2>
        <SignIn
          afterSignInUrl="/" // Redirect to the homepage after sign in
          redirectUrl="/"       // Also redirect to the homepage
          signUpUrl="/sign-up" // Link to the sign-up page
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
