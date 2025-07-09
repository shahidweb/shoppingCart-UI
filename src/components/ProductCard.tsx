import { Link } from "react-router-dom";
import QuantityControls from "./QuantityControls";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
}

const ProductCard = ({ id, name, price, image, description }: ProductProps) => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between">
      <img
        src={image || "https://via.placeholder.com/200"}
        alt={name}
        className="w-full h-48 object-cover rounded"
      />
      <Link
        to={`/product/${id}`}
        className="mt-2 text-lg font-semibold text-blue-800 hover:underline"
      >
        <h2 className="mt-2 font-bold text-lg">{name}</h2>
      </Link>

      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-1 text-blue-600 font-semibold">₹{price}</p>
      <QuantityControls productId={id} />
    </div>
  );
};

export default ProductCard;
