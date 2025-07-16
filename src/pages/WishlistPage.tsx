import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyPage from "../components/EmptyPage";
import { setCart } from "../redux/slices/cartSlice";
import { setWishlist } from "../redux/slices/wishSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";
import { formatCurrency } from "../shared/common-methods";

export default function WishlistPage() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const removeFromWishlist = async (productId: number) => {
    try {
      await api.delete(`${URLEndPoint.wishlist}/${productId}`);
      const res = await api.get(URLEndPoint.wishlist);
      dispatch(setWishlist(res.data));
    } catch (err) {
      console.error("Error removing item from wishlist", err);
    }
  };

  const addToCart = async (productId: number) => {
    try {
      await api.post(URLEndPoint.cart, { productId, quantity: 1 });
      const res = await api.get(URLEndPoint.cart);
      dispatch(setCart(res.data));
    } catch (err) {
      console.error("Error adding item to cart", err);
    }
  };

  const isMatching = (productId: number) =>
    cart.some((item) => item.product_id === productId);

  if (wishlist.length === 0) {
    return (
      <EmptyPage
        title="Your Wishlist is Empty"
        description="No products have been added to your wishlist yet."
      />
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 flex flex-col items-center shadow-sm"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover mb-4"
            />
            <h3 className="text-lg font-medium mb-1">{product.name}</h3>
            <p className="text-gray-600 mb-4">
              {formatCurrency(product.price)}
            </p>
            <div className="flex gap-2">
              <Link
                to={`${URLEndPoint.product}/${product.id}`}
                className="px-4 py-1.5 text-sm bg-violet-600 text-white rounded hover:bg-violet-700 cursor-pointer"
              >
                View
              </Link>
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="px-3 py-1.5 text-sm border rounded hover:bg-gray-100 cursor-pointer"
              >
                Remove
              </button>
              {!isMatching(product.id) && (
                <button
                  onClick={() => addToCart(product.id)}
                  className="px-3 py-1.5 text-sm border rounded hover:bg-gray-100 cursor-pointer"
                >
                  Add To Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
