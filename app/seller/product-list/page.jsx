'use client'
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/seller/Footer"; // Assuming this path is correct
import Loading from "@/components/Loading"; // Assuming this path is correct
import axios from "axios";
import toast from "react-hot-toast"; // You need to import toast

const ProductList = () => {

  const { router, getToken, user } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();
      // Assuming this is your correct API route for fetching seller-specific products
      const { data } = await axios.get('/api/product/seller-list', { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // FIX #1: Corrected the typo from 'errorr' to 'error'
      toast.error(error.response?.data?.message || 'Failed to fetch products');
      console.error("Fetch products error:", error);
    } finally {
      setLoading(false); // Make sure loading stops even if there's an error
    }
  }

  useEffect(() => {
    if (user) {
      fetchSellerProduct();
    }
  }, [user]);

  // Loading
  const isValidImage = (images) => {
    return images && Array.isArray(images) && images.length > 0 && typeof images[0] === 'string' && images[0].trim() !== '';
  };

  // Make loading state more reliable
  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="w-full md:p-10 p-4">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>
        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
          <table className="table-fixed w-full overflow-hidden">
            <thead className="text-gray-900 text-sm text-left">
              <tr>
                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">Product</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Category</th>
                <th className="px-4 py-3 font-medium truncate">Price</th>
                <th className="px-4 py-3 font-medium truncate max-sm:hidden">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-500">
              {products.map((product, index) => (
                <tr key={index} className="border-t border-gray-500/20">
                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                    <div className="bg-gray-500/10 rounded p-2">
                      
                      {/* --- THIS IS THE FINAL FIX --- */}
                      <Image
                        src={
                          isValidImage(product.images) ? product.images[0] : assets.upload_area
                        }
                        alt={product.name}
                        className="w-16 h-16 object-cover" // Set a fixed height for consistency
                        width={100} // Provide a base width
                        height={100} // Provide a base height
                      />
                      {/* --- END OF FIX --- */}
                      
                    </div>
                    <span className="truncate w-full">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3 max-sm:hidden">{product.category}</td>
                  <td className="px-4 py-3">${product.offerPrice}</td>
                  <td className="px-4 py-3 max-sm:hidden">
                    <button onClick={() => router.push(`/product/${product._id}`)} className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-orange-600 text-white rounded-md">
                      <span className="hidden md:block">Visit</span>
                      <Image
                        className="h-3.5"
                        src={assets.redirect_icon}
                        alt="redirect_icon"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductList;