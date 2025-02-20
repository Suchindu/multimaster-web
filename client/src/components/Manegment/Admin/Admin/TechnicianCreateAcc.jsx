import React, { useState } from "react";
import "./Admin.css";
import "../../User/User.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function TechnicianCreateAcc() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    phone: "",
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
      await axios.post("http://localhost:4000/techadmin/techadd", inputs);
      alert(" Added Success");
      window.location.reload();
    } catch (error) {
      console.error("Error submitting discount:", error);
      // Handle error and provide feedback to the user
    }
  };
  return (
    <div>
      <h2 className="login-topic">Create Tech Admin Account</h2>
      <form className="add_co_admin" onSubmit={handleSubmit}>
        <div>
          <label className="login-lable">Name:</label>
          <input
            className="login-input"
            type="text"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            required
          />
        </div>
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
          <label className="login-lable">Phone:</label>
          <input
            className="login-input"
            type="text"
            name="phone"
            pattern="[0-9]{10}"
            maxLength={10}
            title="Please enter a 10-digit phone number"
            value={inputs.phone}
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
        <button className="admin_form_cneter_btn" type="submit">Add</button>
      </form>
    </div>
  );
}

export default TechnicianCreateAcc;
