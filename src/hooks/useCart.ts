import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";
import { tryCatch } from "../utils/apiHandler";

export function useCart() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const carts = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await tryCatch(() => api.get(URLEndPoint.cart));
      if (res) {
        dispatch(setCart(res.data));
      }
    };

    if (auth.isLoggedIn && !auth.isAdmin && carts.length === 0) {
      fetchCart();
    }
  }, [auth, carts.length, dispatch]);

  return carts;
}
