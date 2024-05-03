import React from 'react';
// import { toast } from 'react-toastify';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ProductContext from '../../context/ProductContext';
import ProductForm from './ProductForm';
import { useParams } from 'react-router-dom';

export default function EditProduct() {
  
      const { id } = useParams();
      const { product, setProduct } = useContext(ProductContext);
      const [isFileChanged, setIsFileChanged] = useState(false);
      const [imagePreview, setImagePreview] = useState(null);

      useEffect(() => {
        const fetchProduct = async () => {
          try {
            const response = await axios.get(`http://localhost:4000/api/products/${id}`);
            console.log(response.data);
            setProduct(response.data);
            setImagePreview(`http://localhost:4000${response.data.image}`);
          } catch (error) {
            console.error(error);
          }
        };
        fetchProduct();
      }, [id]);

      const onChangeFile = (e) => {
        setProduct({ ...product, image: e.target.files[0] });
        setIsFileChanged(true);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      };

      const changeOnClick = (e) => {
        e.preventDefault();
        if (isFileChanged) {
          const formData = new FormData();
          formData.append('image', product.image);
          console.log(product.image);
          axios.post('http://localhost:4000/api/products/upload', formData)
          .then((res) => {
            console.log(res.data);
            product.image = res.data.image;
            updateProduct(product);
          })
          .catch(error => {
            console.log(error);
            alert(error.response.data.message);
          });
        } else {
          updateProduct(product);
        }
      };

      const updateProduct = (productData) => {
        axios.put(`http://localhost:4000/api/products/${id}`, productData)
        .then((res) => {
          console.log(res.data);
          alert('Product Updated successfully!');
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
      title={'Edit'}
      changeOnClick={changeOnClick}
      onChangeFile={onChangeFile}
      imagePreview={imagePreview}
      />
    </div>
  )
}
