import axios from 'axios'
import React, { useEffect, useState } from 'react'
import "../css/cart/cart.css"
import { useAuth } from '../store/auth';
import CartItem from '../components/cartitem';

const Cart = () => {
  const[items,setItems]=useState([]);
  const {token}=useAuth();
  const [totalprice,setTotalPrice]=useState(0);
  const [sellprice,setSellPrice]=useState(0);
  const apiUrl = 
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://shop-bucket.vercel.app";
  const fetchDetails=async()=>{
    try {
      const response=await axios.get(`${apiUrl}/auth/view-items`,
        {
          headers:{
          'Authorization':token,
        }
      }
      );
      if(response.data.success){
        setItems(response.data.data);
        const allitems=response.data.data;
        let price1=0;
        let price2=0;
        for (let index = 0; index < allitems.length; index++) {
          price1+=(allitems[index]?.productId?.price)*(allitems[index]?.quantity);
          price2+=(allitems[index]?.productId?.sellingPrice)*(allitems[index]?.quantity);
        }
       console.log(price1,price2);
       setTotalPrice(price1);
       setSellPrice(price2);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const makeEmpty=async () => {
    setItems([]);
    setTotalPrice(0);
    setSellPrice(0);
  }
  useEffect(()=>{
    token?fetchDetails():makeEmpty();
  },[token])

  return (
    <div className='cart-items ps-5 pe-5'>
      <div className='d-md-flex w-100 justify-content-between pt-5'>
        {items.length>0?
      <div className='col-md-8 cart-design align-self-center'>
      {
       items?.map((elem,index)=>(
        <CartItem key={index} element={elem} setItems={setItems} totalprice={totalprice} setTotalPrice={setTotalPrice} sellprice={sellprice} setSellPrice={setSellPrice}/>
       ))
      }
     </div>
     :
     <div className='pt-5 mt-5 fw-900 fs-1 text-center col-md-8'>
        <p>There is no Items in the Cart.Shop now Folks!</p>
     </div>
      }

        <div className='col-md-3 price-set'>
            <p className='text-center fs-4 fw-900'>
            Price Details  
            </p> 
            <hr />
            <div className='d-flex justify-content-between opacity-less fw-bolder'>
            <p>Price</p>
            <p>&#8377;{sellprice}</p>
            </div>
            <div className='d-flex justify-content-between opacity-less fw-bolder'>
            <p>Discount</p>
            <p>&#8377;{sellprice-totalprice}</p>
            </div>
            <div className='d-flex justify-content-between opacity-less fw-bolder'>
            <p>Delivery Charges</p>
            <p><span className='text-cut'>&#8377;80</span> Free</p>
           </div>
           <hr />
           <div className='d-flex justify-content-between fs-5 fw-bolder'>
            <p>Total Price</p>
            <p>&#8377;{totalprice}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
