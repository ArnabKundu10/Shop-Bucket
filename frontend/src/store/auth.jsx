import { createContext,useContext,useEffect, useState } from "react";
export const AuthContext=createContext();

export const AuthProvider=({children})=>{
   const [token, setToken] = useState(localStorage.getItem("token"));
   const [signin,setSignin]=useState({display:"none"});
   useEffect(()=>{
      if(token){
         setSignin({display:"none"}) ;
      }
      },[])
   return (
      <AuthContext.Provider value={{token,setToken,signin,setSignin}}>
         {children}
      </AuthContext.Provider>
   )
}

export const useAuth=()=>{
   const mainContext=useContext(AuthContext);
   return(
      mainContext
   )
}

