import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/slices/productSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";
import { tryCatch } from "../utils/apiHandler";

export function useProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await tryCatch(() => api.get(URLEndPoint.products));
      if (res) {
        dispatch(setProducts(res.data));
      }
    };

    if (products.length === 0) {
      fetchProducts();
    }
  }, [dispatch, products]);

  return products;
}
