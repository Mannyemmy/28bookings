import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.28bookings.com/api/`
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
      query: (id) => `categories/${id}/items/`,
    }),
    getCategoryBySlug: builder.query({
      query: (slug) => `category/${slug}`,
    }),
    getEditCategories: builder.query({
      query: () => `categories`
    })
  }),
});

export const {
  useGetEditCategoriesQuery,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useGetItemsByCategoryQuery,
  useGetAllCategoriesQuery,
  useGetCategoryBySlugQuery,
} = categoriesApi;
