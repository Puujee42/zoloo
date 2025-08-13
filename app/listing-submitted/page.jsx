// /app/listing-submitted/page.jsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

const ListingSubmittedPage = () => {
  const router = useRouter()

  // 5 секундын дараа борлуулагчийн хяналтын самбар руу автоматаар шилжүүлэх
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/seller') // Замыг '/seller' болгож өөрчилсөн
    }, 5000)

    // Хэрэглэгч гараар өөр хуудас руу шилжвэл таймерыг цэвэрлэх
    return () => clearTimeout(timer);
  }, [router])

  return (
    // --- 1. Дэвсгэрийг zolGreen/5 болгосон ---
    <div className='h-screen bg-zolGreen/5 flex flex-col justify-center items-center p-4'>
      <div className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-100 text-center max-w-lg w-full">
        {/* --- 2. Icon-ы өнгийг zolGreen болгосон --- */}
        <CheckCircle className="mx-auto h-20 w-20 text-zolGreen" strokeWidth={1.5} />
        
        {/* --- 3. Гарчгийг Playfair фонттой болгосон --- */}
        <h1 className="font-playfair mt-6 text-3xl md:text-4xl font-bold text-zolGreen">
          Амжилттай бүртгэгдлээ!
        </h1>
        <p className="mt-3 text-zolDark/80 leading-relaxed">
          Таны үл хөдлөх хөрөнгө одоо зах зээлд нийтлэгдлээ. Та бүх заруудаа өөрийн хяналтын самбараас харж, удирдах боломжтой.
        </p>
        <div className="mt-8">
          {/* --- 4. Товчлуурыг zolGold болгосон --- */}
          <Link 
            href="/seller" // Замыг '/seller' болгож өөрчилсөн
            className="inline-block w-full sm:w-auto bg-zolGold text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
          >
            Хяналтын самбар луу очих
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