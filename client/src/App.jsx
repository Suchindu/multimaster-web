
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Product from './components/admin/Product';
import AddProduct from './components/admin/AddProduct';
import SearchProduct from './components/store/ProductGrid';
import EditProduct from './components/admin/EditProduct';
import OverviewProduct from './components/store/ProductOverview';
import ProductSearch from './components/store/ProductSearch';
import Compare from './components/store/Compare';
// Importing pages and components
// import Review from './pages/review_form';
import Header from './components/header';
import Footer from './components/footer';
// import Repair_form from './components/Repair_form';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

//Importing pages and components
import Cart from './components/Cart.jsx';
import Home from './pages/Home.jsx';
import CheckOut from './components/checkout.jsx';
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import UserProfile from "./components/Auth/UserProfile.jsx";
import Orderview from "./components/order_view.jsx";
import SingleOrder from "./components/singleorder.jsx";
import OrderHistory from "./components/orderHistory.jsx";

const queryClient = new QueryClient();

function App() {
  return (
     <QueryClientProvider client={queryClient}>
    <div className="App">
  
        
        <Routes>
          <Route path='/' element={
            <>
              <Header/>
              <SearchProduct/>
              <Footer/>
            </>
          }/>
          <Route path="/view-product/:id" element={
            <>
              <Header/>
              <OverviewProduct/>
              <Footer/>
            </>
          }/>
          <Route exact path="/home" element={<><Header/><Home/><Footer/></>} />
          <Route path="/cart" element={<><Header/><Cart/><Footer/></>} />
          <Route path="/checkout" element={<><Header/><CheckOut/><Footer/></>} />
          <Route path="/login" element={<><Header/><Login/><Footer/></>} />
          <Route path="/register" element={<><Header/><Register/><Footer/></>} />
          <Route path="/profile" element={<><Header/><UserProfile/><Footer/></>} />
          <Route path='/add-products' element={<AddProduct/>}/>
          <Route path='/admin-products' element={<Product/>}/>
          <Route path="/edit-product/:id" element={<EditProduct/>}/>
          <Route path="/search" element={<ProductSearch/>}/>
          <Route path="/compare" element={<Compare/>}/>
          <Route path='/orderview' element={<Orderview />}/>
          <Route path="/singleorder/:uid" element={<SingleOrder />} />
          <Route path="/orderhistory" element={<OrderHistory />} />
        </Routes>
    </div>
</QueryClientProvider>
  );
}

export default App;



// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <div className="app">
//         <Header />
//         <Routes>
//           <Route exact path="/" element={<Home />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/checkout" element={<CheckOut />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/profile" element={<UserProfile />} />
//         </Routes>
//         <Footer />
//       </div>
//     </QueryClientProvider>
//   );
// }



 

// function App() {
//   return (
//     <>
//     <div className="App">
//       <BrowserRouter>
//        <Header/>
//         <div className="pages">
//           <Routes>
//             <Route
//               path='/'
//               element={<Review />}
//             />
//           </Routes>
//         </div>
//         <Footer/>
//       </BrowserRouter>
//     </div>
//     </>
//   );
// }


// function App() {
//   return (
//     <>
//     <div className="App">
//       <BrowserRouter>
//         <div className="pages">
//           <Routes>
//             <Route
//               path='/'
//               element={<Repair_form />}
//             />
//           </Routes>
//         </div>
//         {/* <Footer/> */}
//       </BrowserRouter>
//     </div>
//     </>
//   );
// }
// export default App;

