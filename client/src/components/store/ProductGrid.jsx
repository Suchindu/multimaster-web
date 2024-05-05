
import axios from "axios";
import Product from "./Product";
import React,{ useState, useEffect } from "react";

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
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
        <svg
                  viewBox="0 0 1208 1024"
                  aria-hidden="true"
                  className="absolute -bottom-48 left-1/2 h-[64rem] -translate-x-1/2 translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] lg:-top-48 lg:bottom-auto lg:translate-y-0"
                >
                  <ellipse cx={604} cy={512} fill="url(#d25c25d4-6d43-4bf9-b9ac-1842a30a4867)" rx={604} ry={512} />
                  <defs>
                    <radialGradient id="d25c25d4-6d43-4bf9-b9ac-1842a30a4867">
                      <stop stopColor="#7775D6" />
                      <stop offset={1} stopColor="#E935C1" />
                    </radialGradient>
                  </defs>
                </svg>
        
        {products.map((product) => {
            return (
            <Product key={product._id} product={product} />
            )
        })}
        </div>
    )

}

export default ProductGrid;
