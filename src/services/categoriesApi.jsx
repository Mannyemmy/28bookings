import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL || "http://localhost:8000/api/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (id) => `subcategories/${id}`,
    }),
    getCategory: builder.query({
      query: (id) => `categories/${id}`,
    }),
    getAllCategories: builder.query({
      query: () => `categories/all`,
    }),
    getItemsByCategory: builder.query({
      query: (id) => `categories/${id}/items`,
    }),
    getCategoryBySlug: builder.query({
      query: (slug) => `category/${slug}`,
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetItemsByCategoryQuery,
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
} = categoriesApi;
