import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../redux/store";
import { logout, setCredentials } from "../redux/slices/authSlice";
import { setCart } from "../redux/slices/cartSlice";
import { useEffect } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const users = {
      token: localStorage.getItem("token") || "",
      user:
        localStorage.getItem("user") &&
        localStorage.getItem("user") !== "undefined"
          ? JSON.parse(localStorage.getItem("user") || "{}")
          : null,
    };
    if (!users.token || !users.user) {
      handleLogout();
      return;
    }
    dispatch(setCredentials(users));
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCart([]));
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="font-bold text-lg">
        🛒 ShopKart
      </Link>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        {auth.user ? (
          <>
            <span className="text-sm">
              Hello,{" "}
              <span className="font-bold capitalize">{auth.user.username}</span>
            </span>
            <Link to="/cart" className="hover:underline">
              <ShoppingCartIcon className="inline-block w-6 h-6" />
              <span className="text-white text-xl font-bold">
                ({cart.length})
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="hover:underline text-red-300 cursor-pointer"
            >
              {/* Logout */}
              <ArrowLeftStartOnRectangleIcon className="h-8 text-red-300 rotate-180" />
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline">
              Login
            </Link>
            <Link to="/register" className="hover:underline">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
