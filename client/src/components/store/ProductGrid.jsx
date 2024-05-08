
import axios from "axios";
import Product from "./Product";
import React,{ useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from '@chakra-ui/react'
import { useCompare } from '../../context/CompareContext';


const ProductGrid = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { compareList } = useCompare();
    const toast = useToast();
   

    useEffect(() => {
        if (compareList.length === 2 && compareList[0].category === compareList[1].category) {
            toast({
                title: "Success.",
                description: "Two products from the same category have been selected for comparison.",
                status: "success",
                duration: 1000,
                isClosable: true,
            });
        }else if(compareList.length === 2 && compareList[0].category !== compareList[1].category){
            toast({
                title: "Error.",
                description: "Two products from different categories have been selected for comparison.",
                status: "error",
                duration: 1000,
                isClosable: true,
            });
        }
    }, [compareList]);

useEffect(() => {
axios.get("http://localhost:4000/api/products")

    .then((response) => {
        console.log(response.data);
        setProducts(response.data.products);
        setTimeout(() => {
            setLoading(false);
          }, 300);
    })
    .catch((err) => {
        setLoading(false);
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
        <div className="flex justify-between items-center my-4 mx-2 h-screen">
    {loading ? (
    <div className="flex justify-center items-center h-full w-full ">    
      <img className="w-24 h-24 "  src="/loading.gif" alt="Loading..." />
      </div>
    ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
        {products.map((product) => {
            return (
            <Product key={product._id} product={product} />
            )
        })}
        </div>
          )}
      </div>
    
    )

}

export default ProductGrid;
