
import { createSlice } from "@reduxjs/toolkit";

const WishList = createSlice({
  name: "fav",

  initialState: {
    data: {},
  },

  reducers: {
    addtofav: (state, action) => {
      const { userId, product } = action.payload;

      if (!state.data[userId]) {
        state.data[userId] = [];
      }

      const fav = state.data[userId].find(
        (a) => a.id === product.id
      );

      if (!fav) {
        state.data[userId].push(product);
      }
    },

    removetofav: (state, action) => {
      const { userId, productId } = action.payload;

      state.data[userId] = (state.data[userId] || []).filter(
        (a) => a.id !== productId
      );
    },
  },
});

export const { addtofav, removetofav } = WishList.actions;

export default WishList.reducer;
