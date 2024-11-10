import { TUserWithFollowers } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TInitialState = {
  user: null | TUserWithFollowers;
  token: null | string;
};

const initialState: TInitialState = {
  user: null,
  token: null,
};

export const userSlice = createSlice({
  name: "user ",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserWithFollowers>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    removeToken: (state) => {
      state.token = null;
    },
  },
});

export const { setUser, setToken, removeToken } = userSlice.actions;
export default userSlice.reducer;
