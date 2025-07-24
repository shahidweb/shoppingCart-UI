import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface WishlistState {
  items: WishlistItem[];
}

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action: PayloadAction<WishlistItem[]>) => {
      state.items = action.payload;
    },
    addWishList: (state, action: PayloadAction<WishlistItem>) => {
      const id = state.items.length
        ? state.items[state.items.length - 1].id + 1
        : 1;
      state.items.push({ ...action.payload, id });
    },
    removeWishList: (state, action: PayloadAction<any>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { setWishlist, removeWishList, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
