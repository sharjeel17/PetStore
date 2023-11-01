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
    const [updatedProduct, setUpdatedProduct] = useState<Partial<IProduct>>({animal: selectedProduct.animal,
                                                                            name: selectedProduct.name});
    const redirect = useNavigate();
    
    const handleUpdate = async () => {
        if(updatedProduct.name === '' || updatedProduct.animal === '') {
            alert("Fill out given fields");
            return;
          }
      
          const data: Partial<IProduct> = {
            name: updatedProduct.name,
            animal: updatedProduct.animal
          }
      
          axios.put(baseUrl+`/${selectedProduct.id}`, data)
            .then(() => redirect("/products", {state: {message : "Product has been updated"}}))
            .catch((err) => console.log(err));
    }

  return (
    <div className='editModalContainer' onClick={closeIcon}>
        <div className="innerContainer" onClick={e => e.stopPropagation()}>
            <p className='closeIcon' onClick={closeIcon}>X</p>
            <h2 style={{textAlign: 'center', margin: '10px'}}>Edit product</h2>
            <div style={{height: '100%', boxSizing: 'content-box'}}>
                <form className='editModalForm'>
                    <label>Name</label>
                    <input className='inputEditModal ' type='text' value={updatedProduct.name} onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                    <label>Animal</label>
                    <input className='inputEditModal ' type='text' value={updatedProduct.animal} onChange={(e) => setUpdatedProduct({...updatedProduct, animal: e.target.value})}/>
                    <button className='buttonSave' onClick={handleUpdate}>Save</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditModal;