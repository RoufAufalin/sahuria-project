import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/HomePage"
import OrderForm from "./pages/OrderForm"
import "./App.css"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pesan" element={<OrderForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
