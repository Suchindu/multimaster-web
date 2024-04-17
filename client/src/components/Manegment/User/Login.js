import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./User.css";
import logimg from "./img/log.png";
function Login() {
  const history = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
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
        window.location.href = "/userprofile";
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
    <div>
      <h1 className="login-topic">Login Here..!</h1>
      <div className="user_tabl_towcolum">
        <div className="left_colum_user">
          <img src={logimg} alt="regi img" className="regi_img" />
        </div>
        <div className="riight_colum_user">
          <form className="regi-form" onSubmit={handleSubmit}>
            <label className="login-lable">Gmail</label>
            <br></br>
            <input
              type="email"
              className="login-input"
              value={user.email}
              onChange={handleInputChange}
              name="email"
              required
            ></input>
            <br></br>
            <label className="login-lable">Password</label>
            <br></br>
            <input
              type="password"
              className="login-input"
              value={user.password}
              name="password"
              onChange={handleInputChange}
              required
            ></input>
            <br></br>
            <button className="admin_form_cneter_btn" type="submit">
              Login
            </button>
            <div>
              <p className="no-acc">
                Don't Have An Account{" "}
                <span
                  className="no-acc-reg"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Register
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
