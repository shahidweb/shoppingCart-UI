import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IProduct } from "../../shared/interfaces";

interface ProductsState {
  items: IProduct[];
}

const initialState: ProductsState = {
  items: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<IProduct[]>) => {
      state.items = action.payload;
    },
    addProduct: (state, action: PayloadAction<IProduct>) => {
      const id = state.items.length
        ? state.items[state.items.length - 1].id + 1
        : 1;
      state.items.push({ ...action.payload, id });
    },
    updateProduct: (state, action: PayloadAction<IProduct>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    clearProduct: (state) => {
      state.items = [];
    },
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  clearProduct,
} = productSlice.actions;
export default productSlice.reducer;
