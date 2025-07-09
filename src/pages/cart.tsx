import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { setCart } from "../redux/slices/cartSlice";
import api from "../services/api";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const fetchCart = async () => {
    const res = await api.get("/cart");
    dispatch(setCart(res.data));
  };

  const removeItem = async (id: number) => {
    await api.delete(`/cart/${id}`);
    fetchCart();
  };

  const updateQuantity = async (productId: number, newQty: number) => {
    if (newQty < 1) return;
    await api.post("/cart", { productId, quantity: newQty });
    fetchCart();
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow p-4 rounded"
            >
              <div className="flex flex-col">
                <h2 className="font-bold">{item.name}</h2>
                <p className="text-gray-600">₹{item.price} x {item.quantity} = ₹{item.price * item.quantity}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <MinusIcon className="w-5 h-5 text-gray-700" />
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <PlusIcon className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <button
                className="text-red-500 hover:underline"
                onClick={() => removeItem(item.id)}
              >
                <TrashIcon className="w-5 h-5 cursor-pointer text-red" />
              </button>
            </div>
          ))}

          {/* Checkout Section */}
          <div className="flex justify-between items-center pt-4 border-t mt-4">
            <h2 className="font-bold text-xl">Total: ₹{total.toFixed(2)}</h2>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
