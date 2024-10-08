import axios from "axios";
import { createContext,useContext, useState } from "react";
// import toast, { Toaster } from "react-hot-toast"
export const CheckContext=createContext();
export const CheckProvider=({children})=>{
   const [checked, setChecked] = useState([]);
   const [checkedValues, setCheckedValues] = useState(
      () => JSON.parse(localStorage.getItem('checkedValues')) || {}
    );
    const apiUrl = 
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://shop-bucket.vercel.app";
   return (
      <CheckContext.Provider value={{checked,setChecked,checkedValues, setCheckedValues,apiUrl}}>
         {children}
      </CheckContext.Provider>
   )
}

export const checkAuth=()=>{
   const mainContext=useContext(CheckContext);
   return(
      mainContext
   )
}

