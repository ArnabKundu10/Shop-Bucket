import axios from 'axios';
import React, { useState } from 'react'
import { useAuth } from '../store/auth';
const CartItem = ({element,setItems,totalprice,setTotalPrice,sellprice,setSellPrice}) => {
   let item=element.productId;
   let tp=totalprice;
   const {token,count,setCount}=useAuth();
   const priceOff=Math.ceil((item.sellingPrice - item.price)*100/(item.sellingPrice));
   const[qty,setQty]=useState(element.quantity);
   const deleteItem=async()=>{
     try {
      // console.log(element.productId._id,token);
      const response=await axios.post(
         `http://localhost:3000/auth/delete-item`,{productId:element.productId},
         {
           headers: {
             "Authorization":token,
           }
         }
       ); 
      // console.log(response);
      if(response.data.success){
         setTotalPrice(response.data.tp);
         setSellPrice(response.data.sp); 
         setItems(response.data.data);
         setCount(count-1);
      }
     } catch (error) {
      console.log(error);
     }
   }
   const decQty=async()=>{
      try {
         // console.log(element.productId._id,token);
         const response=await axios.post(
            `http://localhost:3000/auth/dec-item`,{productId:element.productId,quantity:qty},
            {
              headers: {
                "Authorization":token,
              }
            }
          ); 
         // console.log(response);
         if(response.data.success){
            if(qty!=1){
               let calPrice1=totalprice-(item.price);
               let calPrice2=sellprice-(item.sellingPrice);
               setTotalPrice(calPrice1);
               setSellPrice(calPrice2);  
            }
            setQty(response.data.quantity);
         }
        } catch (error) {
         console.log(error);
        }  
   }
   const incQty=async()=>{
      try {
         // console.log(element.productId._id,token);
         const response=await axios.post(
            `http://localhost:3000/auth/inc-item`,{productId:element.productId,quantity:qty},
            {
              headers: {
                "Authorization":token,
              }
            }
          ); 
         // console.log(response);
         if(response.data.success){
               let calPrice1=totalprice+(item.price);
               let calPrice2=sellprice+(item.sellingPrice);
               console.log(calPrice1,calPrice2);
               setTotalPrice(calPrice1);
               setSellPrice(calPrice2);
            setQty(response.data.quantity);
         }
        } catch (error) {
         console.log(error);
        }  
   }
  return (
    <div className='d-flex flex-col pt-2 pb-2 ps-4 pb-4 w-100 border-bottom'>
      <div className='col-md-4 me-4'>
      <div className='w-100 mb-2'>
         <img className='cart-image' src={element.productId.productImage} alt="" />
      </div>
      <div className='text-center'>
         <button className='btn ms-2 me-2 rounded-circle border-yellow' onClick={incQty}>+</button>
         <button className='btn ms-2 me-2 border-yellow'>{qty}</button>
         <button className='btn ms-2 me-2 rounded-circle border-yellow' onClick={decQty}>-</button>
      </div>
      </div>
      <div className='col-md-6'>
         <p>{element.productId.brandName}</p>
         <p>{element.productId.productName}</p>
         <div className='d-flex fs-5 justify-content-between flex-row'>
         <p className='align-self-center'>
             <pre className='fw-bolder fs-3'>&#8377;{element.productId.price} <span className='opacity-less text-cut fs-5'>{element.productId.sellingPrice}</span> <span className='opacity-less fs-5'>{priceOff}%OFF</span> </pre>
         </p>

         <p className='align-self-center' onClick={deleteItem}>
         <i class="fa-solid fa-trash-can"></i>
         </p>
         </div> 
      </div>
      <hr/>
    </div>

  )
}

export default CartItem
