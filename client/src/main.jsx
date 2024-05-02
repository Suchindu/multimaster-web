import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ReviewsContextProvider } from './context/ReviewContext.jsx';
import { RepairsContextProvider } from './context/RepairContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ProductProvider>
      <App/>
    </ProductProvider>
  </React.StrictMode>

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Shopping_cart />
//   </React.StrictMode>,
// );
);