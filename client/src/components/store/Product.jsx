import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addToCart} from '../../redux/cartSlice';
import { useCompare } from '../../context/CompareContext';
  
export default function Product({product}) {

    const { addToCompare } = useCompare();

    const dispatch = useDispatch();
    
    return (
    <div className="bg-white ">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 lg:pt-8">
          <h2 className="sr-only">Products</h2>
  
          <div > 
              
                <div className="border-2 border-gray-300 rounded-md shadow-lg ">
                <Link to={`/view-product/${product._id}`}  className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg rounded-b-none bg-white xl:aspect-h-6 xl:aspect-w-7 " >
                  <img
                    src={`http://localhost:4000${product.image}`}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                    style={{ width: '200px', height: '200px', display: 'block', marginLeft: 'auto', marginRight: 'auto', marginTop:'10px'  }}
                  />
                </div>
                <div className="border-t border-gray-300  lg:h-32 xl:h-30">
                
                <h3 className="mt-4 ml-3 mr-2 text-md text-gray-900 font-bold">{product.name}</h3>
                <p className="mt-1 ml-3  mr-2 text-sm font-small text-gray-500 font-mono ">IN STOCK : {product.countInStock}</p>
                <p className="mt-1 ml-3 mr-2 text-lg font-medium text-gray-700 ">
                  <span className="text-sm">LKR </span> 
                  {product.price}.00</p>
                </div>
                </Link>
                <div className="mb-5 text-sm mt-1 flex flex-col items-center ">
                {/* <Link to={`/view-product/${product._id}`} 
                className="m-1 w-64 text-center rounded-md border border-transparent  bg-color4 px-8 py-2  text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
                          View Product<span className="sr-only">, {product._id}</span>
                </Link> */}
                <button className=" m-1 w-64 rounded-md   border border-transparent  bg-color4 px-8 py-2  text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  onClick={() => {
                    const productDetails = {
                      id: product._id, 
                      title: product.name, 
                      image: product.image, 
                      price: product.price 
                    };
                    console.log(productDetails);
                    dispatch(addToCart(productDetails));
                  }}
                    >
                      Add to Cart
                  </button>
                  <button 
                    onClick={() => addToCompare(product._id)}
                    className="m-1 w-64 rounded-md  border border-transparent  bg-color4 px-8 py-2   text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Compare Product<span className="sr-only">, {product._id}</span>
                  </button>
                </div>
                </div>
            
            
          </div>
        </div>
      </div>
    )
  }
  