import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.jsx"
import Home from "./pages/HomePage.jsx"
import OrderForm from "./pages/OrderForm.jsx"

createRoot(document.getElementById("root")).render(
  <StrictMode >
    <OrderForm/>
  </StrictMode>,
)
