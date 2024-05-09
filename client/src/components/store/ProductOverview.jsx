
import axios from 'axios';
import { Fragment, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ArrowLeftCircleIcon } from '@heroicons/react/20/solid'
import { useDispatch } from 'react-redux';
import {addToCart} from '../../redux/cartSlice';


export default function Example() {

  const dispatch = useDispatch();
    
  
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
                    className="rounded-md w-14 bg-white px-3 py-2 text-sm font-semibold text-color2  hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-9 mt-5"
                    onClick={() => navigate('/')}
                  >
                    <ArrowLeftCircleIcon/>
                    
                  </button>
                  <div className='flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4 '>
                  <div className="border border-slate-400 shadow-lg rounded-lg grid w-7/12 grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8 p-10  mb-20">
                    <div className="sm:col-span-4 lg:col-span-5">
                      <div className="aspect-h-1 aspect-w-3/4 overflow-hidden rounded-md bg-gray-100">
                        <img src={`http://localhost:4000${image}`} className="object-cover object-center" />
                      </div>
                    </div>
                    <div className="sm:col-span-8 lg:col-span-7 ">
                      <h2 className="text-2xl font-bold text-gray-900 sm:pr-12">{name}</h2>

                      <section aria-labelledby="information-heading" className="mt-3">
                        <h3 id="information-heading" className="sr-only">
                          Product information
                        </h3>

                        <p className="text-2xl text-gray-900">LKR {price}.00</p>

                        {/* Reviews */}
                        <div className="mt-6">
                        <p className="text-sm text-gray-700">IN STOCK : {countInStock}</p>
                          <h4 className="sr-only">Description</h4>

                         
                        </div>

                        <div className="mt-6">
                          <h4 className="sr-only">Description</h4>
                          
                          <p className="text-sm text-gray-700">{description}</p>
                        </div>

                       
                      </section>

                      <section aria-labelledby="options-heading" className="mt-6">
                        

                        <form>
                          {/* Colors */}
                          <div>
                            <h4 className="text-sm text-gray-600">{category} : {brand}</h4>

                            
                          </div>
                          
                            {/* Size */}        
                          <div className="mt-6 flex justify-center">
                            <button
                              type="submit"
                              onClick={() => {
                                const productDetails = {
                                  id:id, 
                                  title:name, 
                                  image:image, 
                                  price:price 
                                };
                                console.log(productDetails);
                                dispatch(addToCart(productDetails));
                              }}
                              className="flex w-3/4  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                            >
                              Add to Cart
                            </button>
                          </div>

                          <p className="absolute left-4 top-4 text-center sm:static sm:mt-6">
                            
                          </p>
                        </form>
                      </section>
                    </div>
                  </div>
                  </div>
                  </div>
                
  
  )
}
