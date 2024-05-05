// import React from 'react';
// import { useState } from 'react';

// export default function SearchBasicExample() {
//     const [searchTerm, setSearchTerm] = useState('');

//     const handleSearch = () => {
//       console.log('Searching for:', searchTerm);
//       // Here you can implement your search logic...
//     };
  
//     return (
//       <div className="flex items-center justify-center mt-10">
//         <input
//           type="text"
//           placeholder="Search..."
//           value={searchTerm}
//           onChange={e => setSearchTerm(e.target.value)}
//           className="border-2 border-gray-300 bg-white h-10 px-5 pr-60 rounded-lg text-sm focus:outline-none"
//         />
//         <button 
//         onClick={handleSearch}
//         className="bg-blue-500 text-white px-6 py-2 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none"
//         >
//             Search
//         </button>
//       </div>
//     );
// }

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './Product';


const ProductList = () => {

  const [product, setProduct] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if(keyword){
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:4000/api/products?keyword=${keyword}`);
      setProduct(response.data.products);
      setLoading(false);
      setKeyword('');
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  }else{
      setProduct([]);
    }
  };
  
  useEffect(() => {
    fetchProducts();
  }, []);


  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={keyword}
        onChange={e => setKeyword(e.target.value)}
      />
      <button 
        onClick={fetchProducts}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none mt-2 sm:mt-0 w-full sm:w-auto"
        // className="bg-blue-500 text-white px-6 py-2 rounded-lg ml-2 hover:bg-blue-600 focus:outline-none mt-2 sm:mt-0 w-full sm:w-auto"
        >
            Search
        </button>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
        {product.map((product) => {
          return (
          <Product key={product._id} product={product} />
          )
      })}
      </div>
        
      )}
    </div>
  );
};

export default ProductList;