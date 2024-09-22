import React, { useState,useEffect } from 'react'
import "../css/navbar/nav.css"
import "../css/admin/admin.css";
// import {Link} from 'react-router-dom'
// import { useAuth } from '../store/auth';
import { Checkbox, Radio } from "antd";
import { Prices } from '../components/prices';
import { Categories } from '../components/categories';
import ProductDesc from '../components/product-dec';
import axios from 'axios';
import { checkAuth } from '../store/checked';
const Category = () => {
  const [products, setProducts] = useState([]);
   const {checked,setChecked}=checkAuth();
   const [radio, setRadio] = useState([]);
   const [checkedValues, setCheckedValues] = useState(
    () => JSON.parse(localStorage.getItem('checkedValues')) || {}
  );

  const handleFilter = (value, name) => {
    let all = [...checked];
    if (value) {
      all.push(name);
    } else {
      all = all.filter((c) => c !== name);
    }
    // console.log(all);
    setChecked(all);
    const updatedValues = {
      ...checkedValues,
      [name]: value,
    };
    setCheckedValues(updatedValues);
    localStorage.setItem('checkedValues', JSON.stringify(updatedValues));
  };
  useEffect(() => {
   filterProduct();
  }, [checked,radio]);

  React.useEffect(() => {

    filterProduct();
   }, []);

  //get filterd product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:3000/auth/product/filter", {
        checked,
        radio,
      });
      console.log(data);
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='position-relative filter-panel pt-5'>
      
    <div className='position-fixed filter-bar col-md-2 pt-5 ps-2 pe-2'>
    <div className="filters">
    <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
      Filter By Category
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
      <div class="accordion-body">
      <div className="d-flex flex-column">
            {Categories?.map((c) => (
              <Checkbox
                key={c._id} checked={checkedValues[c.name] || false}
                onChange={(e) => handleFilter(e.target.checked, c.name)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
        Filter By Price
      </button>
    </h2>
    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
      <div class="accordion-body">
      <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
      </div>
    </div>
  </div>
</div>    
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger"
              onClick={() => {window.location.reload();localStorage.removeItem("checkedValues")}}
            >
              RESET FILTERS
            </button>
          </div>
        </div>
    </div>
    <div className='position-relative col-md-10 filter-product ms-0 me-0 pt-5'>
    <div className='d-flex flex-wrap justify-content-center'>
        {products?.map((elem,index)=>(
          <ProductDesc key={index} item={elem}/>
        ))}
       </div>
    </div>
  </div>
  )
}

export default Category
