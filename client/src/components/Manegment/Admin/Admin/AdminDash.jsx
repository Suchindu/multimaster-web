import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./Admin.css";
import { useReactToPrint } from "react-to-print";

const URL = "http://localhost:4000/user";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function AdminDash() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetchHandler().then((data) => setUser(data.user));
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) => {
      const filtered = data.user.filter((user) =>
        Object.values(user).some((field) =>
          field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setUser(filtered);
      setNoResults(filtered.length === 0);
    });
  };

  const ComponentsRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Details Report",
    onAfterPrint: () => alert("Details Report Successfully Downloaded!"),
  });

  return (
    <div>
      <div className="action_box_set">
        <div className="btn_set">
          <button
            className="btn_action_user"
            onClick={() => (window.location.href = "/coadminCreate")}
          >
            Add Co Admin
          </button>
          <button
            className="btn_action_user"
            onClick={() => (window.location.href = "/techadminCreate")}
          >
            Add Tech Admin
          </button>
          <button className="btn_action_user" onClick={handlePrint}>
            Print PDF
          </button>
        </div>
        <div className="searchdetil">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            className="search_input"
            placeholder="Search Here.."
          />
          <button onClick={handleSearch} className="btn_dash_admin">
            Search
          </button>
        </div>
      </div>
      <div ref={ComponentsRef}>
        {noResults ? (
          <div>
            <br />
            <h1 className="con_topic">
              No <span className="clo_us"> Found</span>
            </h1>
          </div>
        ) : (
          <div className="tbl_box">
            <h1 className="login-topic">User Details</h1>

            <table className="table_details_admin">
              <thead>
                <tr>
                  <th className="admin_tbl_th">id</th>
                  <th className="admin_tbl_th">Name</th>
                  <th className="admin_tbl_th">Email</th>
                  <th className="admin_tbl_th">Address</th>
                  <th className="admin_tbl_th">Phone</th>
                </tr>
              </thead>
              <tbody>
                {user.map((user, index) => (
                  <tr key={index}>
                    <td className="admin_tbl_td">{user._id}</td>
                    <td className="admin_tbl_td">{user.name}</td>
                    <td className="admin_tbl_td">{user.email}</td>
                    <td className="admin_tbl_td">{user.address}</td>
                    <td className="admin_tbl_td">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDash;
