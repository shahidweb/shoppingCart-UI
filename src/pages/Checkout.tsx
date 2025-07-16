import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthRedirect } from "../hooks/useAuthRedirect";
import { clearCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { calculateCartSummary } from "../shared/CartCal";
import { isValidExpiry } from "../shared/common-methods";
import { URLEndPoint } from "../shared/auth-modal";
import { NotificationMsg } from "../shared/notification-modal";

const Checkout = () => {
  useAuthRedirect();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);
  const [address, setAddress] = useState("");
  const [card, setCard] = useState("");
  const [isMasked, setIsMasked] = useState(false);
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cvvVisible, setCvvVisible] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (card.length !== 16) {
      toast.error(NotificationMsg.cardLength);
      return;
    }

    if (cvv.length < 3 || cvv.length > 4) {
      toast.error(NotificationMsg.invalidCred);
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      toast.error(NotificationMsg.invalidFormated);
      return;
    }

    if (!isValidExpiry(expiry)) {
      toast.error(NotificationMsg.invalidExpiry);
      return;
    }

    try {
      const { totalRounded } = calculateCartSummary(cart);
      const items = cart.map((item) => ({
        productId: item.product_id,
        itemId: item.id,
        quantity: item.quantity,
        price: item.price,
      }));
      await api.post(URLEndPoint.orders, {
        address,
        card,
        total: totalRounded,
        items,
      });

      toast.success(NotificationMsg.orderSuccess);
      dispatch(clearCart());
      localStorage.setItem("orderSuccess", "true");
      navigate(URLEndPoint.orderSuccess);
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  const getMaskedCard = () => {
    const visible = card.slice(12);
    const masked =
      card.length > 12 ? "•".repeat(12) + visible : "•".repeat(card.length);
    return masked.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= 16) {
      setCard(digits);
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
    setExpiry(value);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4); // some cards use 4-digit CVV
    setCvv(value);
  };

  const getCardType = (number: string) => {
    const cleaned = number.replace(/\D/g, "");

    if (/^4/.test(cleaned)) return "Visa";
    if (/^5[1-5]/.test(cleaned)) return "MasterCard";
    if (/^3[47]/.test(cleaned)) return "American Express";
    if (/^6(?:011|5)/.test(cleaned)) return "Discover";
    return "";
  };
  const cardType = getCardType(card);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      <form onSubmit={handleCheckout} className="space-y-4" autoComplete="off">
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
            inputMode="numeric"
            maxLength={19}
            value={isMasked ? getMaskedCard() : card}
            onChange={handleInputChange}
            onBlur={() => setIsMasked(true)}
            onFocus={() => setIsMasked(false)}
            placeholder="**** **** **** 3456"
            className="w-full border px-4 py-2 rounded tracking-widest"
          />
          {cardType && (
            <>
              <div className="mt-2 text-sm text-gray-600">
                <span className="font-medium">{cardType}</span>
              </div>
              {/* <img
                src={`/icons/${cardType.toLowerCase()}.png`}
                alt={cardType}
              /> */}
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Expiry (MM/YY)
            </label>
            <input
              type="text"
              value={expiry}
              onChange={handleExpiryChange}
              placeholder="MM/YY"
              className="w-full border px-4 py-2 rounded"
              autoComplete="off"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">CVV</label>
            <input
              type={cvvVisible ? "text" : "password"}
              value={cvv}
              onChange={handleCvvChange}
              placeholder="CVV"
              className="w-full border px-4 py-2 rounded pr-10"
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setCvvVisible(!cvvVisible)}
              className="absolute right-2 top-9 text-sm cursor-pointer"
            >
              {cvvVisible ? (
                <EyeSlashIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
        <button className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white py-2 rounded">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
