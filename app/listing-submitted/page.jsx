// Recommended file path: /app/listing-submitted/page.jsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react' // A clean icon for success
import Link from 'next/link'

const ListingSubmittedPage = () => {
  const router = useRouter()

  // Automatically redirect to the seller's dashboard after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/seller-dashboard')
    }, 5000)

    // Clean up the timer if the user navigates away manually
    return () => clearTimeout(timer);
  }, [router])

  return (
    <div className='h-screen bg-gray-50 flex flex-col justify-center items-center p-4'>
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-lg w-full">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
        <h1 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900">
          Property Listed Successfully!
        </h1>
        <p className="mt-3 text-gray-600">
          Your property is now live on the market. You can view and manage all of your listings from your personal dashboard.
        </p>
        <div className="mt-8">
          <Link 
            href="/seller-dashboard"
            className="inline-block w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View My Listings
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          You will be redirected automatically in 5 seconds...
        </p>
      </div>
    </div>
  )
}

export default ListingSubmittedPage