import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "./types";
import { IGetUsersDto } from "../../models/get-users-dto";
import {
  createUser,
  deleteUser,
  getUsers,
  getUsersCount,
  searchUser,
  updateUser,
} from "../../api";
import { ICreteUserDto } from "../../models/crete-user-dto";
const initialState: IUserState = {
  users: {
    isLoading: false,
    error: {},
    data: [],
    count: 0,
  },
};

export const fetchGetUsers = createAsyncThunk(
  "users/fetchingMapItems",
  (dto: IGetUsersDto) => {
    return getUsers(dto);
  }
);
export const fetchUsersCount = createAsyncThunk("users/getCount", () => {
  return getUsersCount();
});
export const fetchCreateUser = createAsyncThunk(
  "user/create",
  (dto: ICreteUserDto) => {
    console.log("fetch");
    return createUser(dto);
  }
);
export const fetchDeleteUser = createAsyncThunk(
  "user/deleteUser",
  (dto: IUser) => {
    return deleteUser(dto);
  }
);
export const fetchUpdateUser = createAsyncThunk(
  "users/update",
  (dto: IUser) => {
    return updateUser(dto);
  }
);
export const fetchSearchUser = createAsyncThunk(
  "users/search",
  (dto: string) => {
    return searchUser(dto);
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchGetUsers.pending.type]: (state) => {
      state.users.isLoading = true;
    },
    [fetchGetUsers.fulfilled.type]: (state, action) => {
      state.users = {
        isLoading: false,
        error: {},
        data: action.payload,
        count: state.users.count,
      };
    },
    [fetchGetUsers.rejected.type]: (state, action) => {
      state.users = {
        isLoading: false,
        error: action.error,
        data: [],
        count: 0,
      };
    },
    [fetchUsersCount.pending.type]: (state) => {
      state.users.isLoading = true;
    },
    [fetchUsersCount.fulfilled.type]: (state, action) => {
      state.users.count = action.payload;
    },
    [fetchUsersCount.rejected.type]: (state, action) => {
      state.users = {
        isLoading: false,
        error: action.error,
        data: [],
        count: 0,
      };
    },
    [fetchCreateUser.pending.type]: (state) => {
      state.users.isLoading = true;
    },
    [fetchCreateUser.fulfilled.type]: (
      state: IUserState,
      action: PayloadAction<IUser>
    ) => {
      state.users.data.unshift(action.payload);
    },
    [fetchUsersCount.rejected.type]: (state, action) => {
      state.users = {
        isLoading: false,
        error: action.error,
        data: [],
        count: 0,
      };
    },
    [fetchDeleteUser.pending.type]: (state: IUserState) => {
      state.users.isLoading = true;
    },
    [fetchDeleteUser.fulfilled.type]: (state: IUserState, action) => {
      state.users.isLoading = false;
      state.users.data = state.users.data.filter(
        (item) => item.id != action.payload.id
      );
      state.users.error = {};
    },
    [fetchDeleteUser.rejected.type]: (state: IUserState, action) => {
      state.users.isLoading = false;
      state.users.error = action.error;
    },
    [fetchUpdateUser.pending.type]: (state: IUserState) => {
      state.users.isLoading = true;
    },
    [fetchUpdateUser.fulfilled.type]: (state: IUserState) => {
      state.users.isLoading = false;
      state.users.error = {};
    },
    [fetchUpdateUser.rejected.type]: (state: IUserState, action) => {
      state.users.isLoading = false;
      state.users.error = action.error;
    },
    [fetchCreateUser.pending.type]: (state: IUserState) => {
      state.users.isLoading = true;
    },
    [fetchSearchUser.fulfilled.type]: (state: IUserState, action) => {
      state.users = {
        isLoading: false,
        error: {},
        data: action.payload == null ? [] : action.payload,
        count: action.payload == null ? 0 : action.payload.length,
      };
    },
    [fetchSearchUser.rejected.type]: (state: IUserState, action) => {
      state.users = {
        isLoading: false,
        error: action.error,
        count: 0,
        data: [],
      };
    },
  },
});

export default usersSlice.reducer;
