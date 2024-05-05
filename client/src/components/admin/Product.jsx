import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import ProductContext from '../../context/ProductContext';


export default function Product() {

  
  const { product, getProducts } = useContext(ProductContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  
  
  
  const componentRef = useRef();

      useEffect(() => {
        getProducts();
      },[]);

      useEffect(() => {
        if (search.trim() !== '') {
            const filtered = product.filter((product) => {
                return product.name.toLowerCase().includes(search.toLowerCase()) ||
                product.brand.toLowerCase().includes(search.toLowerCase()) ||
                product.price.toString().includes(search) ||
                product.category.toLowerCase().includes(search.toLowerCase()) 

            });
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(product);
        }
    }, [product, search]);

        // const getProducts = () => {
        //       axios.get('http://localhost:4000/api/products/')
        //       .then((response) => {
              
        //           setProducts(response.data.products || []);
        //       })
        //       .catch(error => {
        //         console.error("Axios Erro Occur :", error);
        //       });
        //   }
        
        const deleteProduct = (id) => {
          if (window.confirm('Are you sure you want to delete this product?')){
          axios.delete(`http://localhost:4000/api/products/${id}`)
          .then((res) => {
            console.log(res.data);
            alert('Product Deleted Successfully');
            getProducts();
          })
          .catch(error => {
            console.error("Axios Erro Occur :", error);
          });
        }
      }


  return (
    <div >

    <div className="border rounded-md border-gray-300 p-4 px-4 m-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">Product Details</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all the products available in the store.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 sm:pr-60 rounded-lg text-sm focus:outline-none w-full sm:w-auto"
        />
        <button 
        // onClick={handleSearch}
        className="bg-color4 text-white px-6 py-2 rounded-lg ml-2 hover:bg-indigo-500 focus:outline-none mt-2 sm:mt-0 w-full sm:w-auto"
        
        >
            Search
        </button>
      </div>

        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
       
          <button
            type="button"
            className="block rounded-md bg-color4 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <Link to="/add-products">Add Product</Link>
          </button>
          <ReactToPrint
        trigger={() => (
          <button
            type="button"
            
            className="block rounded-md bg-color4 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 mt-2"
          >
            Print as PDF
          </button>
          )}
          content={() => componentRef.current}
          />

        </div>
       
      </div>
    <div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
            
              <table ref={componentRef} className="min-w-full divide-y divide-gray-300">
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
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 hide-on-print">
                      <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6 hide-on-print">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {filteredProducts &&filteredProducts.length > 0 ? filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="whitespace-wrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {product._id}
                      </td>
                      <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">{product.name}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.brand}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.category}</td>
                      <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">{product.description}</td>
                      <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">{product.image}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{product.countInStock}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={`/edit-product/${product._id}`} className="border border-gray-300 rounded px-2 py-1 text-indigo-600 hover:text-indigo-900 hide-on-print">
                          Edit<span className="sr-only">, {product._id}</span>
                        </Link>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <button onClick={e=> deleteProduct(product._id)} className="border border-gray-300 rounded px-2 py-1 text-indigo-600 hover:text-indigo-900 hide-on-print">
                          Delete<span className="sr-only">, {product._id}</span>
                        </button>
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
    </div>

  )
}
