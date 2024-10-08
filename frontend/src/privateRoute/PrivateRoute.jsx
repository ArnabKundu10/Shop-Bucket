// import React from 'react'
import toast from 'react-hot-toast';
import { useAuth } from '../store/auth'
import { Navigate, useNavigate } from 'react-router-dom';
const PrivateRoute = ({children}) => {
   const {token,userdetails}=useAuth();
   if (!userdetails || !token) {
      return <Navigate to="/" replace />;
    }
    const notAuthorized=()=>{
     toast.error("Only admin can visit Admin panel");
     return <Navigate to="/" replace />;
    }
    return userdetails.role === "ADMIN" ? children : notAuthorized();
}

export default PrivateRoute
