import React from "react";
import axios from "axios";

const ProductGrid = () => {

axios.get("https://api.escuelajs.co/api/v1/products")
    .then((response) => {
        console.log(response.data);
    })
    return (
        <div>ProductGrid</div>
    )
}

export default ProductGrid;
