import React, { useState } from 'react'
import "../css/navbar/nav.css"
import "../css/signin/signin.css"
import {useNavigate} from "react-router-dom"
import { useAuth } from '../store/auth'
import { useGoogleLogin } from '@react-oauth/google'
import { googleAuth } from '../api/googleAuth'
import toast, { Toaster } from "react-hot-toast"

const SignIn = () => {
  const navigate=useNavigate();
  const {setSignin,signin,setToken,setUser,userid,fetchCount}=useAuth();
  const[status,setStatus]=useState("Sign Up");
  const [registerdata, setRegister] = useState({
    name: "",
    email: "",
    password: ""
  });
  const responseGoogle = async (authResult)=>{
    try{
    if(authResult['code']){
    const result = await googleAuth (authResult['code']);
    // const {email,name}= result.data.user;
    console.log('result.data.user---', result.data);
    localStorage.setItem("token", result.data.token);
        setToken(localStorage.getItem("token"));
        localStorage.setItem("userid",result.data.user._id);
        setUser(localStorage.getItem("userid"));
        setSignin({display:"none"});
        navigate("/");
    }
    }catch(err) {
    toast.error('Error while requesting google code : ', err);
    }
    }
    const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code'
    })
  const inputChangeOne = async (e) => {
    try {
      const name = e.target.name;
      const value = e.target.value;
      setRegister({
        ...registerdata,
        [name]: value,
      });
    } catch (error) {
      console.log("register submit error", error);
    }
  };

  const handleSubmitOne = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://shop-bucket.vercel.app/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(registerdata),
        }
      );
      console.log("response data : ", response);
      if (response.ok) {
        if (response.status === 201) {
          const responseData = await response.json();
          console.log(responseData.user);
          localStorage.setItem("token", responseData.token);
        setToken(localStorage.getItem("token"));
        // setUser(responseData.user);
          setRegister({
            name: "",
            email: "",
            password: ""
          });
          setSignin({display:"none"});
          toast.success(
            "your account has been created! please login to visit home page"
          );
          navigate("/"); 
        } else {
          toast.error("identical email is not allowed!");
        }
      } else {
        toast.error("passwords are not matched");
      }
    } catch (error) {
      toast.error("there is an error");
      console.error(error);
    }
  };
  const handleSubmitTwo = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://shop-bucket.vercel.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(registerdata),
        }
      );
      // console.log("response data : ", response);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData.user);
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("userid",responseData.user._id);
        setToken(localStorage.getItem("token"));
        setUser(localStorage.getItem("userid"));
        console.log(userid);
        setRegister({
          email: "",
          password: "",
        });
        setSignin({display:"none"});
        navigate("/");
      } else {
        alert("login credentials are wrong");
        console.log("there is an error in register page");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
       <div
          id="register" style={signin}
          className="register col-md-4 border-opacity-50 ps-5 pe-5 pt-3 pb-3 rounded"
        >
          <p onClick={()=>{setSignin({display:"none"})}} className="fw-bold text-end p-0 m-0"><button className='btn orange-btn text-black'><i className="fs-2 fa-solid fa-xmark"></i></button></p>
          {status==="Sign Up"?
        <div>
        <p className="text-center fw-bolder fs-2">
        Don't have an <span className="orange">Account</span> ?
      </p>
      <p className="text-center fw-bolder fs-4">Sign Up</p>
      </div>
      : 
      <div>
      <p className="text-center fw-bolder fs-2">
        Already have an <span className="orange">Account</span> ?
      </p>
      <p className="text-center fw-bolder fs-4">Sign In</p> 
      </div>
        }
          
          <form onSubmit={status==="Sign Up"?handleSubmitOne:handleSubmitTwo}>
            {status==="Sign Up"?
            <>
            <label htmlFor="register-label fw-bold">Name</label>
            <input
              type="text"
              onChange={inputChangeOne}
              value={registerdata.name}
              className="w-100 mb-2 p-3 rounded border-orange p-3 rounded border-orange"
              name="name"
              placeholder="Lionel Messi"
            />
            </>
            :
            <></>}
            
            <label htmlFor="register-label fw-bold">Email</label>
            <input
              type="text"
              className="w-100 mb-2 p-3 rounded border-orange"
              name="email"
              onChange={inputChangeOne}
              value={registerdata.email}
              placeholder="messi@gmail.com"
            />
            <label htmlFor="register-label fw-bold">Password</label>
            <input
              type="password"
              className="w-100 mb-2 p-3 rounded border-orange"
              onChange={inputChangeOne}
              value={registerdata.password}
              name="password"
            />
            
            <div className="text-center">{
              status==="Sign Up"?
              <button className="btn orange-btn fw-bold" type="submit">
                Sign Up
              </button>
              :
              <button className="btn orange-btn fw-bold" type="submit">
                Sign In
              </button>
              }
              
            </div>
            {status==="Sign Up"?
            <p className="text-center fw-bolder">
            Already have an Account? <span className='orange fw-bold cursor-pointer' onClick={()=>{setStatus("Sign In")}}>login</span>
          </p>
          :
          <p className="text-center fw-bolder">
              Create an Account? <span className='orange fw-bold cursor-pointer' onClick={()=>{setStatus("Sign Up")}}>Sign Up</span>
            </p>
          }
            
          </form>
          <p className='text-center fw-bold fs-5 m-1'>
            or,
          </p>
          
            <button onClick={googleLogin} className='w-100 fs-4 fw-bolder pt-2 pb-2 rounded border-orange'>
              Continue with Google <i class="fs-2 fa-brands fa-google orange"></i>
            </button>
            <Toaster/>
        </div>
  )
}

export default SignIn
