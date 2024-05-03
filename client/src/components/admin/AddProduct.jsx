import React from 'react';
// import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import ProductContext from '../../context/ProductContext';
import ProductForm from './ProductForm';

export default function AddProduct({}) {

    
    const { product, setProduct } = useContext(ProductContext);
    const [imagePreview, setImagePreview] = useState(null);

    const onChangeFile = (e) => {
      setProduct({ ...product, image: e.target.files[0] });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const changeOnClick = (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append('image', product.image);

      axios.post('http://localhost:4000/api/products/upload', formData)
      .then((res) => {
        console.log(res.data);
        product.image = res.data.image;
        addProduct(product);
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data.message);
      });
    };

    const addProduct = (productData) => {
      axios.post('http://localhost:4000/api/products/', productData)
      .then((res) => {
        console.log(res.data);
        alert('Product added successfully!');
        setProduct({
          name: '',
          brand: '',
          price: 0,
          category: '',
          description: '',
          image: '',
          countInStock: 0,
        });
      })
      .catch(error => {
        console.log(error);
        alert(error.response.data.message);
      });
    };

  return (
    
    <div>
      <ProductForm
      title={'Add'}
      changeOnClick={changeOnClick}
      onChangeFile={onChangeFile}
      imagePreview={imagePreview}
      />
    </div>
    
  )
}
