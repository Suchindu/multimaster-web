import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./User.css";
function UpdateAccount() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchHandler = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/user/${id}`);
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    try {
      await axios.put(`http://localhost:4000/user/${id}`, user);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    sendRequest().then(() => {
      window.alert("Updated successfully!");
      window.location.href = "/profile";
    });
  };

  return (
    <div>
      <div className="m-10">
        <h1 className="login-topic">Update Your Account</h1>
        <div className="form_user">
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
              type="text"
              pattern="[0-9]{10}"
              maxLength={10}
              title="Please enter a 10-digit phone number"
              className="login-input"
              required
            />
            <br />
            <button type="submit" className="admin_form_cneter_btn">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateAccount;
