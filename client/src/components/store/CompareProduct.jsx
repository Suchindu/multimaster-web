import React, { useState } from 'react';
import { useEffect } from 'react';
import { useCompare } from '../../context/CompareContext';
import axios from 'axios';
import { useContext } from 'react';
import ProductContext from '../../context/ProductContext';

const CompareProduct = ({id}) => {
    const [product, setProduct] = useState('');

    useEffect(() => {
            const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/products/${id}`);
                console.log(response.data);
                setProduct(response.data);
            } catch (error) {
                console.error(error);
            }
            };
            fetchProduct();
        }, [id]);

    
    return (
        <div className="m-4  border-gray-300 bg-white rounded-lg p-2">
        <table className="table-auto w-full">
            <tbody className="text-center">
            <tr className="border-b-2 border-gray-200"><td className="py-5 flex justify-center items-center">{product && <img src={`http://localhost:4000${product.image}`} alt="Product" width="200" height="200" />}</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">{product.name}</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">{product.brand}</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">LKR.{product.price}.00</td></tr>
            <tr className="border-b-2 border-gray-200"><td className="py-4">{product.description}</td></tr>
            </tbody>
        </table>
        
        </div>
    );
    };

export default CompareProduct;