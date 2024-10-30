import { TUser } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  user: null | TUser;
};

const initialState: TInitialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user ",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
