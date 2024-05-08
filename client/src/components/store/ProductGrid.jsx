
import axios from "axios";
import Product from "./Product";
import React,{ useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";


const ProductGrid = () => {

    const [products, setProducts] = useState([]);

useEffect(() => {
axios.get("http://localhost:4000/api/products")
    .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
    })
    .catch((err) => {
        console.log(err);
    });

}, []);

  
    return (
      <div className="flex justify-between items-center my-4 mx-2">
      
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
        {products.map((product) => {
            return (
            <Product key={product._id} product={product} />
            )
        })}
        </div>
      </div>
    
    )

}

export default ProductGrid;
