import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messages",
  tagTypes: ["Messages", "rentalMessages"],
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
    getInboxMessages: builder.query({
      query: () => `inbox/`,
      providesTags: ["Messages"],
    }),
    getRentalDates: builder.query({
      query: (id) => `rentals/pending/${id}/`,
    }),
    getRentalInboxMessages: builder.query({
      query: () => `rentals/`,
      providesTags: ["rentalMessages"],
    }),

    paymentSuccess: builder.mutation({
      query(data) {
        return {
          url: `payment_success/`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["rentalMessages", "Messages"],
    }),
    updateIsRead: builder.mutation({
      query: ({ id }) => ({
        url: `read_message/${id}/`,
        method: "PATCH",
        body: {
          is_read: true,
        },
      }),
    }),
    dropOffConfirm: builder.mutation({
      query: ({ ...patch }) => ({
        url: `dropoff_success/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["rentalMessages", "Messages"],
    }),
    rejectBooking: builder.mutation({
      query: ({ ...patch }) => ({
        url: `reject_booking/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Messages", "rentalMessages"],
    }),
    acceptBooking: builder.mutation({
      query: ({ ...patch }) => ({
        url: `accept_booking/`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Messages", "rentalMessages"],
    }),
  }),
});

export const {
  useGetRentalDatesQuery,
  useGetInboxMessagesQuery,
  useUpdateIsReadMutation,
  useRejectBookingMutation,
  useAcceptBookingMutation,
  useGetRentalInboxMessagesQuery,
  usePaymentSuccessMutation,
  useDropOffConfirmMutation,
} = messagesApi;
