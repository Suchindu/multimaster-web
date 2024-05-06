import { BrowserRouter, Routes, Route } from "react-router-dom";

// Importing pages and components
import ReviewsForm from './components/ReviewsForm';
import ReviewsDetails from './pages/ReviewsDetails';
import ReviewsReply from "./pages/ReviewsReply";
import AdminReviewsTable from "./pages/ReviewsTable";
import Header from './components/header'; 
import Footer from './components/footer';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
       <Header/> 
        <div className="pages">
          <Routes>
            <Route
              path='/ReviewsForm'
              element={<ReviewsForm />}
            />
            <Route
              path='/ReviewsDetails'
              element={<ReviewsDetails />}
            />
            <Route
              path='/ReviewsTable'
              element={<AdminReviewsTable />}
            />
            <Route
              path='/ReviewsReply'
              element={<ReviewsReply />}
            />
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;