import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


import {
  RouterProvider,
} from "react-router-dom";
import router from './router/router.jsx';
import { Provider } from 'react-redux'
import { store } from './redux/store.js';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
     <Provider store={store}>
    <RouterProvider router={router}>
    <Toaster />
  
    </RouterProvider >
    </Provider>
  
)
