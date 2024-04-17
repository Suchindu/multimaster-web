import React, { useState } from "react";
import axios from "axios";
import "./User.css";
import regiimg from "./img/regi.png";
function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

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
        window.location.href = "/login";
      }
    } catch (err) {
      alert("An error occurred. Please try again later.");
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="login-topic">Join With Us..!</h1>

      <div className="user_tabl_towcolum">
        <div className="left_colum_user">
          <img src={regiimg} alt="regi img" className="regi_img" />
        </div>
        <div className="riight_colum_user">
          <form className="regi-form" onSubmit={handleSubmit}>
            <label className="login-lable">Full Name</label>
            <br />
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleInputChange}
              className="login-input"
              required
            />
            <br />
            <label className="login-lable">Email</label>
            <br />
            <input
              type="email"
              value={user.email}
              onChange={handleInputChange}
              className="login-input"
              name="email"
              required
            />
            <br />
            <label className="login-lable">Address</label>
            <br />
            <input
              type="text"
              value={user.address}
              onChange={handleInputChange}
              className="login-input"
              name="address"
              required
            />
            <br />
            <label className="login-lable">Phone</label>
            <br />
            <input
              name="phone"
              value={user.phone}
              onChange={handleInputChange}
              type="tel"
              pattern="[0-9]{10}"
              maxLength={10}
              title="Please enter a 10-digit phone number"
              className="login-input"
              required
            />
            <br />
            <label className="login-lable">Password</label>
            <br />
            <input
              name="password"
              value={user.password}
              onChange={handleInputChange}
              type="password"
              className="login-input"
              required
            />
            <br />
            <label className="login-lable">Confirm Password</label>
            <br />
            <input
              type="password"
              value={user.confirmPassword}
              onChange={handleInputChange}
              className="login-input"
              name="confirmPassword"
              required
            />
            <br />

            <button type="submit" className="admin_form_cneter_btn">
              Register
            </button>
            <div>
              <p className="no-acc">
                Already have an account?{" "}
                <span
                  className="no-acc-reg"
                  onClick={() => (window.location.href = "/login")}
                >
                  Login
                </span>
              </p>
            </div>
            <button
              onClick={() => (window.location.href = "/adminLogin")}
              type="submit"
              className="admin_form_cneter_btn"
            >
              Admin
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
