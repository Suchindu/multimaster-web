import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Importing pages and components
import Review from './pages/Reviews';
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

export default App;