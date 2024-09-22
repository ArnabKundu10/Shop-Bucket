import React from 'react'
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

import toast, { Toaster } from "react-hot-toast"
// import axios from 'axios';
const ProductDesc = ({item}) => {
   const priceOff=Math.ceil((item.sellingPrice - item.price)*100/(item.sellingPrice));
   const navigate=useNavigate();
   const {addCart}=useAuth();
    
  return (
    <div className='col-md-2 m-4 prduct-struct rounded' onClick={(e)=>{e.preventDefault();navigate(`/product/${item.productName}`,{state: {item,priceOff}})}}>
      <div className='img-cover'>
      <img src={item.productImage} alt="img" className='product-image rounded'/>
      </div>
       <div className='p-4'>
         <div className='d-flex justify-content-between opacity-less'>
          <p className='fw-bold'>
         {item.price} Rs.
         </p>
         <p className='text-cut fw-bold'>
         {item.sellingPrice} Rs. 
         </p> 
         </div>
         <div className='d-flex justify-content-between'>
         <div className='align-self-center col-md-7'>
         <p className='fw-bold opacity-less'>{priceOff}% OFF</p>
         <p className='fs-5 fw-bolder'>{item?.brandName?.toUpperCase()}</p>
         </div>
         <div className='align-self-center col-md-5 p-0 fw-bolder'>
          <button className='orange-main-btn btn' onClick={(e)=>addCart(e,item)}>Add to Cart <i className="fa-solid fa-cart-shopping"></i></button>
         </div>
         </div>
         
       <p>{item.productName.substring(0,20)}...</p>
       </div>
       <Toaster/>
    </div>
  )
}

export default ProductDesc
