import React, { useEffect, useState } from "react";

//component

import RepairAlert_box from "./RepairAlert_box";
import { useRepairContext } from "../hooks/useRepairContext";
import {
  generateNewRepairId,
  generateRepairIdStr,
  generateRepairIdInt,
} from "../IdGeneration/repairs";

// import RepairAlert_box from "./RepairAlert_box";
// import { useRepairContext } from "../hooks/useRepairContext";

const Repair_form = () => {
  const { dispatch } = useRepairContext();

  const [repair_id_int, setrepairIdInt] = useState("");
  const [repair_id_str, setrepairIdStr] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [device_brand, setDeviceBrand] = useState("");
  const [device_model, setDeviceModel] = useState("");
  const [problem, setProblem] = useState("");
  const [description, setDescription] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [contactError, setContactError] = useState(null);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  //generate new repair id

  useEffect(() => {
    const generateAndSetNewId = async () => {
      const newRepairId = await generateNewRepairId();
      setrepairIdInt(newRepairId);
      setrepairIdStr(generateRepairIdStr(newRepairId));
    };

    generateAndSetNewId();
  }, []);

  //email validation
  const handleEmailChange = (e) => {
    const input = e.target.value.toLowerCase();
    setEmail(input);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression

    if (!emailPattern.test(input)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(null);
    }
  };

  //contact validation
  const handleContactChange = (e) => {
    const input = e.target.value; // Remove non-digit characters
    if (!/^\d*$/.test(input)) {
      setContactError("Please enter a valid phone number");
    } else {
      setContact(input);
      setContactError(null);
    }
  };
  //   const [name, setName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [contact, setContact] = useState("");
  //   const [date, setDate] = useState("");
  //   const [device_brand, setDeviceBrand] = useState("");
  //   const [device_model, setDeviceModel] = useState("");
  //   const [problem, setProblem] = useState("");
  //   const [description, setDescription] = useState("");
  //   const [emailError, setEmailError] = useState(null);
  //   const [contactError, setContactError] = useState(null);
  //   const [error, setError] = useState(null);
  //   const [showAlert, setShowAlert] = useState(false);

  //   //email validation
  //   const handleEmailChange = (e) => {
  //     const input = e.target.value.toLowerCase();
  //     setEmail(input);
  //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression
  //     if (!emailPattern.test(input)) {
  //       setEmailError("Please enter a valid email address");
  //     } else {
  //       setEmailError(null);
  //     }
  //   };

  //contact validation
  // const handleContactChange = (e) => {
  //   const input = e.target.value; // Remove non-digit characters
  //   if (!/^\d*$/.test(input)) {
  //     setContactError("Please enter a valid phone number");
  //   } else {
  //     setContact(input);
  //     setContactError(null);
  //   }
  // };

  //pop up box timing
  useEffect(() => {
    //after 3 second hide the alert box
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [showAlert]);

  // const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     // Handle form submission logic here

  //     let repair_id_integer = await generateRepairIdInt();
  //     setrepairIdInt(repair_id_integer);

  //     let repair_id_string = await generateRepairIdStr();
  //     setrepairIdStr(repair_id_string);

  //     const repair = ({repair_id_int, repair_id_str, name, email, contact, date, device_brand, device_model, problem, description});

  //  }, [showAlert]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    //dev==============================================
    //     let repair_id_integer = await generateRepairIdInt();
    //     setrepairIdInt(repair_id_integer);

    //     let repair_id_string = await generateRepairIdStr();
    //     setrepairIdStr(repair_id_string);

    //     const repair = {repair_id_int, repair_id_str, name, email, contact, date, device_brand, device_model, problem, description};
    //===========================================================

    //Generate new repair id
    let newRepairId = await generateNewRepairId();

    let repair_id_integer = generateRepairIdInt(newRepairId);
    setrepairIdInt(repair_id_integer);

    let repair_id_string = generateRepairIdStr(newRepairId);
    setrepairIdStr(repair_id_string);

    // const repair = ({repair_id_int, repair_id_str, name, email, contact, date, device_brand, device_model, problem, description});

    const repair = {
      repair_id_int: repair_id_integer,
      repair_id_str: repair_id_string,
      name,
      email,
      contact,
      date,
      device_brand,
      device_model,
      problem,
      description,
    };

    const response = await fetch("http://localhost:4000/api/repair/", {
      method: "POST",
      body: JSON.stringify(repair),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setEmail("");
      setContact("");
      setDate("");
      setDeviceBrand("");
      setDeviceModel("");
      setProblem("");
      setDescription("");
      setError(null);
      setShowAlert(true);
      dispatch({ type: "Create_Repair", payload: json });
    }
  };

  //get today date
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();

  const todayFormatted = yyyy + "-" + mm + "-" + dd;
  return (
    <>
      <div className=" min-h-screen pt-10 pb-6">
        <form
          className="w-full max-w-lg mx-auto p-5 mt-5 bg-white rounded-lg shadow-lg border border-gray-200"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold text-center mb-6">
            Submit Repair Request
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6"></div>
          <div>
            <label className="block mb-2 text-lg text-gray-700">Name*:</label>
            <input
              type="text"
              id="name"
              name="name"
              required="required"
              autoComplete="off"
              placeholder="Full Name"
              maxLength={20}
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <br />
          <div>
            <label className="block mb-2 text-lg text-gray-700">Email*:</label>
            <input
              type="email"
              id="email"
              name="email"
              required="required"
              autoComplete="off"
              placeholder="example@gmail.com"
              onChange={handleEmailChange}
              value={email}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {emailError && (
              <p className="mt-1 text-sm text-red-600">{emailError}</p>
            )}
          </div>{" "}
          <br />
          <div>
            <label className="block mb-2 text-lg text-gray-700">
              Contact Number*:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              required="required"
              autoComplete="off"
              placeholder="0xxxxxxxxx"
              pattern="0[0-9]{9}"
              title="Please enter a 10-digit phone number starting with '0'"
              maxLength={10}
              onChange={handleContactChange}
              value={contact}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {contactError && (
              <p className="mt-1 text-sm text-red-600">{contactError}</p>
            )}
          </div>{" "}
          <br />
          <div>
            <label className="block mb-2 text-lg text-gray-700">Date*:</label>
            <input
              type="date"
              id="date"
              name="date"
              pattern="mm/dd/yyyy"
              min={todayFormatted}
              onChange={(e) => setDate(e.target.value)}
              value={date}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>{" "}
          <br />
          <div>
            <label className="block mb-2 text-lg text-gray-700">
              Device Brand*:
            </label>
            <input
              type="text"
              id="device_brand"
              name="device_brand"
              required="required"
              autoComplete="off"
              placeholder="Brand Name"
              onChange={(e) => setDeviceBrand(e.target.value)}
              value={device_brand}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>{" "}
          <br />
          <div>
            <label className="block mb-2 text-lg text-gray-700">
              Device Model*:
            </label>
            <input
              type="text"
              id="device_model"
              name="device_model"
              required="required"
              placeholder="Model Name"
              autoComplete="off"
              onChange={(e) => setDeviceModel(e.target.value)}
              value={device_model}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>{" "}
          <br />
          <div>
            <label className="block mb-2 text-lg text-gray-700">
              Problem*:
            </label>
            <input
              type="text"
              id="problem"
              name="problem"
              required="required"
              autoComplete="off"
              placeholder="Problem Description"
              onChange={(e) => setProblem(e.target.value)}
              value={problem}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />{" "}
            <br />
            <div>
              <label className="block mb-2 text-lg text-gray-700">
                Description(Optional):
              </label>
              <textarea
                type="text"
                id="description"
                name="description"
                autoComplete="off"
                placeholder="Additional Information"
                rows={4}
                cols={50}
                maxLength={200}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>{" "}
            <br />
          </div>
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full px-4 py-2 mt-4 font-semibold bg-color4 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition duration-150"
            >
              Submit
            </button>
            {/* {error && <p className="text-red-800">{error}</p>} */}
          </div>
        </form>
        {showAlert && <RepairAlert_box message="New Repair Request Added" />}
      </div>
    </>
  );
};

export default Repair_form;
