import { useState } from 'react'
import "./editmodal.css";
import { IProduct } from '../../types/global.types';
import axios from 'axios';
import { baseUrl } from '../../constants/url.constants';
import { useNavigate } from 'react-router-dom';

type Props = {
    selectedProduct: IProduct;
    closeIcon: () => void;
}
const EditModal = ({selectedProduct, closeIcon}: Props) => {
    const [updatedProduct, setUpdatedProduct] = useState<Partial<IProduct>>({brand: selectedProduct.brand,
                                                                            name: selectedProduct.name});
    const redirect = useNavigate();
    const handleUpdate = async () => {
        if(updatedProduct.name === '' || updatedProduct.brand === '') {
            alert("Fill out given fields");
            return;
          }
      
          const data: Partial<IProduct> = {
            name: updatedProduct.name,
            brand: updatedProduct.brand
          }
      
          axios.put(baseUrl+`/${selectedProduct.id}`, data)
            .then(() => redirect("/products", {state: {message : "Product has been updated"}}))
            .catch((err) => console.log(err));
    }

  return (
    <div className='editModalContainer'>
        <div className="innerContainer">
            <p className='closeIcon' onClick={closeIcon}>X</p>
            <h2 style={{textAlign: 'center', margin: '10px'}}>Edit product</h2>
            <div style={{height: '100%', boxSizing: 'content-box'}}>
                <form className='editModalForm'>
                    <label>Name</label>
                    <input className='inputEditModal ' type='text' value={updatedProduct.name} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                    <label>Brand</label>
                    <input className='inputEditModal ' type='text' value={updatedProduct.brand} onChange={(e) => setUpdatedProduct({...updatedProduct, brand: e.target.value})}/>
                    <button className='buttonSave' onClick={handleUpdate}>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditModal;