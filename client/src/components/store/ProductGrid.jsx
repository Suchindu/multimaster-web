import { Element } from 'react-scroll';
import axios from "axios";
import Product from "./Product";
import React,{ useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useToast } from '@chakra-ui/react'
import { useCompare } from '../../context/CompareContext';
import Card from "./Card";


const ProductGrid = () => {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { compareList } = useCompare();
    const toast = useToast();
    const [keyword, setKeyword] = useState('');
   

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

    useEffect(() => {
        let timeoutId;
        const fetchProducts = async () => {
            timeoutId = setTimeout(() => setLoading(true), 500);
            
            if(keyword){
                try {
                    const response = await axios.get(`http://localhost:4000/api/products?keyword=${keyword}`);
                    setProducts(response.data.products);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }else{
                try {
                    const response = await axios.get("http://localhost:4000/api/products");
                    setProducts(response.data.products);
                } catch (error) {
                    console.error('Error fetching products:', error);
                }
            }
            clearTimeout(timeoutId);
            setLoading(false);
        };
        fetchProducts();

        return () => clearTimeout(timeoutId);
    }, [keyword]);
        
        const handleChange = e => {
        setKeyword(e.target.value);

    }


    return (
        <div>
        
        <div className="flex flex-col justify-between items-center my-10  ">
        <Card/>
        <Element name="searchSection" className="pb-10">
            <div className="flex flex-col mb-10 mt-10 sm:flex-row items-center justify-center">
            <input
                type="text"
                placeholder="Search..."
                value={keyword}
                onChange={handleChange}
                className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 sm:pr-60 rounded-lg text-sm focus:outline-none w-full sm:w-auto"
            />
            <button 
            // onClick={handleSearch}
            className="bg-color4 text-white px-6 py-2 rounded-lg ml-2 hover:bg-indigo-500 focus:outline-none mt-2 sm:mt-0 w-full sm:w-auto"
            
            >
                Search
            </button>
            </div>


            {loading ? (
            <div className="flex justify-center items-center  w-full h-screen ">    
            <img className="w-24 h-24 "  src="/loading.gif" alt="Loading..." />
            </div>
            ) : (
                products.length > 0 ? (
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
                
                {products.map((product) => {
                    return (
                    <Product key={product._id} product={product} />
                    )
                })}
                </div>
            ) : (
                <div className="text-center mt-4 h-screen text-lg p-10">
                    No Products Found.
                </div>
         )
        )}
        </Element>
      </div>
      
      </div>
    
    )

}


export default ProductGrid;
