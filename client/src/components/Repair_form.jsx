import React, { useEffect, useState } from 'react';
//component
import RepairAlert_box from './RepairAlert_box';
const Repair_form = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [date, setDate] = useState('');
    const [device_brand, setDeviceBrand] = useState('');
    const [device_model, setDeviceModel] = useState('');
    const [problem, setProblem] = useState('');
    const [description, setDescription] = useState('');
    const [emailError, setEmailError] = useState(null);
    const [contactError, setContactError] = useState(null);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);

        //email validation
     const handleEmailChange = (e) => {
            const input = e.target.value;
            setEmail(input);
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regular expression
            if(!emailPattern.test(input)){
                setEmailError("Please enter a valid email address");
        }else {    
            setEmailError(null);
        }
    };

    //contact validation
    const handleContactChange = (e) => {
        const input = e.target.value; // Remove non-digit characters
        if(!/^\d*$/.test(input)){
            setContactError("Please enter a valid phone number");
        }else {
            setContact(input);
            setContactError(null);
        }

    };

    //pop up box timing
    useEffect(() => {
        //after 3 second hide the alert box
        const timeout = setTimeout(() => {
            setShowAlert(false);
        },  2000)

    return () => clearTimeout(timeout);
}, [showAlert]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic here
        const repair = ({name, email, contact, date, device_brand, device_model, problem, description});

        const response = await fetch( 'http://localhost:4000/api/repair/', {
            method: "POST",
            body: JSON.stringify(repair),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
        }
        if(response.ok){
            setName('');
            setEmail('');
            setContact('');
            setDate('');
            setDeviceBrand('');
            setDeviceModel('');
            setProblem('');
            setDescription('');
            setError(null);
            //alert("New Repair Request Added");
            setShowAlert(true);
        }
    };

    return (
        <>
        <h1 className="text-2xl font-bold text-center mt-5">Submit Repair Request</h1>
        
        <div className="my-5 border-b-2 border-gray-400"></div>
        
        <form className="w-full max-w-lg mx-auto border-2 border-gray-400 pl-5 pb-7 mt-5 bg-indigo-500 rounded-md" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label  className="block mb-2 text-white text-lg">
                        Name:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        required="required"
                        maxLength={20}
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div><br/>
                
                <div>
                    <label className="block mb-2 text-white text-lg">
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required="required"
                        onChange={handleEmailChange}
                        value={email}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {emailError && <p className="text-red-800">{emailError}</p>}
                </div> <br/>

                   <div>
                    <label className="block mb-2  text-white text-lg">
                        Contact Number:
                    </label>
                    <input
                        type="text"
                        id="contact"
                        name="contact"
                        required="required"
                        pattern="0[0-9]{9}"
                        title="Please enter a 10-digit phone number starting with '0'"
                        maxLength={10}
                        onChange={handleContactChange}
                        value={contact}
                        className="w-full md:w-64 px-4 py-2 border borddser-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {contactError && <p className="text-red-800">{contactError}</p>}
                </div> <br/>

                    <div>
                    <label className="block mb-2  text-white text-lg">
                        Date:
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        onChange={(e) => setDate(e.target.value)}
                        value={date}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> <br/>

                <div>
                    <label className="block mb-2  text-white text-lg">
                        Device Brand:
                    </label>
                    <input
                        type="text"
                        id="device_brand"
                        name="device_brand"
                        required="required"
                        onChange={(e) => setDeviceBrand(e.target.value)}
                        value={device_brand}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> <br/>

                 <div>
                    <label className="block mb-2  text-white text-lg">
                        Device Model:
                    </label>
                    <input
                        type="text"
                        id="device_model"
                        name="device_model"
                        required="required"
                        onChange={(e) => setDeviceModel(e.target.value)}
                        value={device_model}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> <br/>

                   <div>
                    <label className="block mb-2  text-white text-lg">
                        Problem:
                    </label>
                    <input
                        type="text"
                        id="problem"
                        name="problem"
                        required="required"
                        onChange={(e) => setProblem(e.target.value)}
                        value={problem}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> <br/>

                  <div>
                    <label className="block mb-2  text-white text-lg">
                        Description:
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        name="description"
                        rows={4}
                        cols={50}
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> <br/>
            </div>
            <button
                type="submit"
                className="mt-4 px-4 py-2 font-semibold bg-blue-800 text-white rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2  focus:bg-blue-800 focus:ring-opacity-50 transform motion-safe:hover:scale-110"
            >
                Submit
            </button>
            {/* {error && <p className="text-red-800">{error}</p>} */}
        </form>
        {showAlert && <RepairAlert_box message="New Repair Request Added" />
        }
    </>
    ); 
};

export default Repair_form;