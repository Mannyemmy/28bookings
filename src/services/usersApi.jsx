import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/"
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `user/${id}`,
    }),
  }),
});

export const {useGetUserQuery} = usersApi;


