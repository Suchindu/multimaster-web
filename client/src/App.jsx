import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Product from './components/admin/Product';
import AddProduct from './components/admin/AddProduct';
// Importing pages and components
// import Review from './pages/review_form';
import Header from './components/header';
import Footer from './components/footer';
// import Repair_form from './components/Repair_form';

function App() {
  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/' element={<Product/>}/> 
          <Route path='/products' element={<AddProduct/>}/> 
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;