import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import loginSlice from "./login-signup/loginSlice.jsx";
import categoriesSlice from "./categories/categoriesSlice";
import reviewsSlice from "./reviews/reviewsSlice";
import { categoriesApi } from "../services/categoriesApi";

export default configureStore({
  reducer: {
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    login: loginSlice,
    categories: categoriesSlice,
    reviews: reviewsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
      categoriesApi.middleware
  ),
  devTools: true,
});
