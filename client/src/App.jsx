import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Product from './components/admin/Product';
import AddProduct from './components/admin/AddProduct';
import SearchProduct from './components/store/ProductGrid';
import EditProduct from './components/admin/EditProduct';
import OverviewProduct from './components/store/ProductOverview';

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
          <Route path='/admin-products' element={<Product/>}/> 
          <Route path='/add-products' element={<AddProduct/>}/>
          <Route path='/products' element={<SearchProduct/>}/>
          <Route path="/edit-product/:id" element={<EditProduct/>}/>
          <Route path="/View-product/:id" element={<OverviewProduct/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;