import React from "react";
import { useState } from "react";
//import { BsFillPencilFill, BsFillTrashFill } from 'react-icons/bs';
import { useRepairContext } from "../hooks/useRepairContext";

const Repair_details = ({ repair }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updatedRepair, setUpdatedRepair] = useState({ ...repair });
  const { dispatch } = useRepairContext();
  const [errors, setErrors] = useState({});

  //delete repair request
  const handleClick = async () => {
    const response = await fetch(
      `http://localhost:4000/api/repair/` + repair._id,
      {
        method: "DELETE",
      }
    );

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_REPAIR", payload: repair._id });
    }
  };

  //edit repair request
  const handleUpdate = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/repair/" + repair._id,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedRepair),
        }
      );

      if (response.ok) {
        dispatch({ type: "UPDATE_Repair", payload: updatedRepair });
        setIsUpdating(false);
      } else {
        alert("Repair Can't be updated !");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Handling validation for contact field
    if (name === "contact") {
      if (!value.match(/^\d{10}$/)) {
        // Validates a 10-digit number
        setErrors((prevErrors) => ({
          ...prevErrors,
          contact: "Contact must be a 10-digit number.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, contact: "" })); // Clear error for valid input
      }
    }

    // Handling validation for email field
    if (name === "email") {
      if (!value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    }
    setUpdatedRepair((prevRepair) => ({ ...prevRepair, [name]: value }));
  };

  // Function to get the color of the status
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-700 text-white"; // Green background for completed
      case "not completed":
        return "bg-red-600 text-white"; // Red background for not completed
      case "checking":
        return "bg-yellow-600 text-white"; // Yellow background for checking
      default:
        return "bg-gray-200"; // Default background
    }
  };

  // console.log(repair);
  return (
    // JSX code for the component
    <>
      {repair ? (
        <tr className="hover:bg-blue-100">
          <td className="px-4 py-2 border-b border-gray-200">{repair._id}</td>
          <td className="px-4 py-2 border-b border-gray-200">{repair.name}</td>
          <td className="px-4 py-2 border-b border-gray-200">{repair.email}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            {repair.contact}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {new Date(repair.date).getFullYear()}-
            {("0" + (new Date(repair.date).getMonth() + 1)).slice(-2)}-
            {("0" + new Date(repair.date).getDate()).slice(-2)}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {repair.device_brand}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {repair.device_model}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {repair.problem}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {repair.description}
          </td>
          <td
            className={`px-4 py-2 border-b border-gray-200 font-medium ${getStatusColor(
              repair.status
            )}`}
          >
            {repair.status}
          </td>
          <td className="flex justify-center items-center">
            <button
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out hide-on-print"
              onClick={() => setIsUpdating(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transform transition-all duration-300 ease-in-out hide-on-print"
              onClick={handleClick}
            >
              Delete
            </button>
          </td>
        </tr>
      ) : (
        <tr>
          <td colSpan={9}>No repair requests</td>
        </tr>
      )}
      {isUpdating && (
        <tr>
          <td colSpan={9}>
            <div className="mx-auto w-full max-w-4xl p-6 bg-white rounded-lg shadow-md"></div>
            <form className="space-y-6" onSubmit={handleUpdate}>
              <div className="flex flex-col">
                <label
                  className="mb-2 text-sm font-semibold text-gray-600"
                  htmlFor="name"
                >
                  Name:
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  id="name"
                  name="name"
                  value={updatedRepair.name}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-2 text-sm font-semibold text-gray-600"
                  htmlFor="email"
                >
                  Email:
                </label>
                <input
                  type="email"
                  className={`p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.email ? "border-red-700" : ""
                  }`}
                  id="email"
                  name="email"
                  value={updatedRepair.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errors.email}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-600">
                  Date:
                </label>
                <input
                  type="date"
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  id="date"
                  name="date"
                  value={updatedRepair.date}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-2 text-sm font-semibold text-gray-600"
                  htmlFor="contact"
                >
                  Contact:
                </label>
                <input
                  type="tel"
                  className={`p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${
                    errors.contact ? "border-red-700" : ""
                  }`}
                  name="contact"
                  value={updatedRepair.contact}
                  onChange={handleChange}
                  pattern="0[0-9]{9}"
                  maxLength={10}
                />
                {errors.contact && (
                  <p className="text-red-500 text-xs italic mt-2">
                    {errors.contact}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-2 text-sm font-semibold text-gray-600"
                  htmlFor="device_brand"
                >
                  Device Brand:
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  id="device_brand"
                  name="device_brand"
                  value={updatedRepair.device_brand}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-2 text-sm font-semibold text-gray-600"
                  htmlFor="device_model"
                >
                  Device Model:
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  id="device_model"
                  name="device_model"
                  value={updatedRepair.device_model}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="mb-2 text-sm font-semibold text-gray-600"
                  htmlFor="device_model"
                >
                  Problem:
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  id="problem"
                  name="problem"
                  value={updatedRepair.problem}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-600">
                  Description:
                </label>
                <input
                  type="text"
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  id="description"
                  name="description"
                  value={updatedRepair.description}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 text-sm font-semibold text-gray-600">
                  Status:
                </label>
                <select
                  className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  id="status"
                  name="status"
                  value={updatedRepair.status}
                  onChange={handleChange}
                >
                  <option value="completed">Completed</option>
                  <option value="checking">Checking</option>
                  <option value="not completed">Not Completed</option>
                </select>
              </div>
              <div className="flex justify-start mt-4">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
                >
                  Update
                </button>
              </div>
            </form>
          </td>
        </tr>
      )}
    </>

    // Add closing parenthesis here
  );
};

export default Repair_details;
