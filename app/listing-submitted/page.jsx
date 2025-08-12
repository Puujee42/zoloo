// Санал болгож буй файлын зам: /app/listing-submitted/page.jsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react' // Амжилтыг илэрхийлэх цэвэрхэн икон
import Link from 'next/link'

const ListingSubmittedPage = () => {
  const router = useRouter()

  // 5 секундын дараа борлуулагчийн хяналтын самбар руу автоматаар шилжүүлэх
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/seller-dashboard')
    }, 5000)

    // Хэрэглэгч гараар өөр хуудас руу шилжвэл таймерыг цэвэрлэх
    return () => clearTimeout(timer);
  }, [router])

  return (
    <div className='h-screen bg-gray-50 flex flex-col justify-center items-center p-4'>
      <div className="bg-white p-8 md:p-12 rounded-lg shadow-xl text-center max-w-lg w-full">
        <CheckCircle className="mx-auto h-20 w-20 text-green-500" />
        <h1 className="mt-6 text-2xl md:text-3xl font-bold text-gray-900">
          Үл хөдлөх хөрөнгө амжилттай бүртгэгдлээ!
        </h1>
        <p className="mt-3 text-gray-600">
          Таны үл хөдлөх хөрөнгө одоо зах зээлд нийтлэгдлээ. Та бүх заруудаа өөрийн хяналтын самбараас харж, удирдах боломжтой.
        </p>
        <div className="mt-8">
          <Link 
            href="/seller-dashboard"
            className="inline-block w-full sm:w-auto bg-blue-600 text-white font-semibold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Миний зарууд харах
          </Link>
        </div>
        <p className="mt-4 text-xs text-gray-500">
          Та 5 секундын дараа автоматаар шилжих болно...
        </p>
      </div>
    </div>
  )
}

export default ListingSubmittedPage