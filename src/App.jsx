import { useState } from 'react'
import reactLogo from './assets/react.svg'

import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout.jsx';
import Home from './Components/Home/Home.jsx'
import Cart from './Components/Cart/Cart.jsx';
import Products from './Components/Products/Products.jsx';
import Categories from './Components/Categories/Categories.jsx';
import Brands from './Components/Brands/Brands.jsx';
import Register from './Components/Register/Register.jsx';
import Login from './Components/Login/Login.jsx';
import Notfound from './Components/Notfound/Notfound.jsx';
import ResetPassword from './Components/ResetPassword/ResetPassword.jsx'
import ForgetPassword from './Components/ForgetPassword/ForgetPassword.jsx';
import GetCode from './Components/GetCode/GetCode.jsx';
import ContextProvider from './Context/Context.jsx';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.jsx'
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast'
import CheckOut from './Components/CheckOut/CheckOut.jsx'
import AllOrders from './Components/AllOrders/AllOrders.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import WishList from './Components/WishList/WishList.jsx';
import WishListContextProvider from './Context/WishListContext';






const routers = createBrowserRouter([
  {
    path: '', element: <Layout />, children: [
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
      { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
      { path: 'ProductDetails/:id/:category', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'CheckOut', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'wishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'resetpassword', element: <ResetPassword /> },
      { path: 'ForgetPassword', element: <ForgetPassword /> },
      { path: 'GetCode', element: <GetCode /> },

      { path: '*', element: <Notfound /> },
    ]
  }
])

// const query = new QueryClient()

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <QueryClientProvider client={query}> */}
      <WishListContextProvider>
        <CartContextProvider>
          <ContextProvider>
            <RouterProvider router={routers}></RouterProvider>
            <Toaster />
          </ContextProvider>
        </CartContextProvider>
      </WishListContextProvider>
      {/* </QueryClientProvider> */}



    </>
  )
}


