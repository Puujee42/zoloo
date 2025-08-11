'use client';

import React, { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { useAppContext } from '@/context/AppContext'; // <-- 1. Import the context hook
import toast from 'react-hot-toast'; // <-- 2. Import the toast library

export default function ProductDetailsClient({ product, otherProducts }) {
  // 3. Get the addToCart function from the context
  const { addToCart } = useAppContext();

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [quantity, setQuantity] = useState(1);

  // 4. Implement the logic for the "Add to Cart" button
  const handleAddToCart = () => {
    // Your context's addToCart function likely adds one item at a time.
    // We can call it in a loop for the selected quantity.
    for (let i = 0; i < quantity; i++) {
      addToCart(product._id);
    }

    // 5. Show a success notification instead of an alert
    toast.success(`${quantity} x "${product.name}" added to cart!`, {
      style: {
        background: '#333',
        color: '#fff',
      },
    });
  };
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
  };

  // The rest of your return statement is PERFECT and does not need to change.
  // I am including it here for completeness.
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image Gallery */}
          <div>
            <div className="aspect-square w-full overflow-hidden rounded-lg border border-gray-200">
              <img src={selectedImage} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </div>
            <div className="mt-4 grid grid-cols-5 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square w-full rounded-md overflow-hidden border-2 transition-all ${selectedImage === image ? 'border-blue-600 scale-110' : 'border-transparent hover:border-blue-400'}`}
                >
                  <img src={image} alt={`${product.name} thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info & Actions */}
          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">{product.name}</h1>
            <p className="text-3xl font-semibold text-gray-800">{formatPrice(product.offerPrice)}</p>
            
            <div className="prose lg:prose-lg text-gray-600">
              <p>{product.description}</p>
            </div>

            {/* Actions Box */}
            <div className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
              <div className="space-y-4">
                <div className="text-lg font-semibold text-green-600">In Stock</div>
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-l-md transition">-</button>
                    <span className="px-4 py-1 text-lg font-medium">{quantity}</span>
                    <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-1 text-lg font-bold text-gray-600 hover:bg-gray-100 rounded-r-md transition">+</button>
                  </div>
                </div>
                {/* Add to Cart Button */}
                <button onClick={handleAddToCart} className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Other Products Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {otherProducts.map(p => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}