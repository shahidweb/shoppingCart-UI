import { HeartIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { calculateCartSummary } from "../shared/CartCal";
import { URLEndPoint } from "../shared/auth-modal";
import EmptyPage from "./EmptyPage";
import QuantityControls from "./QuantityControls";

function CartPage({ onPageChange }: { onPageChange: (page: number) => void }) {
  const carts = useSelector((state: RootState) => state.cart.items);
  const products = useSelector((state: RootState) => state.products.items);
  const dispatch = useDispatch();
  const [items, setItems] = useState<any[]>([]);

  const removeItem = async (id: number) => {
    await api.delete(`${URLEndPoint.cart}/${id}`);
    const res = await api.get(URLEndPoint.cart);
    dispatch(setCart(res.data));
  };

  useEffect(() => {
    const getCartItems = carts.map((cart) => {
      const product = products.find(
        (product) => product.id === cart.product_id
      );
      if (!product) return null;
      return {
        ...cart,
        ...product,
      };
    });
    setItems(getCartItems);
  }, [carts, products]);

  if (items.length === 0) {
    return (
      <EmptyPage
        text="Your Cart is Empty"
        description="Add products while you shop, so they'll be ready for checkout later."
      />
    );
  }

  const { subtotal, tax, delivery, savings, totalRounded } =
    calculateCartSummary(items);

  return (
    <div className="bg-gray-50 min-h-screen pt-6 md:px-12">
      <h1 className="text-2xl font-bold mb-6">Cart Items </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow-sm flex flex-col md:flex-row justify-between items-center"
            >
              {/* Image */}
              <div className="w-24 h-24 bg-gray-200 rounded mb-4 md:mb-0 md:mr-4">
                <img
                  src={item?.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Info */}
              <div className="flex-1">
                <Link
                  to={`${URLEndPoint.product}/${item.id}`}
                  className="mt-2 text-lg font-semibold text-blue-800 hover:underline"
                >
                  <h2 className="mt-2 font-bold text-lg">{item.name}</h2>
                </Link>
                <h2 className="text-sm">{item.description}</h2>

                <div className="flex items-center gap-4 text-sm mt-3 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-blue-600 cursor-pointer">
                    <HeartIcon className="w-4 h-4" />
                    Add to Favorites
                  </button>
                  <button
                    className="flex items-center gap-1 hover:text-red-600 cursor-pointer"
                    onClick={() => removeItem(item.id)}
                  >
                    <XMarkIcon className="w-4 h-4" />
                    Remove
                  </button>
                </div>
              </div>

              {/* Quantity */}
              <QuantityControls productId={item.product_id} />

              {/* Price */}
              <div className="text-lg font-bold mt-4 md:mt-0 md:ml-6 text-right w-30">
                ₹{item.price}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80">
          <div className="bg-white p-6 rounded shadow space-y-4">
            <h2 className="text-lg font-bold">Order summary</h2>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span>Original price</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>Savings</span>
                <span>-₹{savings}</span>
              </div>
              <div className="flex justify-between">
                <span>Store Pickup</span>
                <span>₹{delivery}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{tax}</span>
              </div>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalRounded.toLocaleString("en-IN")}.00</span>
            </div>
            <button
              onClick={() => onPageChange(2)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold cursor-pointer"
            >
              Proceed to Checkout
            </button>
            <Link
              to={URLEndPoint.home}
              className="text-sm text-blue-500 hover:underline text-center block cursor-pointer"
            >
              or Continue Shopping →
            </Link>
          </div>

          {/* Coupon Code */}
          <div className="bg-white p-6 rounded shadow mt-4 space-y-3">
            <p className="font-medium text-sm">
              Do you have a voucher or gift card?
            </p>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Enter code"
            />
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-semibold cursor-pointer">
              Apply Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
