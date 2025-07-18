import { HeartIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setWishlist } from "../redux/slices/wishSlice";
import type { RootState } from "../redux/store";
import api from "../services/api";
import { URLEndPoint } from "../shared/auth-modal";

const WishlistControl = ({
  productId,
  isShowText,
  classes,
}: {
  productId: number;
  isShowText: boolean;
  classes?: string;
}) => {
  const wishlist = useSelector((state: RootState) => state.wishlist.items);
  const dispatch = useDispatch();

  const addRemoveWishlist = async () => {
    const isInWishlist = isItemInWishlist(productId);
    if (isInWishlist) {
      await api.delete(`${URLEndPoint.wishlist}/${productId}`);
    } else {
      await api.post(URLEndPoint.wishlist, { productId });
    }
    toast.success(
      isInWishlist ? "Removed from Favorites" : "Added to Favorites"
    );
    const res = await api.get(URLEndPoint.wishlist);
    dispatch(setWishlist(res.data));
  };

  const isItemInWishlist = (productId: number) =>
    wishlist.some((item) => item.id === productId);

  return (
    <button
      className={`flex items-center gap-1 cursor-pointer ${
        isItemInWishlist(productId) ? "text-red-600" : ""
      }`}
      onClick={() => addRemoveWishlist()}
    >
      <HeartIcon className={`w-4 h-4 ${classes}`} />
      {isShowText && (
        <>
          {isItemInWishlist(productId)
            ? "Remove from Favorites"
            : "Add to Favorites"}
        </>
      )}
    </button>
  );
};

export default WishlistControl;
