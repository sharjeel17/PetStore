import React, { useState } from 'react'
import { IProduct } from '../../types/global.types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../constants/url.constants';

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
    <form>
      <label>Brand</label>
      <input type='text' name='brand' value={products.brand} onChange={handleChange}></input>
      <label>Name</label>
      <input type='text' name='name' value={products.name} onChange={handleChange}></input>
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleBack}>Back</button>
      <div>{products.brand}</div>
      <div>{products.name}</div>
    </form>
  )
}

export default AddProduct;