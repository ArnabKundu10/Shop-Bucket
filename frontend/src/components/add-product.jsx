import React, { useState } from 'react'
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast"
const AddProduct = () => {
const [product,setProduct]=useState({
    productName: "",
    brandName: "",
    category: "tv",
    productImage: "",
    description: "",
    price: "",
    sellingPrice: ""
   });
   const [image,setImage]=useState("");
   const imageUpload=(e)=>{
      setImage(e.target.files[0]);
   }
const handleChange=(e)=>{
   try {
      e.preventDefault();
     setProduct({...product,[e.target.name]:e.target.value});
   } catch (error) {
      toast.error(error);
   }
   
}
const handleSubmit=async(e)=>{
   try {
      e.preventDefault();
      let formdata=new FormData();
      formdata.append("product",image);
      console.log(formdata);
      const resp=await axios.post("https://shop-bucket.vercel.app/auth/image-upload",formdata);

      if(resp.data.success){
         const tempProduct=product;
         tempProduct.productImage=resp.data.image_url;
         const response = await axios.post('https://shop-bucket.vercel.app/auth/products-upload', tempProduct);
         console.log(response);
         e.target.reset();
         setImage("");
         setProduct(
            {
               productName: "",
               brandName: "",
               category: "tv",
               productImage: "",
               description: "",  
               price: "",
               sellingPrice: ""
            }
         )
      }
      toast.success("Product is added");
   } catch (error) {
       toast.error(error);
   }
}



  return (
    <div className='position-relative col-md-10 add-product p-5'>
      <p className='text-center fs-1 fw-bolder '>
         Create a Product
      </p>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
         <label htmlFor="exampleFormControlInput1" className="form-label">Product Name:</label>
         <input onChange={handleChange} value={product.productName} type="text" className="form-control" name='productName' id="exampleFormControlInput1" placeholder="add product"/>
      </div>
      <div className="mb-3">
         <label htmlFor="exampleFormControlInput1" className="form-label">Brand Name:</label>
         <input type="text" onChange={handleChange} value={product.brandName} className="form-control"  id="exampleFormControlInput2" name='brandName' placeholder="add product"/>
      </div>
      <select name='category' onChange={handleChange} value={product.category} className="form-select" aria-label="Default select example">
         <option value="tv">tv</option>
         <option value="camera">camera</option>
         <option value="earphone">earphone</option>
         <option value="shoe">shoe</option>
         <option value="mobile">mobile</option>
         <option value="watch">watch</option>
         <option value="laptop">laptop</option>
         <option value="dress">dress</option>
      </select>
      <div className="mb-3">
         <label htmlFor="exampleFormControlInput1" className="form-label">Description:</label>
         <input type="text" name='description' className="form-control" value={product.description} onChange={handleChange}id="exampleFormControlInput3" placeholder="add product"/>
      </div>
      <div className="mb-3">
         <label htmlFor="exampleFormControlInput1" className="form-label">Price:</label>
         <input type="text" name='price' className="form-control" onChange={handleChange} value={product.price} id="exampleFormControlInput4" placeholder="add product"/>
      </div>
      <div className="mb-3">
         <label htmlFor="exampleFormControlInput1" className="form-label">Selling Price:</label>
         <input type="text" name='sellingPrice' className="form-control" onChange={handleChange} value={product.sellingPrice} id="exampleFormControlInput5" placeholder="add product"/>
      </div>
      <div class="mb-3">
         <label htmlFor="formFile" name='productName' class="form-label">Upload Photo</label>
         <input class="form-control"  onChange={imageUpload} type="file" id="formFile"/>
      </div>
      <div className='col-md-2'>
         <img className='w-100' src={image && URL.createObjectURL(image)} alt="" />
      </div>
      <div class="d-grid gap-2 col-6 mx-auto">
          <button class="btn orange-btn" type="submit">submit</button>
     </div>
      </form>
      <Toaster/>
    </div>
  )
}

export default AddProduct
