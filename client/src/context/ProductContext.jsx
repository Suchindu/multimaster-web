import { createContext, useState, useEffect } from "react";
import axios from 'axios';

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState({
        name: '',
        brand: '',
        price: 0,
        category: '',
        description: '',
        image: '',
        countInStock: 0,
        });
    
        const getProducts = () => {
            axios.get('http://localhost:4000/api/products/')
            .then((response) => {
            
                setProduct(response.data.products || []);
            })
            .catch(error => {
                console.error("Axios Erro Occur :", error);
            });
        }


    return (
        <ProductContext.Provider value={{
            product,setProduct,getProducts

        }}>
            {children}
        </ProductContext.Provider>
    );
}

export default ProductContext;