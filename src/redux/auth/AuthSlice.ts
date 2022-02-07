import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "./types";
import { ILogin } from "../../models/login-dto";
import { login } from "../../api/auth";

const initialState: IAuthState = {
  isLoading: false,
  error: {},
  isLogin: false,
};

export const getToken = createAsyncThunk("auth", async (dto: ILogin) => {
  return await login(dto);
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [getToken.pending.type]: (state) => {
      state.isLoading = true;
    },
    [getToken.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      localStorage.setItem("token", action.payload.accessToken);
      window.location.replace("/sessions");
      state.isLogin = true;
      state.error = {};
    },
    [getToken.rejected.type]: (state, action) => {
      state.isLoading = false;
      localStorage.removeItem("token");
      state.isLogin = false;
      state.error = action.error.message;
    },
  },
});

export default authSlice.reducer;
