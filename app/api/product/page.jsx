'use client'

import React from 'react'
import Link from 'next/link'
import { useAppContext } from '@/context/AppContext' // Make sure this path is correct

export default function ProductListPage() {
  const { products, currency, isLoading } = useAppContext()

  if (isLoading) {
    return <p className="p-4 text-center">Loading products...</p>
  }

  if (!products.length) {
    return <p className="p-4 text-center">No products found.</p>
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Link
            key={product._id}
            href={`/product/${product._id}`}
            className="group border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="h-48 w-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {product.images && product.images[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="text-gray-500">No image available</div>
              )}
            </div>
            <div className="p-4 bg-white">
              <h2 className="font-semibold text-lg truncate text-gray-900" title={product.name}>{product.name}</h2>
              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
              <p className="mt-3 font-bold text-xl text-gray-800">{currency}{product.offerPrice}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}