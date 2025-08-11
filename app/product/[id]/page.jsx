import React from 'react';
import { getProductById, getProducts } from '@/lib/data';
import ProductDetailsClient from './ProductDetailsClient';
import Navbar from '@/components/Navbar';

export default async function ProductPage({ params }) {
  const { id } = params;

  // Fetch the main product and the list of other products in parallel for efficiency
  const [product, allProducts] = await Promise.all([
    getProductById(id),
    getProducts(4) // Fetch 4 products for the "You might also like" section
  ]);

  // If the main product isn't found, show a not found page.
  if (!product) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold">Product not found.</h1>
        <p>The product you are looking for does not exist.</p>
      </div>
    );
  }

  // Filter the current product out of the "other products" list
  const otherProducts = allProducts.filter(p => p._id !== product._id);

  // Render the Client Component and pass the data down as props
  return(
  <>
    <Navbar/>
   <ProductDetailsClient product={product} otherProducts={otherProducts} />;
  </> )
}