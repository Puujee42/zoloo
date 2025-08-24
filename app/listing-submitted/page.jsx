// /app/listing-submitted/page.jsx
'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { motion } from 'framer-motion'

const ListingSubmittedPage = () => {
  const router = useRouter()

  // 5 секундийн дараа борлуулагчийн хяналтын самбар руу автоматаар шилжүүлэх
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/seller')
    }, 5000)

    return () => clearTimeout(timer)
  }, [router])

  return (
    <div className='h-screen bg-zolGreen/5 flex flex-col justify-center items-center p-4'>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl border border-gray-100 text-center max-w-lg w-full"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.2 }}
        >
          <CheckCircle className="mx-auto h-20 w-20 text-zolGreen" strokeWidth={1.5} />
        </motion.div>
        
        {/* Гарчиг */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-playfair mt-6 text-3xl md:text-4xl font-bold text-zolGreen"
        >
          Амжилттай бүртгэгдлээ!
        </motion.h1>

        {/* Тайлбар */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-3 text-zolDark/80 leading-relaxed"
        >
          Таны үл хөдлөх хөрөнгө одоо зах зээлд нийтлэгдлээ. Та бүх заруудаа өөрийн хяналтын самбараас харж, удирдах боломжтой.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8"
        >
          <Link 
            href="/seller"
            className="inline-block w-full sm:w-auto bg-zolGold text-white font-semibold py-3 px-8 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-md"
          >
            Хяналтын самбар луу очих
          </Link>
        </motion.div>

        {/* Auto redirect text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-4 text-xs text-gray-500"
        >
          Та 5 секундын дараа автоматаар шилжих болно...
        </motion.p>
      </motion.div>
    </div>
  )
}

export default ListingSubmittedPage
