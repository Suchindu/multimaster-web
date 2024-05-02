import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

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
    const [isFileChanged, setIsFileChanged] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);



    return (
        <ProductContext.Provider value={{
            product,setProduct,
            isFileChanged, setIsFileChanged,
            imagePreview, setImagePreview
        }}>
            {children}
        </ProductContext.Provider>
    );
}