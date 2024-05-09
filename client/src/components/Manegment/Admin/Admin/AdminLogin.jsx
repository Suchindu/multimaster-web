import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Admin.css";
import adminimg from "./img/adminlog.webp";
function AdminLogin() {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputs.username === "admin" && inputs.password === "123") {
      // Valid credentials, proceed with login
      alert("Login successful");
      window.location.href = "/DashBoard";
    } else {
      // Invalid credentials, show error message
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
  //   <div>
  //     <h1 className="login-topic">Admin Login Here..!</h1>
  //     <div className="user_tabl_towcolum">
  //       <div className="left_colum_user">
  //         <img src={adminimg} alt="regi img" className="regi_img_admin" />
  //       </div>
  //       <div className="riight_colum_user">
  //         <form className="regi-form" onSubmit={handleSubmit}>
  //           <label className="login-lable">Username:</label>
  //           <br />
  //           <input
  //             type="text"
  //             className="login-input"
  //             name="username"
  //             value={inputs.username}
  //             onChange={handleChange}
  //             required
  //           />
  //           <br />
  //           <label className="login-lable">Password:</label>
  //           <br />
  //           <input
  //             className="login-input"
  //             type="password"
  //             name="password"
  //             value={inputs.password}
  //             onChange={handleChange}
  //             required
  //           />
  //           <br />

  //           {error && <p style={{ color: "red" }}>{error}</p>}
  //           <br />
  //           <button className="admin_form_cneter_btn" type="submit">
  //             Login
  //           </button>
  //           <button    onClick={() => {
  //                   window.location.href = "/coadminLogin";
  //                 }} className="admin_form_cneter_btn" type="submit">
  //             Co Admin Login
  //           </button>
  //           <button    onClick={() => {
  //                   window.location.href = "/techadminLogin";
  //                 }} className="admin_form_cneter_btn" type="submit">
  //             Tech Admin Login
  //           </button>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
 
<>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Admin Login Here..!
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Admin Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="email"
                    autoComplete="username"
                    value={inputs.username}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={inputs.password}
                    autoComplete="current-password"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  <br />
                    {error && <p style={{ color: "red" }}>{error}</p>}
                <br />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
              
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign In
                </button>
                
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                {/* <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">Or</span>
                </div> */}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
              {/* <NavLink to={`/register`}>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
                </NavLink> */}
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </>



);

}

export default AdminLogin;
