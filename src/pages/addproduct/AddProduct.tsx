import React, { useState } from 'react'
import { IProduct } from '../../types/global.types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../constants/url.constants';
import "./addproduct.css"

const AddProduct = () => {
  const [products, setProducts] = useState<Partial<IProduct>>({brand:'',name:''})
  const redirect = useNavigate();

  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setProducts({...products, [event.target.name]:event.target.value})
  }

  
  const handleAdd = async (event:any) =>{
    event.preventDefault();
    if(products.name === '' || products.brand === '') {
      alert("Fill out given fields");
      return;
    }

    const data: Partial<IProduct> = {
      name: products.name,
      brand: products.brand
    }

    axios.post(baseUrl+"/productCreation", data)
      .then(() => redirect("/products", {state: {message : "Product has been added"}}))
      .catch((err) => console.log(err));
  }

  const handleBack = () => {
    redirect("/products");
  }

  return (
    <div style={{boxSizing: 'content-box', display: 'flex', justifyContent:'center', width: '100%'}}>
      <form className='flex-col' style={{width: '400px'}}>
        <label>Brand</label>
        <input type='text' name='brand' value={products.brand} onChange={handleChange} className='inputAddProduct'></input>
        <label>Name</label>
        <input type='text' name='name' value={products.name} onChange={handleChange} className='inputAddProduct'></input>
        <label>Image</label>
        <input type='file' accept='image/png, image/jpeg'></input>
        <div>
          
        </div>
        <div>
          <button onClick={handleAdd} className='buttonAddProduct'>Add</button>
          <button onClick={handleBack} className='buttonAddProduct'>Back</button>
        </div>
      </form>
    </div>
    
  )
}

export default AddProduct;