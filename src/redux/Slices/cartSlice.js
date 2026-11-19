
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
  },

  reducers: {
    addToCart: (state, action) => {
      const product = state.items.find(
        (pro) => pro.id === action.payload.id
      );

      if (product) {
        if (product.quantity < Number(product.stock)) {
          product.quantity += 1;
        }
      } else {
        if (Number(action.payload.stock) > 0) {
          state.items.push({
            ...action.payload,
            quantity: 1,
          });
        }
      }
    },

    plus: (state, action) => {
      const pro = state.items.find(
        (pro) => pro.id === action.payload
      );

      if (pro && pro.quantity < Number(pro.stock)) {
        pro.quantity += 1;
      }
    },

    minus: (state, action) => {
      const pro = state.items.find(
        (pro) => pro.id === action.payload
      );

      if (pro && pro.quantity > 1) {
        pro.quantity -= 1;
      }
    },

    trash: (state, action) => {
      state.items = state.items.filter(
        (a) => a.id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  plus,
  minus,
  trash,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
