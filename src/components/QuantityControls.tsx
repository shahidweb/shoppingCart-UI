import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";
import { NotificationMsg } from "../shared/notification-modal";
import { toast } from "react-toastify";
import { tryCatch } from "../utils/apiHandler";

type QuantityControlsProps = {
  productId: number;
  initialQuantity?: number;
};

const QuantityControls: React.FC<QuantityControlsProps> = ({
  productId,
  initialQuantity = 0,
}) => {
  const auth = useSelector((state: RootState) => state.auth);
  const items = useSelector((state: RootState) => state.cart.items);

  const [quantity, setQuantity] = useState(initialQuantity);
  const [itemId, setItemId] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCart = async () => {
    const res = await tryCatch(() => api.get(URLEndPoint.cart));
    if (res) {
      dispatch(setCart(res.data));
    }
  };

  const handleAddToCart = async (isAdd = true) => {
    if (!auth.isLoggedIn) {
      navigate(URLEndPoint.login);
      toast.error(NotificationMsg.loginRequired);
      return;
    }
    const qty = isAdd ? quantity + 1 : quantity - 1;
    if (qty < 1) return;
    setQuantity(qty);
    const res = await tryCatch(() =>
      api.post(URLEndPoint.cart, { productId, quantity: qty })
    );
    res ? fetchCart() : navigate(URLEndPoint.login);
  };

  useEffect(() => {
    setQuantity(
      items.find((item) => item.product_id === productId)?.quantity || 0
    );
    setItemId(items.find((item) => item.product_id === productId)?.id || 0);
  }, [items, productId]);

  const removeItem = async () => {
    setQuantity(0);
    const res = await tryCatch(() =>
      api.delete(`${URLEndPoint.cart}/${itemId}`)
    );
    if (res) {
      fetchCart();
    }
  };

  return (
    <>
      {quantity > 0 ? (
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
              onClick={removeItem}
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
      ) : !auth.isAdmin ? (
        <button
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
          onClick={() => handleAddToCart()}
        >
          Add to Cart
        </button>
      ) : (
        <></>
      )}
    </>
  );
};

export default QuantityControls;
