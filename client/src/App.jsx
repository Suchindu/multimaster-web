import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing pages and components
// import Review from './pages/review_form';
// import Header from './components/header';
// import Footer from './components/footer';
import Repair_form from "./components/Repair_form";
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
              <Route path="Repair_table" element={<Repair_table />} />
              <Route path="Check_repair" element={<CheckRepair />} />
            </Routes>
          </div>
          {/* <Footer/> */}
        </BrowserRouter>
      </div>
    </>
  );
}
export default App;
