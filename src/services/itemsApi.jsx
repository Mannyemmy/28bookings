import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsApi = createApi({
    reducerPath: 'items',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("token")) || getState().auth.token 
  
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  }),
  endpoints: (builder) => ({
    getItemBySlug: builder.query({
      query: (slug) => `item/${slug}`,
    }),
    getCategory: builder.query({
      query: (id) => `categories/${id}`,
    }),
    getRandomItem: builder.query({
      query: ()=> `random`,
    }),
    getSearchResults: builder.query({
      query: (query)=> `search/${query}`,
    }),
    getUserItems: builder.query({
      query: (id)=> `users/me/items`
    })
  }),
});

export const { useGetItemBySlugQuery, useGetCategoryQuery , useGetRandomItemQuery, useGetSearchResultsQuery, useGetUserItemsQuery} = itemsApi;


