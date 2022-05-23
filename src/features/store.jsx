import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "./login-signup/loginSlice.jsx";
import categoriesSlice from "./categories/categoriesSlice";
import reviewsSlice from "./reviews/reviewsSlice";
import { categoriesApi } from "../services/categoriesApi";
import { itemsApi } from "../services/itemsApi.jsx";
import {usersApi } from "../services/usersApi"
import authSlice from "./slices/authSlice.js";

export default configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [itemsApi.reducerPath]: itemsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    login: loginSlice,
    categories: categoriesSlice,
    reviews: reviewsSlice,
    auth: authSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      categoriesApi.middleware, itemsApi.middleware, usersApi.middleware
  ),
  devTools: true,
});
