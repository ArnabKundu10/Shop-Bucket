import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Navbar from "./components/navbar";
import SignIn from "./components/signin";
import Category from "./pages/category";
import AdminPanel from './pages/admin-panel';
import Cart from "./pages/cart";
import Home from "./pages/home"
import { GoogleOAuthProvider } from '@react-oauth/google'
import AddProduct from './components/add-product';
import AllUsers from './components/users';
import ProductDetails from './components/product-details';
const App = () => {
  return (
    <>
    <Navbar/>
    <GoogleOAuthProvider clientId='799187700312-ebt90vbelvj30guccu1bkl30p4ot3bef.apps.googleusercontent.com'>
        <SignIn/>
    </GoogleOAuthProvider>
      <Routes>
         <Route path="/" element={<Home/>}/>
         <Route path="/category" element={<Category/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="/product/:id" element={<ProductDetails/>}/>
         <Route path="/admin-panel" element={<AdminPanel/>}>
            <Route path="users" element={<AllUsers/>}/>
            <Route path="add-product" element={<AddProduct/>}/>
         </Route>
         <Route path="*" element={<Error/>}/>
      </Routes>
    
    </>
  )
}

export default App
