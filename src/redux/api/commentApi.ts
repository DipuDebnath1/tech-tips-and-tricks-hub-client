import { baseApi } from "./baseApi";

const commentApi = baseApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get post data comment
    findAllComment: builder.query({
      query: (postId) => ({
        url: `/comments/${postId}`,
        method: "GET",
      }),
      providesTags: ["comment"],
    }),

    // add a comment
    addComment: builder.mutation({
      query: (data) => ({
        url: `/comments`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["posts", "post", "comment"],
    }),

    // delete comment
    deleteComment: builder.mutation({
      query: (data) => ({
        url: `/comments/${data.commentId}`,
        method: "DELETE",
        body: { postId: data.postId },
      }),
      invalidatesTags: ["comment", "posts", "post"],
    }),
  }),
});

export const {
  useFindAllCommentQuery,
  useAddCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
