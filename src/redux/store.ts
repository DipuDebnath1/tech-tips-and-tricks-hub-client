import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import { baseApi } from "./api/baseApi";
import userSlice from "./userSlice";
// ...

export const store = configureStore({
  reducer: {
    postSlice: postSlice,
    userSlice: userSlice,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
