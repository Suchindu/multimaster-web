import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

  
  export default function Product({product}) {
   
    return (
    <div className="bg-white ">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
  
          <div>
              <Link to={`/View-product/${product._id}`}  className="group">
                <div className="border border-gray-300 rounded-lg">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 ">
                  <img
                    src={`http://localhost:4000${product.image}`}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  />
                </div>
                <div className="border-t border-gray-300">
                <h3 className="mt-4 ml-3 text-sm text-gray-700">{product.name}</h3>
                <p className="mt-1 ml-3 text-lg font-medium text-gray-900">{product.category}</p>
                <p className="mt-1 ml-3 text-lg font-medium text-gray-900">{product.price}</p>
                <Link to={`/View-product/${product._id}`} className="border border-gray-300 rounded px-2 py-1 text-indigo-600 hover:text-indigo-900">
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
  