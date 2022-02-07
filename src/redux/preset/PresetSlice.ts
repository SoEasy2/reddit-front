import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ICreateTemplateDto } from "./dto/Template/Posting/create-template-dto";
import {
  createApvout,
  createKarma,
  createPosting,
  getKarmaById,
  getLikeById,
  getPostingById,
  getPreset,
  presetDelete,
  searchPreset,
} from "../../api/preset";
import { IState } from "./types";
import { IGetPresetDto } from "./dto/Template/get-preset-dto";
import { ICreateApvoutDto } from "./dto/Template/Apvout/create-apvout-dto";
import { ICreateKarmaDto } from "./dto/Template/Karma/create-karma-dto";

const initialState: IState = {
  count: 0,
  isLoading: false,
  error: {},
  data: null,
};

export const fetchCreatePosting = createAsyncThunk(
  "preset/create",
  (dto: ICreateTemplateDto) => {
    return createPosting(dto);
  }
);
export const fetchGetPreset = createAsyncThunk(
  "preset/get",
  (dto: IGetPresetDto) => {
    return getPreset(dto);
  }
);
export const fetchCreateApvout = createAsyncThunk(
  "preset/apvoutCreate",
  (dto: ICreateApvoutDto) => {
    return createApvout(dto);
  }
);
export const fetchCreateKarma = createAsyncThunk(
  "preset/karmaCreate",
  (dto: ICreateKarmaDto) => {
    return createKarma(dto);
  }
);
export const fetchSearchPreset = createAsyncThunk(
  "preset/search",
  (presetName: string) => {
    return searchPreset(presetName);
  }
);
export const fetchDeletePreset = createAsyncThunk(
  "preset/delete",
  (id: number) => {
    return presetDelete(id);
  }
);
export const presetSlice = createSlice({
  name: "preset",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCreatePosting.pending.type]: (state: IState) => {
      state.isLoading = true;
    },
    [fetchCreatePosting.fulfilled.type]: (state: IState) => {
      state.isLoading = false;
    },
    [fetchCreatePosting.rejected.type]: (state: IState, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [fetchGetPreset.pending.type]: (state: IState) => {
      state.isLoading = true;
    },
    [fetchGetPreset.fulfilled.type]: (state: IState, action) => {
      state.count = action.payload.totalCount;
      state.error = {};
      state.isLoading = false;
      state.data = [...action.payload.presetItems];
    },
    [fetchCreatePosting.rejected.type]: (state: IState, action) => {
      (state.isLoading = false), (state.error = action.error);
    },
    [fetchCreateApvout.pending.type]: (state: IState) => {
      state.isLoading = true;
    },
    [fetchCreateApvout.fulfilled.type]: (state: IState) => {
      state.isLoading = false;
      state.error = {};
    },
    [fetchCreateApvout.rejected.type]: (state: IState, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [fetchCreateKarma.pending.type]: (state: IState) => {
      state.isLoading = true;
    },
    [fetchCreateKarma.fulfilled.type]: (state: IState) => {
      state.isLoading = false;
      state.error = {};
    },
    [fetchCreateKarma.rejected.type]: (state: IState, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
    [fetchSearchPreset.pending.type]: (state: IState) => {
      state.isLoading = true;
    },
    [fetchSearchPreset.fulfilled.type]: (state: IState, action) => {
      state.error = {};
      state.isLoading = false;
      state.data = [...action.payload.presetItems];
    },
    [fetchSearchPreset.rejected.type]: (state: IState, action) => {
      (state.isLoading = false), (state.error = action.error);
    },
    [fetchDeletePreset.pending.type]: (state: IState) => {
      state.isLoading = false;
    },
    [fetchDeletePreset.fulfilled.type]: (state: IState, action) => {
      state.isLoading = false;
      state.error = {};
      state.data
        ? (state.data = state.data.filter((item) => item.id !== action.payload))
        : null;
    },
    [fetchDeletePreset.rejected.type]: (state: IState, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export default presetSlice.reducer;
