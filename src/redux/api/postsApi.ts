import { baseApi } from "./baseApi";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // find all product

    getAllPosts: builder.query({
      query: (data) => {
        const query = `${data ? `?category=${data}` : ""}`;
        return {
          url: `/posts${query}`,
          method: "GET",
        };
      },
      providesTags: ["posts"],
    }),

    // find single product

    getAProduct: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    // upVotes=

    upVotes: builder.mutation({
      query: (postId) => {
        return {
          url: `/posts/upvote/${postId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["posts"],
    }),

    // upVotes

    downVotes: builder.mutation({
      query: (postId) => {
        return {
          url: `/posts/downvote/${postId}`,
          method: "POST",
        };
      },
      invalidatesTags: ["posts"],
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetAProductQuery,
  useUpVotesMutation,
  useDownVotesMutation,
} = postsApi;
