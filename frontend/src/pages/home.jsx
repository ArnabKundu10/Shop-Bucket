import axios from 'axios';
import "../css/home/home.css";
import "../css/navbar/nav.css";
import "../css/admin/admin.css";
import React, { useEffect, useState } from 'react'
import Grocery from "../assets/grocery.png"
import ProductDesc from '../components/product-dec';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Footer from '../components/footer';
const Home = () => {
  const[allproducts,setProduct]=useState([]);
  const navigate=useNavigate();
  const latestTvs=allproducts?.filter((elem)=>elem?.category?.toUpperCase() ==="TV").slice(-8).reverse();
  const latestCameras=allproducts?.filter((elem)=>elem?.category?.toUpperCase() ==="CAMERA").slice(-4).reverse();
  const latestMobiles=allproducts?.filter((elem)=>elem?.category?.toUpperCase() ==="MOBILE").slice(-4).reverse();
  const latestWatches=allproducts?.filter((elem)=>elem?.category?.toUpperCase() ==="WATCH").slice(-4).reverse();
  const apiUrl = 
  window.location.hostname === "localhost"
    ? "http://localhost:3000"
    : "https://shop-bucket.vercel.app";
  useEffect(()=>{
    const fetchDetails=async()=>{
      try {
        const response=await axios.get(`${apiUrl}/auth/products`);
        setProduct(response.data.data); 
      } catch (error) {
        console.log(error)
      }
    }
   fetchDetails();
  },[])

  return (
    <>
    
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
      <section className='camera bg-blackish vh-100 pt-5 ps-5 pe-5'>
       <p className='text-center text-white fs-1 fw-900 blackish'>
         Brand New Cameras With Extra Features   
       </p>
       <p className='text-center text-white opacity-less fw-bolder blackish'>
         Top brand's products at your hand with upto 60% discount  
       </p>
       <div className='d-flex flex-wrap justify-content-center'>
        {latestCameras?.map((elem,index)=>(
          <ProductDesc key={index} item={elem}/>
        ))}
       </div>
      </section>
      {/* cameras.................*/}
      <section className='electronics pt-5 ps-5 pe-5 pb-5'>
       <p className='text-center fs-1 fw-900 blackish'>
         Get Latest Tv and Laptop at Minimum Price  
       </p>
       <p className='text-center opacity-less fw-bolder blackish'>
         Top brand's products at your hand with upto 60% discount  
       </p>
       <div className='d-flex flex-wrap justify-content-center'>
        {latestTvs?.map((elem,index)=>(
          <ProductDesc key={index} item={elem}/>
        ))}
       </div>
      </section>
      {/* watches and cameras.................*/}
      <section className='bg-blackish electronics ps-5 pe-5'>
        <div className='vh-75 d-flex'>
          <div className='w-50 d-flex flex-column align-self-center align-items-center'>
          <p className='text-center text-white fs-1 fw-900 blackish'>
         Trending Watches from emerging brands under &#8377;20000 
          </p>
       <p className='text-center text-white opacity-less fw-bolder blackish'>
         Top brand's products at your hand with upto 60% discount  
         </p>
          </div>
        
       <div className='d-flex w-50 flex-wrap justify-content-center align-self-center align-items-center'>
        {latestWatches?.map((elem,index)=>(
          <ProductDesc key={index} item={elem} doubleWidth="double"/>
        ))}
       </div>
      </div>
       
      </section>
      <section className='bg-blackish electronics ps-5 pe-5'>
        <div className='vh-75 d-flex'>
        <div className='d-flex w-50 flex-wrap justify-content-center align-self-center align-items-center'>
        {latestCameras?.map((elem,index)=>(
          <ProductDesc key={index} item={elem} doubleWidth="double"/>
        ))}
       </div>
          <div className='w-50 d-flex flex-column align-self-center align-items-center'>
          <p className='text-center text-white fs-1 fw-900 blackish'>
         Best selling Cameras from top brands Under 1 lack Only 
          </p>
       <p className='text-center text-white opacity-less fw-bolder blackish'>
         Top brand's products at your hand with upto 50% discount  
         </p>
          </div>
      </div>
       
      </section>
      <section className='electronics pt-5 ps-5 pe-5 pb-5'>
       <p className='text-center fs-1 fw-900 blackish'>
         Get Latest Mobile at Minimum Price  
       </p>
       <p className='text-center opacity-less fw-bolder blackish'>
         Top brand's products at your hand with upto 40% discount  
       </p>
       <div className='d-flex flex-wrap justify-content-center'>
        {latestMobiles?.map((elem,index)=>(
          <ProductDesc key={index} item={elem}/>
        ))}
       </div>
      </section>
      <section className='camera bg-blackish vh-100 pt-5 ps-5 pe-5'>
       <p className='text-center text-white fs-1 fw-900 blackish'>
         Brand New Watches With Extra Features   
       </p>
       <p className='text-center text-white opacity-less fw-bolder blackish'>
         Top brand's products at your hand with upto 60% discount  
       </p>
       <div className='d-flex flex-wrap justify-content-center'>
        {latestWatches?.map((elem,index)=>(
          <ProductDesc key={index} item={elem}/>
        ))}
       </div>
      </section>
      <Toaster/>
    </main>
      <Footer/>
      </>
  )
}

export default Home
