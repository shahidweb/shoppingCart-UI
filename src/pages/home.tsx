import { useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import type { RootState } from "../redux/store";

export interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
}

const Home = () => {
  const products = useSelector((state: RootState) => state.products.items);

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
