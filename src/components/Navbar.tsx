import {
  ArrowLeftStartOnRectangleIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { logout, setCredentials } from "../redux/slices/authSlice";
import { setCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store";
import { AuthStorageKeys, URLEndPoint } from "../shared/auth-modal";
import { NotificationMsg } from "../shared/notification-modal";
import { useWishlist } from "../hooks/useWish";
import NotificationBadge from "./NotificationBadge";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart.items);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useProducts();
  useCart();
  useWishlist();

  useEffect(() => {
    const users = {
      token: localStorage.getItem(AuthStorageKeys.token) || "",
      user:
        localStorage.getItem(AuthStorageKeys.user) &&
        localStorage.getItem(AuthStorageKeys.user) !== "undefined"
          ? JSON.parse(localStorage.getItem(AuthStorageKeys.user) || "{}")
          : null,
    };
    if (!(users.token || users.user)) return;
    dispatch(setCredentials(users));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCart([]));
    localStorage.clear();
    toast.success(NotificationMsg.logOutSuccess);
    navigate(URLEndPoint.login);
  };

  return (
    <nav className="bg-gray-800 text-white px-8 py-5 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link to={URLEndPoint.home} className="font-bold text-lg">
          🛒 ShopKart
        </Link>
        <div className="space-x-4 flex items-center">
          <Link to={URLEndPoint.home} className="hover:underline">
            Home
          </Link>
          {auth.isLoggedIn ? (
            <>
              <span className="text-md">
                Hello,{" "}
                <span className="font-bold capitalize">
                  {auth.user.username}
                </span>
              </span>
              <Link to={URLEndPoint.ordersHistory} className="hover:underline">
                Orders
              </Link>
              <Link to={URLEndPoint.cart} className="hover:underline">
                <NotificationBadge
                  icon={<ShoppingCartIcon className="inline-block w-6 h-6" />}
                  count={cart.length}
                />
              </Link>
              <Link to={URLEndPoint.wishlist} className="hover:underline">
                <NotificationBadge
                  icon={<HeartIcon className="inline-block w-6 h-6" />}
                  count={wishlist.length}
                />
              </Link>
              <button
                onClick={() => handleLogout()}
                className="hover:underline text-red-300 cursor-pointer"
              >
                {/* Logout */}
                <ArrowLeftStartOnRectangleIcon className="h-8 text-red-300 rotate-180" />
              </button>
            </>
          ) : (
            <>
              <Link to={URLEndPoint.login} className="hover:underline">
                <button
                  type="button"
                  className="bg-white text-blue-700 font-medium rounded-lg text-sm px-5 py-2 cursor-pointer"
                >
                  Login
                </button>
              </Link>
              <Link to={URLEndPoint.register} className="hover:underline">
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-medium cursor-pointer text-white
                  rounded-lg border border-gray-200 "
                >
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
