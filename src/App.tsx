import Home from "./pages/home/Home.tsx";
import Navbar from "./components/navbar"
import "./index.scss"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

function App() {
  
  return (
    <Router>
      {/* NAVBAR */}
      {/* This will not change as it is above routes */}
      <Navbar />

      {/* WRAPPER */}
      <Routes>
        <Route path="/" element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App
