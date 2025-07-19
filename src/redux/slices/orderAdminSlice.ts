import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IAdminOrder } from "../../shared/interfaces";

interface OrderState {
  items: IAdminOrder[];
}

const initialState: OrderState = {
  items: [],
};

const orderSlice = createSlice({
  name: "adminOrders",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IAdminOrder[]>) => {
      state.items = action.payload;
    },
    updateOrderStatus: (state, action: PayloadAction<any>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = {
        ...state.items[index],
        status: action.payload.status,
      };
    },

    updateOrderPayment: (state, action: PayloadAction<any>) => {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index] = {
        ...state.items[index],
        payment: action.payload.payment,
      };
    },

    clearOrders: (state) => {
      state.items = [];
    },
  },
});

export const {
  setOrders,
  updateOrderStatus,
  updateOrderPayment,
  clearOrders,
} = orderSlice.actions;
export default orderSlice.reducer;
