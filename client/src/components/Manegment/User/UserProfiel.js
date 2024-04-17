import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./User.css";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useNavigate();

  useEffect(() => {
    async function fetchUserDetails() {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post("http://localhost:4000/profile", {
          token: token,
        });
        if (response.data.status === "ok") {
          setUser(response.data.user); // Update user state with received user data
        } else {
          console.error("Error retrieving user details:", response.data.data);
        }
      } catch (error) {
        console.error("Error retrieving user details:", error.message);
      } finally {
        setLoading(false); // Update loading state regardless of success or error
      }
    }

    fetchUserDetails();
  }, []);

  const deleteHandler = async () => {
    const userConfirmed = window.confirm(
      "Are you sure you want to delete account?"
    );

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:4000/user/${user._id}`);
        window.alert("account details deleted successfully!");
        history("/");
        window.location.reload(); // Reload the page
      } catch (error) {
        // Handle deletion error if needed
        console.error("Error deleting account details:", error);
      }
    }
  };

  return (
    <div>
      <h1 className="login-topic">Welcome Back {user ? user.name : ""} </h1>
      <div className="user_profile">
        <div>
          {loading ? (
            <p>Loading user details...</p>
          ) : user ? (
            <div>
              <div>
                <h3 className="profile-name">Name : {user.name}</h3>
                <h3 className="profile-email"> Gmail : {user.email}</h3>
                <h3 className="profile-address">Address : {user.address}</h3>
                <h3 className="profile-phone">Phone : {user.phone}</h3>
              </div>
            </div>
          ) : (
            <p>User data not found.</p>
          )}
          {user && (
            <Link className="btn_dash_admin" to={`/updateaccount/${user._id}`}>
              Update
            </Link>
          )}
          <button onClick={deleteHandler} className="btn_dash_admin_dlt">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
