
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ReviewsContextProvider } from './context/ReviewContext.jsx';
import { RepairsContextProvider } from './context/RepairContext.jsx';
import { CompareProvider } from './context/CompareContext.jsx';
import { ProductProvider } from './context/ProductContext.jsx';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>
      <ProductProvider>
      <CompareProvider>
          <RepairsContextProvider>
            <ReviewsContextProvider>
              <BrowserRouter>
                <Provider store={store}>
                    <App />
                </Provider>
              </BrowserRouter>
            </ReviewsContextProvider>
          </RepairsContextProvider>
        </CompareProvider>
      </ProductProvider>
    </ChakraProvider>
  </React.StrictMode>
);


