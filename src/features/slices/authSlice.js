import { createSlice } from "@reduxjs/toolkit";

const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));

const initialState = token
  ? { isLoggedIn: true, user: user,error : false, errorMessage: "" }
  : { isLoggedIn: false, user: null,error : false, errorMessage: "" };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegisterSuccess: (state, action) => {
      state.isLoggedIn = false;
    },
    userRegisterFailure: (state, action) => {
      state.isLoggedIn = false;
    },
    userLoginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.error = false;
      state.user = action.payload;
    },
    userLoginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.error = true;
      state.errorMessage = action.payload
      state.user = null;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const {
  userRegisterSuccess,
  userLoginFailure,
  userRegisterFailure,
  userLoginSuccess,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
