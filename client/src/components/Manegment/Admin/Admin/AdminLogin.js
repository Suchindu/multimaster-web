import React, { useState } from "react";
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
      window.location.href = "/adminDash";
    } else {
      // Invalid credentials, show error message
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="login-topic">Admin Login Here..!</h1>
      <div className="user_tabl_towcolum">
        <div className="left_colum_user">
          <img src={adminimg} alt="regi img" className="regi_img_admin" />
        </div>
        <div className="riight_colum_user">
          <form className="regi-form" onSubmit={handleSubmit}>
            <label className="login-lable">Username:</label>
            <br />
            <input
              type="text"
              className="login-input"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              required
            />
            <br />
            <label className="login-lable">Password:</label>
            <br />
            <input
              className="login-input"
              type="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
            />
            <br />

            {error && <p style={{ color: "red" }}>{error}</p>}
            <br />
            <button className="admin_form_cneter_btn" type="submit">
              Login
            </button>
            <button    onClick={() => {
                    window.location.href = "/coadminLogin";
                  }} className="admin_form_cneter_btn" type="submit">
              Co Admin Login
            </button>
            <button    onClick={() => {
                    window.location.href = "/techadminLogin";
                  }} className="admin_form_cneter_btn" type="submit">
              Tech Admin Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
