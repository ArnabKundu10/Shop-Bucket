import React from 'react'
import "../css/navbar/nav.css"
import { useAuth } from '../store/auth'
const Navbar = () => {
  const {token,setSignin,setToken}=useAuth();
  return (
    <div className="navbox d-md-flex justify-content-between pt-2 pb-2">
      <div className="navpart d-md-flex w-75">
       <div className='text-white fs-1 fw-bolder align-self-center ms-2 me-5'>
        <span className='orange'>S</span>hop <span className='orange'>B</span>ucket
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
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider"/></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className='text-white me-5 align-self-center'><i class="fs-3 fa-solid orange fa-cart-shopping"></i></li>
        <li className='btn orange-btn border p-2 rounded align-self-center'>{token ?<i onClick={()=>{setToken(localStorage.removeItem("token"))}} className="fa-solid fs-4 fa-user"></i>:<p onClick={()=>{setSignin({display:"block"})}} className='m-0'>Sign In</p>}</li>
       </ul>
      </div>
    </div>
  )
}

export default Navbar
