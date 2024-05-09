import { useState } from "react";
import axios from "axios";
import "./User.css";
import logimg from "./img/log.png";
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest();
      if (response.token) {
        // If token exists in the response
        localStorage.setItem("token", response.token); // Store token in localStorage
        alert("Login Success..!");
        navigate("/");
      } else {
        alert("Please enter valid Gmail & Password..!");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:4000/login", {
        email: user.email,
        password: user.password,
      });
      return res.data;
    } catch (err) {
      throw new Error("Failed to login");
    }
  };

  return (
  //   <div>
  //     <h1 className="login-topic">Login Here..!</h1>
  //     <div className="user_tabl_towcolum">
  //       <div className="left_colum_user">
  //         <img src={logimg} alt="regi img" className="regi_img" />
  //       </div>
  //       <div className="riight_colum_user">
  //         <form className="regi-form" onSubmit={handleSubmit}>
  //           <label className="login-lable">Gmail</label>
  //           <br></br>
  //           <input
  //             type="email"
  //             className="login-input"
  //             value={user.email}
  //             onChange={handleInputChange}
  //             name="email"
  //             required
  //           ></input>
  //           <br></br>
  //           <label className="login-lable">Password</label>
  //           <br></br>
  //           <input
  //             type="password"
  //             className="login-input"
  //             value={user.password}
  //             name="password"
  //             onChange={handleInputChange}
  //             required
  //           ></input>
  //           <br></br>
  //           <button className="admin_form_cneter_btn" type="submit">
  //             Login
  //           </button>
  //           <div>
  //             <p className="no-acc">
  //               {"Don't Have An Account"}
  //               <NavLink to={`/register`}>
  //                 <span className="no-acc-reg">Register</span>
  //               </NavLink>
  //             </p>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );

  <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100 mb-2">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to Your Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={handleInputChange}
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
                    value={user.password}
                    autoComplete="current-password"
                    onChange={handleInputChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
              <NavLink to={`/register`}>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign In
                </button>
                </NavLink>
              </div>
            </form>

            <div>
              <div className="relative mt-10">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm font-medium leading-6">
                  <span className="bg-white px-6 text-gray-900">Or</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4">
              <NavLink to={`/register`}>
              <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
                </NavLink>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </>
  )
}

export default Login;
