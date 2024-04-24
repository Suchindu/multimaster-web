import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

  
  export default function Product({product}) {
   
    return (
    <div className="bg-white ">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:pt-8">
          <h2 className="sr-only">Products</h2>
  
          <div > 
              <Link to={`/view-product/${product._id}`}  className="group">
                <div className="border border-gray-300 rounded-lg ">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg rounded-b-none bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                  <img
                    src={`http://localhost:4000${product.image}`}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="border-t border-gray-300 lg:h-32 xl:h-30">
                
                <h3 className="mt-4 ml-3 mr-2 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 ml-3  mr-2 text-md font-medium text-gray-900">IN STOCK : {product.countInStock}</p>
                <p className="mt-1 ml-3 mr-2 text-lg font-medium text-gray-900">
                  <span className="text-sm">LKR </span> 
                  {product.price}</p>
                </div>
                <div className="mb-5 mt-1 flex justify-center">
                <Link to={`/view-product/${product._id}`} className="rounded-md border border-transparent  bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                          View Product<span className="sr-only">, {product._id}</span>
                </Link>
                
                </div>
                </div>
              </Link>
            
          </div>
        </div>
      </div>
    )
  }
  