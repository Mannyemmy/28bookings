import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsApi = createApi({
  reducerPath: "items",
  tagTypes: ["UserItems"],
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.28bookings.com/api/`,
    prepareHeaders: (headers, { getState }) => {
      const token =
        JSON.parse(localStorage.getItem("token")) || getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getItemBySlug: builder.query({
      query: (slug) => `item/${slug}/`,
      providesTags: ["UserItems"],
    }),
    getCategory: builder.query({
      query: (id) => `categories/${id}/`,
    }),
    getRandomItem: builder.query({
      query: () => `random/`,
    }),
    getSearchResults: builder.query({
      query: (query) => `search/${query}/`,
    }),
    getUserItems: builder.query({
      query: (id) => `users/${JSON.parse(localStorage.getItem("id"))}/items/`,
      providesTags: ["UserItems"],
    }),
    editItem: builder.mutation({
      query(data) {
        const { id, body } = data;
        return {
          url: `update/items/${id}/`,
          method: "PATCH",
          body: body,
        };
      },
      invalidatesTags: ["UserItems"],
    }),
    deleteItem: builder.mutation({
      query(id) {
        return {
          url: `items/${id}/`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["UserItems"],
    }),
    createDispute: builder.mutation({
      query(body) {
        return {
          url: `disputes/`,
          method: "POST",
          body
        };
        
      },
    }),
    
  }),
});

export const {
  useCreateDisputeMutation,
  useDeleteItemMutation,
  useEditItemMutation,
  useGetItemBySlugQuery,
  useGetCategoryQuery,
  useGetRandomItemQuery,
  useGetSearchResultsQuery,
  useGetUserItemsQuery,
} = itemsApi;
