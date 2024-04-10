import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Shopping_cart from './components/Shopping_cart.jsx';
import { ReviewsContextProvider } from './context/ReviewContext.jsx';
import { RepairsContextProvider } from './context/RepairContext.jsx';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <ReviewsContextProvider>
//       <App />
//     </ReviewsContextProvider>
//   </React.StrictMode>
// )

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Shopping_cart />
//   </React.StrictMode>,
// );

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RepairsContextProvider>
      <App />
    </RepairsContextProvider>
  </React.StrictMode>
)