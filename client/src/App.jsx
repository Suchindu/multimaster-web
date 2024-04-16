import { BrowserRouter, Routes, Route } from "react-router-dom";

//Importing pages and components
import Review from './pages/Reviews';
import Header from './components/header';
import Footer from './components/footer';
import Repair_form from './components/Repair_form';

import Cart from './components/Cart.jsx';
import Home from './pages/Home.jsx';
import CheckOut from './components/checkout.jsx';




function App() {
  return (
    <div className="app">
      <Routes>
        <Route exact path='/' element={<Home />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/checkout' element={<CheckOut />}/>
      </Routes>
    </div>
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