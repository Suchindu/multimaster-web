import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

//Importing pages and components
import Review from './pages/Reviews';
import Header from './components/header';
import Footer from './components/footer';
import Repair_form from './components/Repair_form';
import TestDashboard from './components/test_dashboard';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
       <Header/> 
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={<Review />}
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
    </>
  );
}

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




