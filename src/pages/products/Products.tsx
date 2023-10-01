import { IProduct } from "../../types/global.types";
import { useState, useEffect } from "react";
import "./products.scss";
import axios from "axios";
import { baseUrl } from "../../constants/url.constants";
import { Button } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";


const Products:React.FC = () => {
  console.log("runs");
  const [products, setProducts] = useState<IProduct[]>([]);
  const redirect = useNavigate();
  const location = useLocation();
  console.log(location);
  const getProductsList = async () => {
    try {
      const response = await axios.get<IProduct[]>(baseUrl+"/api/Products");
      setProducts(response.data);
      if(location?.state){
        alert(location.state.message);
        redirect(location.pathname, {replace: true});
      }

    } catch (err) {
      alert("An error occured");
      console.error(err);
    }
  }
  useEffect(() => {
    getProductsList();
  }, []);

  return (
    <div className="products">
      <h1> Products List</h1>
      {
        products.length == 0 ? (<h1>No products</h1>) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Modified</th>
                  <th>Operations</th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map(product => (
                    <tr key={product.id}>
                      <td>{product.brand}</td>
                      <td>{product.name}</td>
                      <td>{moment(product.createdAt).fromNow()}</td>
                      <td>{moment(product.updatedAt).fromNow()}</td>
                      <Button variant="outlined" color="warning" sx={{mx:3}}><Edit/></Button>
                      <Button variant="outlined" color="warning"><Delete/></Button>
                    </tr>
                  ))
                }
              </tbody>
            </table>

          </div>
        )
      }
    </div>
  )
}

export default Products