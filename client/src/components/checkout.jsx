import { useState, useEffect } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import axios from "axios"; // Import Axios for making HTTP requests
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import { emptyCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { data } = useQuery({
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
    if (data) {
      setValue("name", data?.name ?? null);
      setValue("email", data?.email ?? null);
      setValue("address", data?.address ?? null);
      setValue("phone", data?.phone ?? null);
    }
  }, [data]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(cart);
    try {
      // Combine form data and cart items
      const orderData = {
        uid: uuidv4().slice(-10),
        name: data.name,
        email: data.email,
        address: data.address,
        phone: data.phone,
        products: cart,
        totalPrice: 0,
        additionalDetails: data.additionalDetails,
      };

      console.log(orderData);

      // Send POST request to backend to submit order with cart items
      const response = await axios.post(
        "http://localhost:4000/api/orders",
        orderData
      );

      console.log("Order submitted:", response.data);

      if (response.status === 200) {
        alert("Success");

        dispatch(emptyCart());

        navigate("/");
      } else {
        alert("Error Submitting Data");
      }
    } catch (error) {
      // Handle error
      console.error("Error submitting order:", error);

      alert("Error Submitting Data");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Checkout
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"></div>
            </div>

            <div className="border-b border-gray-900/10 pb-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Delivery Details
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive the order.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("name", {
                        required: true,
                        maxLength: 200,
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.name ? (
                      <p className="text-red-500 text-sm my-1 mx-3">
                        *Required
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("email", {
                        required: true,
                        maxLength: 200,
                      })}
                      type="email"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.email ? (
                      <p className="text-red-500 text-sm my-1 mx-3">
                        *Required
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Mobile Number
                  </label>
                  <div className="mt-2">
                    <input
                      {...register("phone", {
                        required: true,
                        maxLength: 200,
                      })}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.phone ? (
                      <p className="text-red-500 text-sm my-1 mx-3">
                        *Required
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <textarea
                      {...register("address", {
                        required: true,
                        maxLength: 1000,
                      })}
                      rows={3}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    {errors.address ? (
                      <p className="text-red-500 text-sm my-1 mx-3">
                        *Required
                      </p>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Slip Upload */}

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Payment Slip Upload
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              </div>
            </div>

            {/* Addtional information */}

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Additional Details
              </label>
              <div className="mt-2">
                <textarea
                  {...register("additionalDetails", {
                    required: false,
                    maxLength: 1000,
                  })}
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.additionalDetails ? (
                  <p className="text-red-500 text-sm my-1 mx-3">*Required</p>
                ) : (
                  <></>
                )}
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Please add any additional information about the order that you
                think is important.
              </p>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
