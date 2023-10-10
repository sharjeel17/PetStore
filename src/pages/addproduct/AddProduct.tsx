import React, { useState } from 'react'
import { IProduct } from '../../types/global.types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../constants/url.constants';
import "./addproduct.css"
import defaultImage from "../../assets/default.png";


const AddProduct = () => {
  const redirect = useNavigate();

  const [products, setProducts] = useState<Partial<IProduct>>({
    animal:'',
    name:'',
    breed: '', 
    imageSrc: defaultImage,
    imageFile: null
  });

  const handleBack = () => {
    redirect("/products");
  }
  const handleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setProducts({...products, [event.target.name]:event.target.value})
  }

  const imagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files && e.target.files[0]){
      let imageFile: File = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setProducts({
          ...products,
          imageFile,
          imageSrc: x.target?.result
        })
      }
      reader.readAsDataURL(imageFile);
    }
  }
  
  const handleAdd = async (event:any) =>{
    event.preventDefault();

    if(products.name === '' || products.animal === '' || products.breed === '' || products.imageFile === null) {
      alert("Fill out given fields");
      return;
    }

    // const data: Partial<IProduct> = {
    //   name: products.name,
    //   animal: products.animal,
    // }

    const formData = new FormData();
    formData.append('name', products.name as string);
    formData.append('animal', products.animal as string);
    formData.append('breed', products.breed as string);
    formData.append('image', products.imageFile as File);

    axios.post(baseUrl+"/Products/productCreation", formData)
      .then(() => redirect("/products", {state: {message : "Product has been added"}}))
      .catch((err) => console.log(err));
  }

  return (
    <div style={{boxSizing: 'content-box', display: 'flex', justifyContent:'center', width: '100%'}}>
      <form className='flex-col' autoComplete='off' style={{width: '400px'}}>
        <label>Animal</label>
        <input type='text' name='animal' value={products.animal} onChange={handleChange} className='inputAddProduct'></input>
        <label>Name</label>
        <input type='text' name='name' value={products.name} onChange={handleChange} className='inputAddProduct'></input>
        <label>Breed</label>
        <input type='text' name='breed' value={products.breed} onChange={handleChange} className='inputAddProduct'></input>
        <label>Image</label>
        <input type='file' accept='image/png, image/jpeg' onChange={imagePreview}></input>
        <div style={{width: '250px'}}>
          <img style={{maxWidth: '250px', maxHeight: '300px'}} src={products.imageSrc as string}/>
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