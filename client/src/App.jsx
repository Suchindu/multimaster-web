import { BrowserRouter, Routes, Route } from 'react-router-dom'; 

// Importing pages and components
import Review from './pages/review_form';
import Header from './components/header';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
       <Header /> 
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={<Review />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;