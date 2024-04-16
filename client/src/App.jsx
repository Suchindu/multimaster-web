import { BrowserRouter, Routes, Route } from "react-router-dom";

//import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
// Importing pages and components
// import Review from './pages/review_form';
import Header from "./components/header";
import Footer from "./components/footer";
import Repair_form from "./components/Repair_form";
import Repair_details from "./components/Repair_details";
import Repair_table from "./pages/Repair_table";
import CheckRepair from "./components/CheckRepair";

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

function App() {
  return (
    <>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={<Repair_form />} />
              <Route path="Repair_details" element={<Repair_details />} />
              <Route path="Repair_table" element={<Repair_table />} />
              <Route path="CheckRepair" element={<CheckRepair />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
