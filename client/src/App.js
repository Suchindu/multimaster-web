import React from "react";
import { Route, Routes } from "react-router";
import Register from "./Components/Manegment/User/Register";
import Login from "./Components/Manegment/User/Login";
import UserProfiel from "./Components/Manegment/User/UserProfiel";
import UpdateAccount from "./Components/Manegment/User/UpdateAccount";
//Admin
import AdminDash from "./Components/Manegment/Admin/Admin/AdminDash";
import AdminLogin from "./Components/Manegment/Admin/Admin/AdminLogin";
import CoAdminCreate from "./Components/Manegment/Admin/Admin/CoAdminCreateAcc";
import TechAdminCreate from "./Components/Manegment/Admin/Admin/TechnicianCreateAcc";
import CoAdminLogin from "./Components/Manegment/Admin/CoAdmin/CoAdminLogin";
import TechAdminLogin from "./Components/Manegment/Admin/Technician/TechAdminLogin";
function App() {
  return (
    <div>
      <React.Fragment>
        <Routes>
          {/*User Side*/}
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userprofile" element={<UserProfiel />} />
          <Route path="/updateaccount/:id" element={<UpdateAccount />} />
          {/*Admin Side*/}
          <Route path="/adminDash" element={<AdminDash />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          <Route path="/coadminCreate" element={<CoAdminCreate />} />
          <Route path="/techadminCreate" element={<TechAdminCreate />} />

          <Route path="/coadminLogin" element={<CoAdminLogin />} />
          <Route path="/techadminLogin" element={<TechAdminLogin />} />
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
