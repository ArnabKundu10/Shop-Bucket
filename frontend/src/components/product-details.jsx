import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../store/auth';
import toast, { Toaster } from "react-hot-toast"
const ProductDetails = () => {
   const location=useLocation();
   const {item,priceOff}=location.state || {};
   const {addCart}=useAuth();
  return (
    <div className='ps-5 pe-5 ms-5 me-5 product-details'>
     <div className='d-flex flex-md-row justify-content-between'>
       <div className='col-5'>
         <img className='single-image-design' src={item.productImage} alt="" />
       </div>
       <div className='col-5'>
         <p className='fw-bolder fs-5'>{item.brandName}</p>
         <p className='fs-1 fw-bold'>{item.productName}</p>
         <pre className='fs-1 fw-bolder'>&#8377;{item.price} <span className='fs-5 opacity-less text-cut'>{item.sellingPrice}</span> <span className='fs-5 opacity-less '>{priceOff}%OFF</span> </pre>
         <hr />
         <p className='fw-bold'>About The Product</p>
         <p>{item.description}</p>
         <div className='col-md-6 p-2 rounded fw-bolder orange-main-btn'>
          <button className='btn fw-bolder fs-3' onClick={(e)=>addCart(e,item)}>Add to Cart <i className="fa-solid fa-cart-shopping"></i></button>
         </div>
       </div>
     </div>
     <Toaster/>
    </div>
  )
}

export default ProductDetails
