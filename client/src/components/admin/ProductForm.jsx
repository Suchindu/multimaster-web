import react from 'react';
import { useContext } from 'react';
import ProductContext from '../../context/ProductContext';
import { useNavigate } from 'react-router-dom';

export default function ProductForm({changeOnClick, onChangeFile, imagePreview, title}) {

    const { product, setProduct } = useContext(ProductContext);
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
        <form className=" border rounded-md border-gray-300 p-4 w-full sm:w-auto " onSubmit={changeOnClick} encType='multipart/form-data'>
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl  font-sans font-semibold leading-7 text-gray-900">{title} Product</h2>
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
                    value={product.name}
                    onChange={(e) => setProduct({ ...product, name: e.target.value })}
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
                    value={product.brand}
                    onChange={(e) => setProduct({ ...product, brand: e.target.value })}
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
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    min= "0"
                    max="1000000"
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
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    autoComplete="category-name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    > 
                    <option></option>
                    <option>Graphic Cards</option>
                    <option>Headphones</option>
                    <option>KeyBoards</option>
                    <option>Motherboards</option>
                    <option>Mouse</option>
                    <option>Processors</option>
                    <option>Ram</option>
                    <option>Storage</option>
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
                    value={product.countInStock}
                    onChange={(e) => setProduct({ ...product, countInStock: e.target.value })}
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
                    value={product.description}
                    onChange={(e) =>setProduct({ ...product, description: e.target.value })}
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
                    {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                        <span>UPLOAD IMAGE FILE</span>
                        <input id="file-upload" filename="image" onChange={onChangeFile} type="file" className="sr-only" />
                        {imagePreview && <img src={imagePreview} alt="Preview" style={{ width: '300px', height: '300px' }}/>}
                        </label>
                    </div>
                    <p className="text-xs leading-10 text-gray-600">PNG, JPG, GIF up to 10MB</p>
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
            onClick={() => navigate('/admin-products')}
            >
            Cancel
            </button>
            <button
            type="submit"
            className="rounded-md bg-color4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            
            >
            Submit
            </button>
        </div>
        </form>
    </div>
    
    
        );
}