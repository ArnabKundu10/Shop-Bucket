import axios from 'axios';
import "../css/home/home.css";
import "../css/navbar/nav.css";
import "../css/admin/admin.css";
import React, { useEffect, useState } from 'react'
import Grocery from "../assets/grocery.png"
import ProductDesc from '../components/product-dec';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
const Home = () => {
  const[allproducts,setProduct]=useState([]);
  const navigate=useNavigate();
  const latestTvs=allproducts?.filter((elem)=>elem?.category?.toUpperCase() ==="TV").slice(-8).reverse();
  console.log(latestTvs);
  useEffect(()=>{
    const fetchDetails=async()=>{
      try {
        const response=await axios.get("http://localhost:3000/auth/products");
        // console.log(response.data.data);
        setProduct(response.data.data); 
      } catch (error) {
        console.log(error)
      }
    }
   fetchDetails();
  },[])

  return (
    <main>
      {/* front page */}
      <section className='font-page vh-100 ps-5 pe-5' >
        <div className='d-md-flex'>
         <div className='w-50 align-self-center'>
          <p className='text-white fs-1 fw-900'>
            Get your most desirable products at cheapest price
          </p>
          <p className='text-white'>
            All of the groceries and accessories in one platform 
          </p>
          <p>
            <button onClick={()=>navigate("/category")} className='btn orange-main-btn'>
              Grab Big Deals
            </button>
          </p>
         </div>
         <div className='w-50 align-self-center'>
            <img src={Grocery} className='w-100' alt="grocery" />
          </div> 
        </div>
      </section>
      {/* electronics items */}
      <section className='electronics vh-100 ps-5 pe-5'>
       <p className='text-center fs-1 fw-900 blackish'>
         Get Latest Tv and Laptop   
       </p>
       <div className='d-flex flex-wrap justify-content-center'>
        {latestTvs?.map((elem,index)=>(
          <ProductDesc key={index} item={elem}/>
        ))}
       </div>
      </section>
      <Toaster/>
    </main>
  )
}

export default Home
