import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWishlist } from "../redux/slices/wishSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";
import { tryCatch } from "../utils/apiHandler";

export function useWishlist() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    const fetchWishlist = async () => {
      const res = await tryCatch(() => api.get(URLEndPoint.wishlist));
      if (res) {
        dispatch(setWishlist(res.data));
      }
    };

    if (auth.isLoggedIn && !auth.isAdmin && wishlist.length === 0) {
      fetchWishlist();
    }
  }, [auth.isLoggedIn, auth.isAdmin, wishlist.length, dispatch]);

  return wishlist;
}
