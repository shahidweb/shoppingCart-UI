import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setWishlist } from "../redux/slices/wishSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";

export function useWishlist() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const wishlist = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    if (!auth.isLoggedIn || auth.isAdmin || wishlist.length > 0) return;
    api
      .get(URLEndPoint.wishlist)
      .then((res) => {
        dispatch(setWishlist(res.data));
      })
      .catch((err) => {
        console.error("err", err);
        toast.error(err.message || "Failed to fetch wishlist");
      });
  }, [auth, dispatch]);

  return useWishlist;
}
