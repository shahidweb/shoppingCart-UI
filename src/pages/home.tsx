import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { setCart } from "../redux/slices/cartSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/routeNames";

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get(URLEndPoint.products)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const fetchCart = async () => {
    const res = await api.get(URLEndPoint.cart);
    dispatch(setCart(res.data));
  };

  useEffect(() => {
    if (!auth.isLoggedIn) return;
    fetchCart();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
