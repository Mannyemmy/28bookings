import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pure-anchorage-21759.herokuapp.com/api/"
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `user/${id}`,
    }),
  }),
});

export const {useGetUserQuery} = usersApi;


