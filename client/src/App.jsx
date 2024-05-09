
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Product from './components/admin/Product';
import AddProduct from './components/admin/AddProduct';
import SearchProduct from './components/store/ProductGrid';
import EditProduct from './components/admin/EditProduct';
import OverviewProduct from './components/store/ProductOverview';
import ProductSearch from './components/store/ProductSearch';
import Compare from './components/store/Compare';
import CompareProduct from './components/store/CompareProduct';
import Header from './components/header';
import ReviewsForm from './components/ReviewsForm';
import ReviewsDetails from './pages/ReviewsDetails';
import ReviewsReply from "./pages/ReviewsReply";
import AdminReviewsTable from "./pages/ReviewsTable";
import Footer from './components/footer';
import {QueryClient,QueryClientProvider,} from "@tanstack/react-query";
import Cart from './components/Cart.jsx';
import CheckOut from './components/checkout.jsx';
import Register from "./components/Manegment/User/Register.jsx";
import Login from "./components/Manegment/User/Login.jsx";
import UserProfile from "./components/Manegment/User/UserProfile.jsx";


import Orderview from "./components/order_view.jsx";
import SingleOrder from "./components/singleorder.jsx";
import OrderHistory from "./components/orderHistory.jsx";
import AdminDash from './components/admin/AdminDash.jsx';
import AdminDetail from "./components/Manegment/Admin/Admin/AdminDash";

import Dashboard from "./components/admin/Dashboard.jsx";
import Repair_form from "./components/Repair_form";
import Repair_details from "./components/Repair_details";
import Repair_table from "./pages/Repair_table";
import CheckRepair from "./components/CheckRepair";



import UpdateAccount from "./components/Manegment/User/UpdateAccount";

import AdminLogin from "./components/Manegment/Admin/Admin/AdminLogin";
import CoAdminCreate from "./components/Manegment/Admin/Admin/CoAdminCreateAcc";
import TechAdminCreate from "./components/Manegment/Admin/Admin/TechnicianCreateAcc";
import CoAdminLogin from "./components/Manegment/Admin/CoAdmin/CoAdminLogin";
import TechAdminLogin from "./components/Manegment/Admin/Technician/TechAdminLogin";






const queryClient = new QueryClient();

function App() {
  return (
     <QueryClientProvider client={queryClient}>
    <div className="App">
        <Routes>
          <Route path='/' element={<><Header/><SearchProduct/><Footer/></>}/>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/dashboard" element={<AdminDash currentPage={<Dashboard/>}/>}/>
          <Route path="/view-product/:id" element={<><Header/><OverviewProduct/><Footer/></>}/>
          <Route path="/cart" element={<><Header/><Cart/><Footer/></>} />
          <Route path="/checkout" element={<><Header/><CheckOut/><Footer/></>} />
          <Route path="/checkrepair" element={<><Header/><CheckRepair /><Footer/></>} />
          <Route path="/ReviewsForm" element={<><Header/><ReviewsForm /><Footer/></>} />
          <Route path="/ReviewsDetails" element={<><Header/><ReviewsDetails /><Footer/></>} />
          <Route path='/add-products' element={<AdminDash currentPage={<AddProduct />}/>}/>
          <Route path='/admin-products' element={<AdminDash currentPage={<Product/>}/>}/>
          <Route path="/edit-product/:id" element={<AdminDash currentPage={<EditProduct/>}/>}/>
          <Route path="/search" element={<ProductSearch/>}/>
          <Route path="/compare" element={<><Header/><Compare/><Footer/></>}/>
          <Route path="/compareproduct" element={<CompareProduct/>}/>
          <Route path='/orderview' element={<AdminDash currentPage={<Orderview />}/>}/>
          <Route path="/singleorder/:uid" element={<AdminDash currentPage={<SingleOrder />}/>} />
          <Route path="/orderhistory" element={<AdminDash currentPage={<OrderHistory />}/>} />
          <Route path="/repairform" element={<AdminDash currentPage={<Repair_form />}/>} />
          <Route path="/repairdetails" element={<AdminDash currentPage={<Repair_details />}/>} />
          <Route path="/repairtable" element={<AdminDash currentPage={<Repair_table />}/>} />
          <Route path="/ReviewsTable" element={<AdminDash currentPage={<AdminReviewsTable />}/>} />
          <Route path="/ReviewsReply" element={<AdminDash currentPage={<ReviewsReply />}/>}/>
          
          
          <Route path="/login" element={<><Header/><Login/><Footer/></>} />
          <Route path="/register" element={<><Header/><Register/><Footer/></>} />
          <Route path="/profile" element={<><Header/><UserProfile/><Footer/></>} />
          <Route path="/updateaccount/:id" element={<><Header/><UpdateAccount /><Footer/></>} />
          <Route path="/adminDash" element={<AdminDash currentPage={<AdminDetail />}/>} />
          <Route path="/coadminCreate" element={<AdminDash currentPage={<CoAdminCreate />}/>} />
          <Route path="/techadminCreate" element={<AdminDash currentPage={<TechAdminCreate />}/>} />
          <Route path="/coadminLogin" element={<CoAdminLogin />} />
          <Route path="/techadminLogin" element={<TechAdminLogin />} />
        
        
        </Routes>
    </div>
</QueryClientProvider>
  );
}

export default App;
