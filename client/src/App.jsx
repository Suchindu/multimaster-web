import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import Product from './components/admin/Product';
import AddProduct from './components/admin/AddProduct';
import SearchProduct from './components/store/ProductGrid';
import EditProduct from './components/admin/EditProduct';
import OverviewProduct from './components/store/ProductOverview';
import ProductSearch from './components/store/ProductSearch';
import Compare from './components/store/Compare';
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
        
        <Routes>
          <Route path='/' element={
            <>
              <Header/>
              <SearchProduct/>
              <Footer/>
            </>
          }/>
          <Route path="/view-product/:id" element={
            <>
              <Header/>
              <OverviewProduct/>
              <Footer/>
            </>
          }/>
          <Route path='/add-products' element={<AddProduct/>}/>
          <Route path='/admin-products' element={<Product/>}/>
          <Route path="/edit-product/:id" element={<EditProduct/>}/>
          <Route path="/search" element={<ProductSearch/>}/>
          <Route path="/compare" element={<Compare/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;