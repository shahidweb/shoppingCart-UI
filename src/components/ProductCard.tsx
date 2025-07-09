import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { URLEndPoint } from "../shared/routeNames";
import { Message } from "../shared/alertMessage";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
}

const ProductCard = ({ id, name, price, image, description }: ProductProps) => {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const auth = useSelector((state: RootState) => state.auth);
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState(0);
  const navigate = useNavigate();

  const handleAddToCart = async (isAdd = true) => {
    if (!auth.isLoggedIn) {
      navigate(URLEndPoint.login);
      alert(Message.loginRequired);
      return;
    }
    const qty = isAdd ? quantity + 1 : quantity - 1;
    setQuantity(qty);
    try {
      await api.post(URLEndPoint.cart, {
        productId: id,
        quantity: qty ? qty : 1,
      });
      fetchCart();
    } catch (err) {
      navigate(URLEndPoint.login);
      alert(Message.loginRequired);
    }
  };

  const removeItem = async () => {
    await api.delete(`${URLEndPoint.cart}/${productId}`);
    fetchCart();
  };

  const fetchCart = async () => {
    const res = await api.get(URLEndPoint.cart);
    dispatch(setCart(res.data));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    setQuantity(items.find((item) => item.product_id === id)?.quantity || 0);
    setProductId(items.find((item) => item.product_id === id)?.id || 0);
  }, [items]);

  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
      <img
        src={image || "https://via.placeholder.com/200"}
        alt={name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="mt-2 font-bold text-lg">{name}</h2>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-1 text-blue-600 font-semibold">₹{price}</p>

      {/* Quantity Controls */}
      {quantity > 0 && (
        <div className="flex items-center gap-2 my-2">
          {quantity > 1 ? (
            <button
              onClick={() => handleAddToCart(false)}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              <MinusIcon className="w-5 h-5 text-gray-700" />
            </button>
          ) : (
            <button
              onClick={() => removeItem()}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
            >
              <TrashIcon className="w-5 h-5 text-gray-700" />
            </button>
          )}

          <span className="px-2">{quantity}</span>
          <button
            onClick={() => handleAddToCart()}
            className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            <PlusIcon className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      )}

      {!quantity && (
        <button
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          onClick={() => handleAddToCart()}
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
