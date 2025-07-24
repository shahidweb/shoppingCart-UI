import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyPage from "../components/EmptyPage";
import { setCart } from "../redux/slices/cartSlice";
import { removeWishList } from "../redux/slices/wishSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";
import { formatCurrency } from "../shared/common-methods";
import { tryCatch } from "../utils/apiHandler";

export default function WishlistPage() {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const removeFromWishlist = async (productId: number) => {
    const res: any = await tryCatch(() =>
      api.delete(`${URLEndPoint.wishlist}/${productId}`)
    );
    if (res) {
      dispatch(removeWishList({ id: productId }));
    }
  };

  const addToCart = async (product: any) => {
    const added = await tryCatch(
      () => api.post(URLEndPoint.cart, { productId: product.id, quantity: 1 }),
      "Failed to add product to cart"
    );

    if (!added) return;

    const res = await tryCatch(
      () => api.get(URLEndPoint.cart),
      "Failed to fetch updated cart"
    );

    if (res?.data) {
      dispatch(setCart(res.data));
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
    <div className="px-8 py-5">
      <h2 className="text-2xl font-bold mb-6">Your Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="border border-gray-300 rounded-lg p-4 flex flex-col items-center shadow-sm bg-gray-50"
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
                  onClick={() => addToCart(product)}
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
