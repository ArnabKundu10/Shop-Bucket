import React from 'react'
import "../css/navbar/nav.css"
import "../css/admin/admin.css";
import { Outlet,Link,Navigate } from 'react-router-dom'
import { useAuth } from '../store/auth';
const AdminPanel = () => {
   const {userdetails}=useAuth();
  return (
    <div className='position-relative admin-panel pt-5'>
      
      <div className='position-fixed sidebar col-md-2 pt-2'>
      <div className='text-center pt-4'>
             <p className='text-white orange-bg fs-2 letter-logo rounded-circle'>{userdetails?userdetails.name.substring(0,1).toUpperCase():""}</p>
             <p className='orange fw-500 fs-5'>{userdetails?userdetails.name.toUpperCase():""}</p> 
      </div>
      <div className='d-flex text-center flex-column h-50 align-items-center justify-content-center'>
      <div className="panel-option w-100 p-2 fs-5">
         <button className='btn'>
          <Link className='panel-item' to="add-product">Add Product</Link>
         </button>
         </div>
       <div className="panel-option w-100 fs-5">
       <button className='btn'>
          <Link className='panel-item' to="users">All Users</Link>
         </button>
       </div>
       <div className="panel-option w-100 p-2 fs-5">
        <button className='btn'>
          <Link className='panel-item' to="add-product">Product Statistics</Link>
         </button>
       </div>
      </div>
       
      </div>
      <Outlet/>
    </div>
  )
}

export default AdminPanel 