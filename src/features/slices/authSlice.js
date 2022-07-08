import { createSlice } from "@reduxjs/toolkit";


const token = JSON.parse(localStorage.getItem("token"));
const user = JSON.parse(localStorage.getItem("user"));


const initialState = token
  ? { isLoggedIn: true, user: user,error : false, errorMessage: "" , token : token, settings : null, id : user.id}
  : { isLoggedIn: false, user: null,error : false, errorMessage: "" , settings : null, id : null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userRegisterSuccess: (state, action) => {
      state.isLoggedIn = false;
    },
    setId: (state,action) => {
      state.id = action.payload
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
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
  setSettings,
  logout,
  setId
} = authSlice.actions;
export default authSlice.reducer;
