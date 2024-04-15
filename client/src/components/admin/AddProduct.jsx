import React from 'react';
// import { toast } from 'react-toastify';
import { useState } from 'react';


export default function AddProduct({ addProduct}) {

    // const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [countInStock, setCountInStock] = useState(0);

    // const uploadFileHandler = async (e) => {
    //   const formData = new FormData();
    //   formData.append('image', e.target.files[0]);
    //   try {
    //     const res = await uploadProductImage(formData).unwrap();
    //     toast.success(res.message);
    //     setImage(res.image);
    //   } catch (err) {
    //     toast.error(err?.data?.message || err.error);
    //   }
    // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setName('');
    setBrand('');
    setPrice(0);
    setCategory('');
    setDescription('');
    setImage('');
    setCountInStock(0);
     
  }


  return (
    
    <div className="flex items-center justify-center min-h-screen p-4">
    <form className=" border rounded-md border-gray-300 p-4 w-full sm:w-auto " onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl  font-sans font-semibold leading-7 text-gray-900">Add Product</h2>
          <div className="lg:w-[600px] mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-auto">
          
          {/* product title */}
          <div className="col-span-full">
              <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                Product Title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
          </div>

          {/* product brand */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Product Brand
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  autoComplete="brand"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* product price */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Product Price<span style={{fontSize: '12px'}}> (LKR)</span>
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  min= "0"
                  max="100000"
                  step=".01"
                  autoComplete="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          {/* product category */}
          
            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Product Category
              </label>
              <div className="mt-2">
                <select
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  autoComplete="category-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                > 
                  <option></option>
                  <option>KeyBoard</option>
                  <option>Mouse</option>
                  <option>MotherBoard</option>
                </select>
              </div>
            </div>
            {/* Count In Stock */}
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                Product Count In Stock
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="stock"
                  id="stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  min="0"
                  max="100"
                  autoComplete="price"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Description */}
            <div className="col-span-full">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                Product Description
              </label>
              <div className="mt-2">
                <textarea
                  id="Description"
                  name="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            {/* file upload */}
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                Product Images
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" value={image} onChange={handleImageUpload} type="file" className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div> 
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-color4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={()=> addProduct({
            name:name, 
            brand:brand, 
            price:price,
            image:image, 
            category:category, 
            description:description, 
            countInStock:countInStock
          })}
        >
          Submit
        </button>
      </div>
    </form>
  </div>
  
  )
}
