import Home from "./pages/home/Home.tsx";
import Navbar from "./components/navbar/Navbar.tsx"
import "./index.scss"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Products from "./pages/products/Products.tsx";

function App() {
  
  return (
    <Router>
      {/* NAVBAR */}
      {/* This will not change as it is above routes */}
      <Navbar />

      {/* WRAPPER */}
      <Routes>
        <Route path="/" element={<Home />}/>
        {/* NESTED ROUTE */}
        <Route path="/products">
          <Route index element={<Products />}/>
        </Route>
      </Routes>
      
    </Router>
  )
}

export default App
