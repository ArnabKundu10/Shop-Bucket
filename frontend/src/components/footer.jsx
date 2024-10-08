import React from 'react'
import { NavLink } from 'react-router-dom'
import "../css/footer/footer.css"
const Footer = () => {
  return (
   <div className='footer-container d-flex flex-column text-white'>
   <div className="footer-subcontainer d-flex justify-content-between">
      <div className='d-flex justify-content-between w-50'>
          <div className=' d-flex flex-column'>
           <p className='fs-5 fw-bolder'>Movie Category</p>
            <p>
            <NavLink to="/" className="footer-link">For You</NavLink>
            </p>
            <p>
            <NavLink to="/admin-panel" className="footer-link">Admin Panel</NavLink>
            </p>
            <p>
            <NavLink to="/cart" className="footer-link">Cart Items</NavLink>
            </p>
            <p>
            <NavLink to="/category" className="footer-link">Categories</NavLink>
            </p>
            <p>
            <NavLink to="/admin-panel/users" className="footer-link">Users</NavLink>
            </p>
            
          </div>
          <div className='d-flex flex-column'>
          <p className='fs-5 fw-bolder'>Support</p>
          <p className='fw-bold footer-link'>Help</p>
          <p className='fw-bold footer-link'>Terms & Conditions</p>
          <p className='fw-bold footer-link'>Privacy Policy</p>
          <p className='fw-bold footer-link'>Content Complaints</p>
          </div>
      </div>
      <div>
      <p className='fs-5 fw-bolder'>Connect With Us</p>
      <a href="www.facebook.com"><i class="fa-brands fa-facebook fs-2 m-2 text-white"></i></a>
      <a href="www.facebook.com"><i class="fa-brands fa-instagram fs-2 m-2 text-white"></i></a>
      <a href="www.facebook.com"><i class="fa-brands fa-twitter fs-2 m-2 text-white"></i></a>
      <a href="www.facebook.com"><i class="fa-brands fa-github fs-2 m-2 text-white"></i></a>
      </div>
   </div>
   <div className="footer-subcontainer">
   <p className='text-center fw-bold'>Copyright © 2024 Shop-Bucket All rights reserved</p>
   </div>
 </div>
  )
}

export default Footer
