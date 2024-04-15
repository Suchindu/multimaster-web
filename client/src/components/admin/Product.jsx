import React, { useEffect } from 'react';
import AddProduct from './AddProduct';
import axios from 'axios';
import { useState } from 'react';
// import { get, set } from 'mongoose';


export default function Product() {
  const [products, setProducts] = useState([]);
  // const [submitted, setSubmitted] = useState(false);


      useEffect(() => {
        getProducts();
      },[]);


        const getProducts = () => {
              axios.get('http://localhost:4000/api/products/')
              .then((response) => {
              
                  setProducts(response.data.products || []);
              })
              .catch(error => {
                console.error("Axios Erro Occur :", error);
              });
          }

          const addProducts = (data) =>{
            // setSubmitted(true);
            
            const payload = {
              // id: data.id,
              name: data.name,
              brand: data.brand,
              price: data.price, 
              category: data.category,
              image: data.image,
              description: data.description,
              image: data.image,
              countInStock: data.countInStock
            }
              axios.post('http://localhost:4000/api/products/', payload)
              .then(() => {
                  
                  getProducts();
                  // setSubmitted(false);
              })
              .catch(error => {
                console.error("Axios Erro Occur :", error);
              });
          }

  return (
    <div>
    <AddProduct
      addProduct = {addProducts}
    /> 
    <div className="border rounded-md border-gray-300 p-4 px-4 m-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Product Details</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products available in the store.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Product
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Brand
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Cetagory
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Description
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Image Path
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:text-nowrap">
                      In Stock
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {products.length > 0 ? products.map((product) => (
                    <tr key={product._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product._id}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.brand}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.image}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.countInStock}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="border border-gray-300 rounded px-2 py-1 text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {product._id}</span>
                        </a>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <a href="#" className="border border-gray-300 rounded px-2 py-1 text-indigo-600 hover:text-indigo-900">
                          Delete<span className="sr-only">, {product._id}</span>
                        </a>
                      </td>
                    </tr>
                  )):
                  
                  <tr>
                  <td scope="col" className="px-3 py-16 text-center text-sm font-semibold text-gray-400" colSpan={10}>
                  No Products Available
                </td>
                </tr>
}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
