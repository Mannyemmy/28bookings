import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL ,
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `user/${id}`,
    }),
  }),
});

export const {useGetUserQuery} = usersApi;

