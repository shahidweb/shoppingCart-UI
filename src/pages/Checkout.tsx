import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { useAuthRedirect } from "../hooks/useAuthRedirect";

const Checkout = () => {
  useAuthRedirect();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");


  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      const res = await api.post("/orders", {
        address,
        card,
        total,
        items,
      });
      console.log(res)

      toast.success("Order placed successfully");
      dispatch(clearCart());
      localStorage.setItem("orderSuccess", "true");
      navigate("/order-success");
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Shipping Address</label>
          <textarea
            required
            className="w-full border px-4 py-2 rounded"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Card Number</label>
          <input
            type="text"
            required
            className="w-full border px-4 py-2 rounded"
            placeholder="**** **** **** 1234"
            value={card}
            onChange={(e) => setCard(e.target.value)}
          />
        </div>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
