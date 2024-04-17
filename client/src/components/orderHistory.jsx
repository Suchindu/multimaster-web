import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const URL = "http://localhost:4000/api/orders/emailid/";

const fetchHandler = async (email) => {
  const res = await axios.get(`${URL}${email}`);
  return res.data;
};

export default function OrderHistory() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState(null);

  const {
    isLoading,
    isError,
    data: userData,
  } = useQuery({
    queryKey: ["getUser"],
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
          setEmail(response.data.user.email); // Store user's email
          return response.data.user;
        } else {
          console.error("Error retrieving user details:", response.data.data);
          throw new Error("Error retrieving user details");
        }
      } catch (error) {
        console.error("Error:", error);
        throw error;
      }
    },
    cacheTime: 15 * (60 * 1000),
    staleTime: 10 * (60 * 1000),
  });

  const { data: ordersData } = useQuery({
    queryKey: ["getUserOrders", email],
    queryFn: () => fetchHandler(email),
    enabled: !!email, // Only run the query if the email is not null
  });

  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetchHandler().then((data) => {
      if (Array.isArray(data)) {
        setOrder(data);
      } else {
        setOrder([]);
      }
    });
  }, []);

  const handleDeleteOrder = async (orderId) => {
    const userConfirmed = window.confirm('Are you sure you want to delete this order?');
  
    if (!userConfirmed) {
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:4000/api/orders/${orderId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Error deleting order');
      }
  
      // Refresh orders or handle UI updates here
      alert('Order deleted successfully');
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

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
                Order History
              </h1>
              <p className="mt-2 text-sm text-gray-700">All of your orders</p>
            </div>
            <div className="flex justify-center items-center">
              <div></div>
            </div>
          </div>

          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
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
                          Date
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
                          <span className="sr-only">Delete Order</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {ordersData &&
                        ordersData.map((order, index) => (
                          <tr key={order._id}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {order.uid}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {order.createdAt.split("T")[0]}
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
                              <button
                                onClick={() => handleDeleteOrder(order._id)}
                              >
                                Delete Order
                              </button>
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
  );
}
