import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsApi = createApi({
    reducerPath: 'items',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (id) => `subcategories/${id}`,
    }),
    getCategory: builder.query({
      query: (id) => `categories/${id}`,
    })
  }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery } = itemsApi;


