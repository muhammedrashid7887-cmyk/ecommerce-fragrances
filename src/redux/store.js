
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cartSlice";
import WishList from "./Slices/wishlistSlice";
import authSlice from "./Slices/authSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    fav: WishList,
    auth: authSlice,
  },
});

export default store;
