import { TPost } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  post: null | TPost[];
};

const initialState: TInitialState = {
  post: null,
};

export const postSlice = createSlice({
  name: "allPost ",
  initialState,
  reducers: {
    addPosts: (state, action: PayloadAction<TPost[]>) => {
      state.post = action.payload;
    },
  },
});

export const { addPosts } = postSlice.actions;
export default postSlice.reducer;
