
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

    const { isSuccess } = useQuery({
        queryKey: ["getUser"],
        cacheTime: 15 * (60 * 1000),
        staleTime: 10 * (60 * 1000),
        queryFn: async () => {
        const token = localStorage.getItem("token");

        if (token === null) {
            throw new Error("Error retrieving user details");
        }

        try {
            const response = await axios.post("http://localhost:4000/profile", {
            token: token,
            });
            if (response.data.status === "ok") {
            return response.data.user; // Update user state with received user data
            } else {
            console.error("Error retrieving user details:", response.data.data);

            throw new Error("Error retrieving user details");
            }
        } catch (error) {
            console.error("Error retrieving user details:", error.message);

            throw new Error("Error retrieving user details");
        }
        },
    });

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
