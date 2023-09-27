import { IProduct } from "../../types/global.types";
import { useState, useEffect } from "react";
import "./products.scss";
import axios from "axios";
import { baseUrl } from "../../constants/url.constants";


const Products:React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const getProductsList = async () => {
    try {
      console.log(baseUrl+"/api/Products");
      const response = await axios.get<IProduct[]>(baseUrl+"/api/Products");
      setProducts(response.data);

    } catch (err) {
      alert("An errors occured");
      console.error(err);
    }
  }
  useEffect(() => {
    console.log("runs");
    getProductsList();
  }, []);

  return (
    <div className="products">
      <h1> Products List</h1>
      {products.map((product: IProduct) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  )
}

export default Products