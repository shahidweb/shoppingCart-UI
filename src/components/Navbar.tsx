import {
  ArrowLeftStartOnRectangleIcon,
  HeartIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../hooks/useCart";
import { useProducts } from "../hooks/useProducts";
import { useWishlist } from "../hooks/useWish";
import { logout } from "../redux/slices/authSlice";
import { setCart } from "../redux/slices/cartSlice";
import { clearOrders } from "../redux/slices/orderAdminSlice";
import { clearProduct } from "../redux/slices/productSlice";
import { clearWishlist } from "../redux/slices/wishSlice";
import type { RootState } from "../redux/store";
import { URLEndPoint } from "../shared/auth-modal";
import { NotificationMsg } from "../shared/notification-modal";
import NotificationBadge from "./NotificationBadge";

const Navbar = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const cart = useSelector((state: RootState) => state.cart.items);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useCart();
  useWishlist();
  useProducts();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(setCart([]));
    dispatch(clearProduct());
    dispatch(clearWishlist());
    dispatch(clearOrders());
    localStorage.clear();
    navigate(URLEndPoint.login);
    toast.success(NotificationMsg.logOutSuccess);
  };

  return (
    <nav className="bg-gray-800 text-white px-8 py-5 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <NavLink
          to={URLEndPoint.home}
          className={({ isActive }) =>
            `font-bold text-lg ${isActive ? "font-bold" : ""}`
          }
        >
          🛒 ShopKart
        </NavLink>
        <div className="space-x-4 flex items-center">
          <NavLink
            to={URLEndPoint.home}
            className={({ isActive }) =>
              `hover:underline ${isActive ? "font-bold" : ""}`
            }
          >
            Home
          </NavLink>
          {auth.isLoggedIn ? (
            <>
              {!auth.isAdmin ? (
                <>
                  <span className="text-md">
                    Hello,{" "}
                    <span className="font-bold capitalize">
                      {auth.user?.username}
                    </span>
                  </span>
                  <NavLink
                    to={URLEndPoint.ordersHistory}
                    className={({ isActive }) =>
                      `hover:underline ${isActive ? "font-bold" : ""}`
                    }
                  >
                    Orders
                  </NavLink>
                  <NavLink
                    to={URLEndPoint.cart}
                    className={({ isActive }) =>
                      `hover:underline ${isActive ? "font-bold" : ""}`
                    }
                  >
                    <NotificationBadge
                      icon={
                        <ShoppingCartIcon className="inline-block w-6 h-6" />
                      }
                      count={cart.length}
                    />
                  </NavLink>
                  <NavLink
                    to={URLEndPoint.wishlist}
                    className={({ isActive }) =>
                      `hover:underline ${isActive ? "font-bold" : ""}`
                    }
                  >
                    <NotificationBadge
                      icon={<HeartIcon className="inline-block w-6 h-6" />}
                      count={wishlist.length}
                    />
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    to={URLEndPoint.adminProduct}
                    className={({ isActive }) =>
                      `hover:underline ${isActive ? "font-bold" : ""}`
                    }
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to={URLEndPoint.adminOrder}
                    className={({ isActive }) =>
                      `hover:underline ${isActive ? "font-bold" : ""}`
                    }
                  >
                    Orders
                  </NavLink>
                  <span className="text-md">
                    Hello,{" "}
                    <span className="font-bold capitalize">
                      {auth.user?.username}
                    </span>
                  </span>
                </>
              )}
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
              <NavLink
                to={URLEndPoint.login}
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-bold" : ""}`
                }
              >
                <button
                  type="button"
                  className="bg-white text-blue-700 font-medium rounded-lg text-sm px-5 py-2 cursor-pointer"
                >
                  Login
                </button>
              </NavLink>
              <NavLink
                to={URLEndPoint.register}
                className={({ isActive }) =>
                  `hover:underline ${isActive ? "font-bold" : ""}`
                }
              >
                <button
                  type="button"
                  className="py-2 px-4 text-sm font-medium cursor-pointer text-white
                  rounded-lg border border-gray-200 "
                >
                  Register
                </button>
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
