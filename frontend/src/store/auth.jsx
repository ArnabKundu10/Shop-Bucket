import axios from "axios";
import { createContext,useContext,useEffect, useState } from "react";
import toast from "react-hot-toast"
export const AuthContext=createContext();
export const AuthProvider=({children})=>{
   const [token, setToken] = useState(localStorage.getItem("token"));
   const [signin,setSignin]=useState({display:"none"});
   const [userid,setUser]=useState(localStorage.getItem("userid"));
   const [userdetails,setUserdetails]=useState({
      name:"",
      email:"",
      role:""
   })
   const[count,setCount]=useState(0);
   const apiUrl = 
   window.location.hostname === "localhost"
     ? "http://localhost:3000"
     : "https://shop-bucket.vercel.app";
   const fetchCount=async()=>{
      try {
         const response = await axios.get(
            `${apiUrl}/auth/count-items`,
            {
              headers: {
                "Authorization":token,
              }
            }
          ); 
          console.log(response);
          if(response.data.success){
            setCount(response.data.count);  
          }
      } catch (error) {
         console.log(error);
      }
   }
   useEffect(()=>{
      if(token){
         setSignin({display:"none"}) ;
      }
      const fetchDetails=async()=>{
         try {
            const response = await fetch(
               `${apiUrl}/auth/customer/${userid}`,
               {
                 method: "GET",
                 headers: {
                   "Content-Type": "application/json",
                   credentials: "include",
                 }
               }
             ); 
             if(response.ok){
               const userinfos=await response.json();
               setUserdetails(userinfos.user);  
               console.log(userinfos);  
             }
         } catch (error) {
            console.log(error);
         }
      }
      fetchDetails();
      token?fetchCount():setCount(0);
      },[token]);
      const addCart=async(e,item)=>{
         try {
          e.preventDefault();
          e.stopPropagation();
          const response=await axios.post(
             `${apiUrl}/auth/add-to-cart`,{productId:item._id},
             {
               headers: {
                 "Authorization":token,
               }
             }
           ); 
          console.log(response);
          if(response.data.success){
             setCount(count+1);
             toast.success(response.data.message);
          }
          else{
           toast.error(response.data.message);
          }
         } catch (error) {
          toast.error("please login first");
          setSignin({display:"block"});
         }
       }
   return (
      <AuthContext.Provider value={{addCart,token,setToken,signin,setSignin,userid,setUser,userdetails,count,setCount}}>
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

