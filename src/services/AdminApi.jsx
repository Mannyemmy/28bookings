import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {setSettings} from "../features/slices/authSlice";

export const adminApi = createApi({
  reducerPath: "admin",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.28bookings.com/api/`
  }),
  endpoints: (builder) => ({
    getContacts: builder.query({
      query: () => `contacts`,
    }),
    createContact: builder.mutation({
        query: ({ ...patch }) => ({
          url: `contacts`,
          method: "POST",
          body: patch,
        })
      }),
    getSettings: builder.query({
      query : ()=> `settings`,
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setSettings(data));
        } catch (error) {}
      },
    })

  }),
});

export const {
  useGetContactsQuery,
  useCreateContactMutation,
  useGetSettingsQuery
} = adminApi;
