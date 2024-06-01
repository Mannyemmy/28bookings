import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
    reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = JSON.parse(localStorage.getItem("token")) || getState().auth.token 
  
      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
  
      return headers
    },
  }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `user/${id}/`,
      providesTags: ['User']
    }),
    updateProfile: builder.mutation({
      query(data) {
        const {id, body} = data;
        return {
          url: `profile/${id}/`,
          method: 'POST',
          body : body
        }
      },
      invalidatesTags: ['User'] 
    }),
    forgotPassword: builder.mutation({
      query(body) { 
        return {
          url: `forgot-password`,
          method: 'POST',
          body 
        }
      },
    }),
    changePassword: builder.mutation({
      query(body) { 
        return {
          url: `change-password/`,
          method: 'PATCH',
          body 
        }
      },
    }),
    requestWithdraw : builder.mutation({
      query(body) {
        return {
          url: `withdraw/`,
          method: 'POST',
          body 
        }
      },
      invalidatesTags: ['User'] 
    })
  })
})

export const {useGetUserQuery , useUpdateProfileMutation, useRequestWithdrawMutation ,useChangePasswordMutation, useForgotPasswordMutation} = usersApi;


