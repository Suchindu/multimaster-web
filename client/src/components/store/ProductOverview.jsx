/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import axios from 'axios';
import { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { StarIcon } from '@heroicons/react/20/solid'

const product = {
  name: 'Zip Tote Basket',
  price: '$220',
  rating: 3.9,
  href: '#',
  description:
    'The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-04.jpg',
  imageAlt: 'Back angled view with bag open and handles to the side.',
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
}



function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  // const [open, setOpen] = useState(false)
  // const [selectedColor, setSelectedColor] = useState(product.colors[0])
  
  const { id } = useParams();
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);


useEffect(() => {
  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/products/${id}`);
      console.log(response.data);
      setName(response.data.name);
      setBrand(response.data.brand);
      setPrice(response.data.price);
      setCategory(response.data.category);
      setDescription(response.data.description);
      setImage(response.data.image);
      setCountInStock(response.data.countInStock);
    } catch (error) {
      console.error(error);
    }
  };

  fetchProduct();
}, [id]);

  return (
    //
                <div>
                  <button
                    type="submit"
                    className="rounded-md bg-color4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => navigate('/products')}
                  >
                    Back
                  </button>
                  <div className='flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4'>
                  <div className="border rounded-lg grid w-ful grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 p-10">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
                        <img src={`http://localhost:4000${image}`} alt={product.imageAlt} className="object-cover object-center" />
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{name}</h2>

                      <section aria-labelledby="information-heading" className="mt-3">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">{product.price}</p>

                        {/* Reviews */}
                        <div className="mt-3">
                          <h4 className="sr-only">Reviews</h4>
                          
                        </div>

                        <div className="mt-6">
                          <h4 className="sr-only">Description</h4>

                          <p className="text-sm text-gray-700">{product.description}</p>
                        </div>
                      </section>

                      <section aria-labelledby="options-heading" className="mt-6">
                        <h3 id="options-heading" className="sr-only">
                          Product options
                        </h3>

                        <form>
                          {/* Colors */}
                          <div>
                            <h4 className="text-sm text-gray-600">Color</h4>

                            
                          </div>

                          <div className="mt-6">
                            <button
                              type="submit"
                              className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                              Add to bag
                            </button>
                          </div>

                          <p className="absolute left-4 top-4 text-center sm:static sm:mt-6">
                            <a href={product.href} className="font-medium text-indigo-600 hover:text-indigo-500">
                              View full details
                            </a>
                          </p>
                        </form>
                      </section>
                    </div>
                  </div>
                  </div>
                  </div>
                
  
  )
}
