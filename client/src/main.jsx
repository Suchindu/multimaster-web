
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ReviewsContextProvider } from './context/ReviewContext.jsx';
import { RepairsContextProvider } from './context/RepairContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

// ReactDOM.createRoot(document.getElementById('root')).render(





// import { ReviewsContextProvider } from "./context/ReviewContext.jsx";


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ReviewsContextProvider>
//       <App/>
//     </ReviewsContextProvider>
//   </React.StrictMode>
// );

// ReactDOM.createRoot(document.getElementById("root")).render(

//   <React.StrictMode>
//     <ReviewsContextProvider>
//       <App/>
//     </ReviewsContextProvider>
//   </React.StrictMode>
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Shopping_cart />
//   </React.StrictMode>,

// );

// )


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <RepairContextProvider>
    <ProductProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
    </ProductProvider>
</RepairContextProvider>
  </React.StrictMode>
);

