
import { createSlice } from "@reduxjs/toolkit";

// RESTORE SAVED USER
const getSavedUser = () => {
  try {
    const savedUser = localStorage.getItem("user");

    if (!savedUser) return null;

    const user = JSON.parse(savedUser);

    if (!user || !user.id || !user.Email) {
      return null;
    }

    return user;
  } catch {
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: getSavedUser(),
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
