import React, { useState, useEffect, useRef } from "react";
import { MagnifyingGlassIcon, ShoppingBagIcon } from "@heroicons/react/20/solid";
import axios from "axios";

import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:4000/api/orders";

const fetchHandler = async () => {
  const res = await axios.get(URL);
  return res.data;
};

export default function Orderview() {

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Order List Report",
    onAfterPrint: () => alert("Order List Report Successfully Downloaded!"),
  });


  const [order, setOrder] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (Array.isArray(data)) {
        setOrder(data);
      } else {
        setOrder([]);
      }
    });
  }, []);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.filter((order) =>
        order.uid ? order.uid.toString().toLowerCase().includes(searchQuery.toLowerCase()) : false
      );
      setOrder(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  useEffect(() => {
    fetchHandler().then((data) => {
      if (Array.isArray(data)) {
        setOrder(data);
      } else {
        setOrder([]);
      }
    });
  }, []);

  const getOrderStateColor = (orderState) => {
    switch (orderState) {
      case "pending":
        return "bg-yellow-300 text-black w-20 h-6"; // Yellow background for pending
      case "approved":
        return "bg-emerald-300 text-black w-20 h-6"; // Green background for approved
      case "rejected":
        return "bg-red-400 text-black w-20 h-6"; // Red background for rejected
      default:
        return "bg-gray-200"; // Default background
    }
  };

  return (




    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-9xl w-full space-y-8 bg-white p-10 rounded-xl  h-[500px] ">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-2xl font-bold leading-6 text-gray-900">
                Order List
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A list of all the orders from the store.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <div>
              
                <div className="mt-2 flex rounded-md shadow-sm">
                  <div className="relative flex flex-grow items-stretch focus-within:z-10">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <ShoppingBagIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="string"
                      name="search"
                      id="search"
                      className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm leading-6"
                      placeholder="Search By Order ID"
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleSearch}
                  >
                    <MagnifyingGlassIcon
                      className="-ml-0.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button onClick={handlePrint}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate Order Report
              </button>
            </div>
          </div>


          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

                
      <div ref={ComponentsRef}>
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          Order ID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Buyer Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Order States
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span className="sr-only"> View Order</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {order.map((order, index) => (
                        <tr key={order._id}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {order.uid}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {order.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {order.email}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <span
                              className={`px-2 py-1 flex items-center justify-center ${getOrderStateColor(
                                order.orderState
                              )}`}
                            >
                              {order.orderState}
                            </span>
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              View Order
                              <span className="sr-only">, {order.name}</span>
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>


                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
