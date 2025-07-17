import { Link } from "react-router-dom";
import { URLEndPoint } from "../shared/auth-modal";
import { formatCurrency } from "../shared/common-methods";
import QuantityControls from "./QuantityControls";
import WishlistControl from "./WishlistControl";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  image?: string;
  description: string;
}

const ProductCard = ({ id, name, price, image, description }: ProductProps) => {
  return (
    <div className="bg-white shadow-md rounded p-4 flex flex-col justify-between relative">
      <img
        src={image || "https://via.placeholder.com/200"}
        alt={name}
        className="w-full h-48 object-cover rounded"
      />
      <div className={`absolute top-7 right-7 text-white`}>
        <WishlistControl productId={id} isShowText={false} classes="w-8 h-8" />
      </div>
      <Link
        to={`${URLEndPoint.product}/${id}`}
        className="mt-2 text-lg font-semibold text-blue-800 hover:underline"
      >
        <h2 className="mt-2 font-bold text-lg">{name}</h2>
      </Link>

      <p className="text-sm text-gray-600">{description}</p>
      <p className="mt-1 text-blue-600 font-semibold">
        {formatCurrency(price)}
      </p>
      <QuantityControls productId={id} />
    </div>
  );
};

export default ProductCard;
