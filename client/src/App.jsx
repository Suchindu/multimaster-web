import { Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

export default App;

 

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