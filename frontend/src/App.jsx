import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Navbar from "./components/navbar";
import SignIn from "./components/signin";
import Category from "./pages/category";
import Cart from "./pages/cart";
import Home from "./pages/home"
import { GoogleOAuthProvider } from '@react-oauth/google'
const App = () => {
  // const GoogleAuthWrapper=()=>{
  //   return (
  //       <GoogleOAuthProvider clientId='799187700312-ebt90vbelvj30guccu1bkl30p4ot3bef.apps.googleusercontent.com'>
  //       <SignIn/>
  //       </GoogleOAuthProvider>
  //   )
  // }
  return (
    <>
    <Navbar/>
    <GoogleOAuthProvider clientId='799187700312-ebt90vbelvj30guccu1bkl30p4ot3bef.apps.googleusercontent.com'>
        <SignIn/>
    </GoogleOAuthProvider>
    {/* <SignIn/> */}
      <Routes>
         <Route path="/" element={<Home/>}/>
         {/* <Route path="/login" element={<GoogleAuthWrapper/>}/> */}
         <Route path="/category" element={<Category/>}/>
         <Route path="/cart" element={<Cart/>}/>
         <Route path="*" element={<Error/>}/>
      </Routes>
    
    </>
  )
}

export default App
