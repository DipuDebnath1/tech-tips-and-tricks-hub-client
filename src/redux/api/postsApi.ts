import { baseApi } from "./baseApi";

const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // add post
    addPost: builder.mutation({
      query: (data) => ({
        url: "/posts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["posts"],
    }),

    // updatePost
    updatePost: builder.mutation({
      query: (payload) => ({
        url: `/posts/${payload.postId}`,
        method: "PUT",
        body: payload.data,
      }),
      invalidatesTags: ["posts"],
    }),

    // delete POST
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["post", "posts"],
    }),
    // find all post
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

    // find single post
    getAProduct: builder.query({
      query: (postId) => ({
        url: `/posts/${postId}`,
        method: "GET",
      }),
      providesTags: ["post"],
    }),

    // FindUserPostAllData
    getMyPostAll: builder.query({
      query: () => ({
        url: `/posts/my-post`,
        method: "GET",
      }),
      providesTags: ["posts"],
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
  useAddPostMutation,
  useUpdatePostMutation,
  useGetAllPostsQuery,
  useGetAProductQuery,
  useGetMyPostAllQuery,
  useUpVotesMutation,
  useDownVotesMutation,
  useDeletePostMutation,
} = postsApi;
