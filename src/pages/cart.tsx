import { useState } from "react";
import CartPage from "../components/CartPage";
import Checkout from "../components/Checkout";
import OrderSuccess from "../components/OrderSuccess";

const Cart = () => {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <>
      {currentPage === 1 && <CartPage onPageChange={setCurrentPage} />}
      {currentPage === 2 && <Checkout onPageChange={setCurrentPage} />}
      {currentPage === 3 && <OrderSuccess />}
    </>
  );
};

export default Cart;
