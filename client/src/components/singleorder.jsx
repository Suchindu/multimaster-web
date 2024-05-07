import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function SingleOrder() {
  const { uid } = useParams();
  const URL = `http://localhost:4000/api/orders/orderid/${uid}`;

  const fetchHandler = async () => {
    try {
      const res = await axios.get(URL);
      return res.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const sendConfirmationEmail = async (orderDetails) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/send-email/send-email",
        orderDetails
      );
      console.log("Message sent: %s", response.data.messageId);
    } catch (error) {
      console.error("Error sending email", error);
    }
  };

  const [orderState, setOrderState] = useState("pending");

  const handleStateChange = (event) => {
    setOrderState(event.target.value);
  };

  //update order state
  const handleUpdate = async () => {
    try {
      const orderId = order._id; // Extract the _id field from the order
      await axios.patch(`http://localhost:4000/api/orders/${orderId}`, {
        orderState: orderState,
      });
      alert("Order state updated successfully");
    } catch (error) {
      console.error(error);
      alert("Failed to update order state");
    }
  };

  const [order, setOrder] = useState(null);

  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetchHandler().then((data) => {
      setOrder(data);
      if (data) {
        const newOrderDetails = {
          buyerEmail: data.email,
          buyerName: data.name,
          productName: data.uid,
        };
        setOrderDetails(newOrderDetails);
      }
    });
  }, [uid]);

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Order List Report",
    onAfterPrint: () => alert("Order List Report Successfully Downloaded!"),
  });

  //calsulate total price
  const getTotal = () => {
    let totalPrice = 0;
    order.products.forEach((item) => {
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };

  return (
    order && (
      <div className="flex justify-center  px-4">
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
          <div ref={ComponentsRef}>
            <div className="px-4 py-6 sm:px-6">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Order Details
              </h2>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                Order ID : {order.uid}
              </p>
            </div>

            <div className="border-t border-gray-100">
              <dl className="divide-y divide-gray-100">
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.name}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Email</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.email}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">Address</dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.address}
                  </dd>
                </div>
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Phone Number
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {order.phone}
                  </dd>
                </div>

                {order.products.map((product, index) => (
                  <div
                    key={index}
                    className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
                  >
                    <dt className="text-sm font-medium text-gray-900">
                      Product Name
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {product.title}
                    </dd>

                    <dt className="text-sm font-medium text-gray-900">
                      Product Price
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      LKR {product.price}
                    </dd>

                    <dt className="text-sm font-medium text-gray-900">
                      Product Quantity
                    </dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                      {product.quantity}
                    </dd>
                  </div>
                ))}

                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-900">
                    Total Price{" "}
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    LKR {getTotal()}
                  </dd>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                  <div className="flex justify-start items-center gap-4">
                    <button
                      onClick={handlePrint}
                      type="button"
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hide-on-print"
                    >
                      Generate Order Bill
                    </button>

                    <select
                      value={orderState}
                      onChange={handleStateChange}
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hide-on-print"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>

                    <button
                      onClick={handleUpdate}
                      type="button"
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hide-on-print"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => {
                        if (orderDetails) {
                          sendConfirmationEmail(orderDetails);
                          alert("Email sent successfully");
                        }
                      }}
                      type="button"
                      className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 hide-on-print"
                    >
                      Send Confirmation Email
                    </button>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
