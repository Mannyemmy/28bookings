import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const chatsApi = createApi({
  reducerPath: "chat",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
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
    getUserChats: builder.mutation({
      query: ({ ...patch }) => ({
        url: `chat_users/`,
        method: "POST",
        body: patch,
      }),
      providesTags: ["chatsUsers"],
    }),
    getChatMessages: builder.mutation({
      query: ({ ...patch }) => ({
        url: `chat_messages/`,
        method: "POST",
        body: patch,
      }),
    }),
    addChatMessage: builder.mutation({
      query: ({ ...patch }) => ({
        url: `chat/`,
        method: "POST",
        body: patch,
      }),
      invalidatesTags: ["chatsUsers"],
    }),
  }),
});

export const {
  useGetUserChatsMutation,
  useAddChatMessageMutation,
  useGetChatMessagesMutation,
} = chatsApi;
