import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Products {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface ProductsState {
  items: Products[];
}

const initialState: ProductsState = {
  items: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
