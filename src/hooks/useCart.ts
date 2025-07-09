import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/slices/cartSlice";
import api from "../services/api";
import { URLEndPoint } from "../shared/routeNames";
import type { RootState } from "../redux/store";

export function useCart() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const carts = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    if (!auth.isLoggedIn || carts.length > 0) return;
    api
      .get(URLEndPoint.cart)
      .then((res) => {
        dispatch(setCart(res.data));
      })
      .catch((err) => console.error(err));
  }, [auth, dispatch]);

  return carts;
}
