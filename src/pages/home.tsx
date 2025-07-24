import { useState } from "react";
import { useSelector } from "react-redux";
import EmptyPage from "../components/EmptyPage";
import ProductCard from "../components/ProductCard";
import SearchInput from "../components/SearchInput";
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
  const [search, setSearch] = useState<string>("");

  const filteredProducts = products.filter((product: Product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="px-8 py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products</h1>
        <SearchInput setSearch={setSearch} />
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <EmptyPage
            title="No Products Found"
            description="Try searching for a different product."
            isButton={false}
          />
        </div>
      )}
    </div>
  );
};

export default Home;
