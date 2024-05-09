import { useState } from "react";
import axios from "axios";
import "./User.css";
import regiimg from "./img/regi.png";
import { NavLink, useNavigate } from "react-router-dom";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/user", user);
      if (response.data && response.data.err === "user exists") {
        alert(
          "User with this email already exists. Please use a different email."
        );
      } else {
        alert("Registration successful!");

        navigate("/login");
      }
    } catch (err) {
      alert("An error occurred. Please try again later.");
      console.error(err);
    }
  };

  return (

  <div className="flex items-center justify-center min-h-screen p-4  bg-gray-100">
        <form className=" border shadow-lg rounded-md bg-white  border-gray-300 p-4 w-full sm:w-auto " onSubmit={handleSubmit} encType='multipart/form-data'>
        <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-xl  font-sans font-semibold leading-7 text-gray-900">User Resgistration</h2>
            <div className="lg:w-[600px] mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-auto">
            
            {/* product title */}
            <div className="col-span-full">
                <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                    Full Name
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="name"
                    id="name"
                    value={user.name}
                    onChange={handleInputChange}
                    autoComplete="name"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            {/* email */}
                <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Email
                </label>
                <div className="mt-2">
                    <input
                    type="email"
                    name="email"
                    id="email"
                    value={user.email}
                    onChange={handleInputChange}
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                {/* phone */}
                <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Phone
                </label>
                <div className="mt-2">
                    <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={user.phone}
                    onChange={handleInputChange}
                    pattern="[0-9]{10}"
                    maxLength={10}
                    title="Please enter a 10-digit phone number"
                    autoComplete="phone"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                 {/* address */}
                <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                    Address
                </label>
                <div className="mt-2">
                <textarea
                    type="text"
                    value={user.address}
                    onChange={handleInputChange}
                    name="address"
                    required
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>
                
                <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                </label>
                <div className="mt-2">
                    <input
                    type="password"
                    name="password"
                    id="password"
                    value={user.password}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    onChange={handleInputChange}
                    autoComplete="password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>

                <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                    Confirm Password
                </label>
                <div className="mt-2">
                    <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={user.confirmPassword}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    onChange={handleInputChange}
                    autoComplete="confirmPassword"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                </div>
            
            </div>
            </div>
        </div> 
        <div>
                <p className="text-center">
                  Already have an account?{" "}
                  <NavLink to={`/login`}>
                    <span className="no-acc-reg">Login</span>
                    </NavLink>
                </p>
              </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
            type="submit"
            className="rounded-md bg-color4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => navigate('/login')}
            >
            Cancel
            </button>
            <button
            type="submit"
            className="rounded-md bg-color4 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            
            >
            Register
            </button>
        </div>
        </form>
    </div>
 
  )
}

export default Register;
