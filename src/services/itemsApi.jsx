import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const itemsApi = createApi({
    reducerPath: 'items',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pure-anchorage-21759.herokuapp.com/api/"
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


