import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user
    getAllUser: builder.query({
      query: () => ({
        url: `/auth/all-users`,
        method: "GET",
      }),
      providesTags: ["admin"],
    }),
    // block user
    blockUser: builder.mutation({
      query: (data) => ({
        url: `/auth/block`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // un block user
    unBlockUser: builder.mutation({
      query: (data) => ({
        url: `/auth/unblock`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // delete user
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `/auth/delete`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // delete user
    restoreUser: builder.mutation({
      query: (data) => ({
        url: `/auth/restore`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // change user role
    changeRole: builder.mutation({
      query: (data) => ({
        url: `/auth/change-role`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["admin"],
    }),
    // payment
    paymentRequest: builder.mutation({
      query: (data) => ({
        url: `/payment`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useBlockUserMutation,
  useUnBlockUserMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
  useChangeRoleMutation,
  usePaymentRequestMutation,
} = userApi;
