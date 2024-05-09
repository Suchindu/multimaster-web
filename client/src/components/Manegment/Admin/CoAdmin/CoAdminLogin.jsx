import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import adminimg from "./img/adminlog.webp";
import "../Admin/Admin.css";

function CoAdminLogin() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/coadmin/cologin",
        inputs
      );
      const token = response.data.token;

      // Save token to localStorage or sessionStorage
      localStorage.setItem("coadminToken", token);
      alert("Login successful");
      // Redirect to admin dashboard or wherever you need to navigate after successful login
      // navigate("/admindsh");
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error and provide feedback to the user
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div>
      <h2 className="login-topic">CoAdmin Login</h2>
      <div className="user_tabl_towcolum">
        <div className="left_colum_user">
          <img src={adminimg} alt="regi img" className="regi_img_admin" />
        </div>
        <div className="riight_colum_user">
          <form className="regi-form" onSubmit={handleSubmit}>
            <div>
              <label className="login-lable">Email:</label>
              <input
                className="login-input"
                type="email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="login-lable">Password:</label>
              <input
                className="login-input"
                type="password"
                name="password"
                value={inputs.password}
                onChange={handleChange}
                required
              />
            </div>
            <button  className="admin_form_cneter_btn"  type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CoAdminLogin;
