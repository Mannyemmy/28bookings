import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsApi = createApi({
    reducerPath: 'items',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
    })
  }),
});

export const { useGetItemBySlugQuery, useGetCategoryQuery , useGetRandomItemQuery, useGetSearchResultsQuery} = itemsApi;


