import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/slices/productSlice";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";
import type { RootState } from "../redux/store";

export function useProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);

  useEffect(() => {
    if (products.length > 0) return ;
    api
      .get(URLEndPoint.products)
      .then((res) => {
        dispatch(setProducts(res.data));
      })
      .catch((err) => console.error(err));
  }, [dispatch, products]);

  return products;
}
