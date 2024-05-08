// fetch details from the database and add the search bar to filter the data
import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { FaDownload, FaShareAlt } from "react-icons/fa";
//components
import Header from "./header";
import Footer from "./footer";
//import multimasterLogo from '../../public/multimaster.svg';

const CheckRepair = () => {
  const [searchTerm, setSearchTerm] = useState(""); //state to store the search term
  const [data, setData] = useState(null); //state to store the fetched data
  const componentRef = useRef(); //reference to the component

  //fetch repair details
  const fetchData = async (repair_id_str) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/repair/str/${repair_id_str}`
      );
      const data = await response.json();
      console.log("Respnse data: ", data);
      setData(data);
      console.log("State data: ", data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  //search for repair details
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm) {
      fetchData(searchTerm);
    }
  };

  //download repair details
  const handleDownload = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Repair Details",
    onAfterPrint: () => console.log("after print"),
  });

  //share repair details
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: "Repair Details",
          text: "Here are the details of the repair.",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      console.log("Share not supported on this browser, do it the old way.");
    }
  };

  const SidebarContent = () => {
    if (!data) return <div>Loading...</div>;

    switch (data.status) {
      case "completed":
        return (
          <div className="ml-3 text-center">
            <h3 className="text-lg font-semibold">Congratulations!</h3>
            <p>Your repair has been completed successfully.</p>
          </div>
        );
      case "checking":
        return (
          <div className="ml-3 text-center">
            <h3 className="text-lg font-semibold">Repair In Progress</h3>
            <p>
              Your device is currently being repaired. We appreciate your
              patience.
            </p>
          </div>
        );
      case "not completed":
        return (
          <div className="ml-3 text-center">
            <h3 className="text-lg font-semibold">Pending Completion</h3>
            <p>
              You're almost there! Your device is being repaired. We'll notify
            </p>
          </div>
        );
      default:
        return (
          <div>
            <h3 className="text-lg font-semibold">Welcome!</h3>
            <p>Enter a repair ID to see the status of your device.</p>
          </div>
        );
    }
  };

  return (
    <>
      

      <div className="w-full lg:w-1/4 lg:mr-5">
        <SidebarContent />
      </div>
      <div className="bg-gray-50 min-h-screen flex flex-col items-center px-4 lg:px-20">
        <h1 className="mt-10 text-2xl font-semibold text-blue-800">
          Check Repair Status
        </h1>
        <input
          type="text"
          value={searchTerm}
          className="mt-5 p-4 text-lg bg-white rounded-lg shadow-lg w-full max-w-md border-l-4 border-blue-800"
          onChange={handleSearch}
          placeholder="Search by ID"
        />
        {/* Render filtered data here */}
        {data && (
          <div
            ref={componentRef}
            className="mt-5 p-6 bg-white rounded-lg shadow-2xl w-full max-w-md border-l-4 border-blue-800"
          >
            <h2 className="text-lg font-bold mb-4 text-blue-800">
              Repair Details
            </h2>
            <p className="text-md font-semibold mb-1">
              <strong>Name:</strong> {data.name || "No name"}
            </p>
            <p className="text-md font-semibold mb-1">
              <strong>Date:</strong>{" "}
              {data.date
                ? new Date(data.date).toISOString().split("T")[0]
                : "No date"}
            </p>
            <p className="text-md font-semibold mb-1">
              <strong>Device Brand:</strong>{" "}
              {data.device_brand || "No device brand"}
            </p>
            <p className="text-md font-semibold mb-1">
              <strong>Device Model:</strong>{" "}
              {data.device_model || "No device model"}
            </p>
            <p
              className={`text-md font-semibold mb1 ${
                data.status === "completed"
                  ? "text-green-500"
                  : data.status === "not completed"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              <strong>Status:</strong> {data.status || "No status"}
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-color3 text-white rounded-md shadow-lg flex items-center transform transition duration-300 ease-in-out hover:scale-105 hide-on-print"
              >
                {" "}
                <FaDownload className="mr-2" /> Download
              </button>
              <button
                onClick={handleShare}
                className="px-4 py-2 bg-color3 text-white rounded-md shadow-lg flex items-center transform transition duration-300 ease-in-out hover:scale-105 hide-on-print"
              >
                {" "}
                <FaShareAlt className="mr-2" /> Share
              </button>
            </div>
          </div>
        )}
      </div>
     
    </>
  );
};

export default CheckRepair;
