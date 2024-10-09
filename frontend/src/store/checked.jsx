// import axios from "axios";
import { createContext,useContext, useState } from "react";
// import toast, { Toaster } from "react-hot-toast"
export const CheckContext=createContext();
export const CheckProvider=({children})=>{
   const [checked, setChecked] = useState([]);
   const [checkedValues, setCheckedValues] = useState(
      () => JSON.parse(localStorage.getItem('checkedValues')) || {}
    );
   return (
      <CheckContext.Provider value={{checked,setChecked,checkedValues, setCheckedValues}}>
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

