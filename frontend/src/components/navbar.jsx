import React, { useState } from 'react'
import "../css/navbar/nav.css"
import { useAuth } from '../store/auth'
import {Link, useNavigate} from "react-router-dom"
import { checkAuth } from '../store/checked'
import { Categories } from './categories'
const Navbar = () => {
  const {token,setSignin,setToken,userdetails,count,}=useAuth();
  const {checked,setChecked,checkedValues, setCheckedValues}=checkAuth();
  const navigate=useNavigate();
  // const [isHovered, setIsHovered] = useState(false);
  const visitCategory=(name)=>{
    setChecked([name]); 
    const obj={
      [name]:true
    }
    setCheckedValues(obj);
    localStorage.setItem('checkedValues', JSON.stringify(obj));
    // console.log(checkedValues);
    navigate("/category");
  }
  return (
    <div className="navbox position-fixed d-md-flex justify-content-between pt-2 pb-2 w-100">
      <div className="navpart d-md-flex w-75">
       <div className='text-white fs-1 fw-bolder align-self-center ms-2 me-5 cursor-pointer' onClick={()=>navigate("/")}>
        <span className='orange'>S</span>hop<span className='orange'>B</span>ucket
       </div>
       <div className='align-self-center col-md-8'>
       <form className="d-flex w-100" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn orange-btn" type="submit">Search</button>
    </form>
       </div>
      </div>
      <div className="navpart w-25 text-center align-self-center">
       <ul className='d-md-flex justify-content-center text-decoration-none fs-5'>
       <li className="nav-item dropdown text-white me-5 align-self-center">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu">
            {
              Categories?.map((e)=>( 
                <li onClick={()=>visitCategory(e.name)} key={e._id}><Link className="dropdown-item" >{e.name}</Link></li>
                
              ))
            }
          </ul>
        </li>
        <li className='text-white me-5 align-self-center cursor-pointer' onClick={()=>navigate("/cart")}>
          <i class="fs-3 fa-solid orange fa-cart-shopping"></i>
          <div className="text-white rounded-circle set-cnt">{count}</div>
        </li>
        <li className='btn orange-btn border p-2 rounded align-self-center'>{token ?
        <>
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
            <i /* onClick={()=>{setToken(localStorage.removeItem("token"))}} */ className="fa-solid fs-4 fa-user"></i>
          </Link>
          <ul className="dropdown-menu mt-4">
            <div className='text-center'>
             <p className='text-white orange-bg fs-2 letter-logo rounded-circle'>{userdetails?userdetails.name.substring(0,1).toUpperCase():""}</p>
             <p className='orange fw-500 fs-5'>{userdetails?userdetails.name.toUpperCase():""}</p> 
            </div>
            <li ><Link className="dropdown-item">My Details</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item">My Dashboard</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="/admin-panel">Admin Panel</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item">My Orders</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li onClick={()=>{setToken(localStorage.removeItem("token"));localStorage.removeItem("userid");}}><Link className="dropdown-item">Log Out </Link></li>
          </ul>
          </>
          :<p onClick={()=>{setSignin({display:"block"})}} className='m-0'>Sign In</p>}</li>
       </ul>
      </div>
    </div>
  )
}

export default Navbar
