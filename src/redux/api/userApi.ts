import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get user
    userData: builder.query({
      query: (userId) => ({
        url: `/auth/${userId}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    // update profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "auth/update-profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
    // follow
    follow: builder.mutation({
      query: (data) => ({
        url: "/auth/following",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "posts"],
    }),
    // follow
    unFollow: builder.mutation({
      query: (data) => ({
        url: "/auth/un-following",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user", "posts"],
    }),
  }),
});

export const {
  useUserDataQuery,
  useUpdateProfileMutation,
  useFollowMutation,
  useUnFollowMutation,
} = userApi;
