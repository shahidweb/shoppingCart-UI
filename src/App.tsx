import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;