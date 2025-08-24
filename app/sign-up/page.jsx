// /app/sign-up/page.jsx
'use client'

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Create Account</h2>
        <SignUp
            //The following are very important!
          afterSignUpUrl="/" // Redirect to the homepage after signup
          redirectUrl="/"       // Also redirect to the homepage
          signInUrl="/sign-in" // Link to the sign-in page
        />
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}