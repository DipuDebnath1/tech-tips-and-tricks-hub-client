import { TPost } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  posts: null | TPost[];
};

const initialState: TInitialState = {
  posts: null,
};

export const postSlice = createSlice({
  name: "allPost ",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<TPost[]>) => {
      state.posts = action.payload;
    },
  },
});

export const { addPosts } = postSlice.actions;
export default postSlice.reducer;
