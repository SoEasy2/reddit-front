import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ISessionsState, SessionsType } from "./types";
import {
  getSessionPresets,
  getSessions,
  getSessionUsers,
  postAddSession,
  sessionsAPI,
  startSession,
  stopSession,
} from "../../api/sessions";
import { AppDispatch } from "../store";
import { addSessionDto } from "./types/add-session-dto";

const initialState: ISessionsState = {
  isLoading: false,
  error: {},
  totalCount: 0,
  sessions: [],
  users: [],
  presets: [],
};

let _newSessionsHandler: ((sessions: SessionsType[]) => void) | null = null;

const newSessionsHandlerCreator = (dispatch: AppDispatch) => {
  if (_newSessionsHandler === null) {
    _newSessionsHandler = (sessions: SessionsType[]) => {
      dispatch(sessionUpdate(sessions));
    };
  }

  return _newSessionsHandler;
};

export const fetchSessions = createAsyncThunk("sessions/get", async () => {
  return await getSessions();
});

export const fetchSessionPresets = createAsyncThunk(
  "sessions/getSessionPresets",
  async () => {
    return await getSessionPresets();
  }
);

export const addSession = createAsyncThunk(
  "sessions/addSession",
  async (dto: addSessionDto, thunkAPI) => {
    await postAddSession(dto);
    thunkAPI.dispatch(fetchSessions());
  }
);

export const fetchStartSession = createAsyncThunk(
  "sessions/startSession",
  async (dto: number[]) => {
    await startSession(dto);
  }
);

export const fetchStopSession = createAsyncThunk(
  "sessions/stopSession",
  async (dto: number[]) => {
    await stopSession(dto);
  }
);

export const fetchSessionUsers = createAsyncThunk(
  "sessions/getSessionUsers",
  async () => {
    return await getSessionUsers();
  }
);

export const startSessionsListening = createAsyncThunk(
  "sessions/startListening",
  async (_, thunkAPI) => {
    await sessionsAPI.start();
    await sessionsAPI.subscribe(newSessionsHandlerCreator(thunkAPI.dispatch));
  }
);

export const stopSessionsListening = createAsyncThunk(
  "sessions/stopListening",
  async () => {
    await sessionsAPI.unsubscribe();
    sessionsAPI.stop();
  }
);

export const sessionsSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    sessionUpdate(state, action) {
      state.sessions = state.sessions.map((session) => {
        const findModel = action.payload.models.find(
          (payload: { sessionId: string }) =>
            payload.sessionId === session.sessionId
        );
        if (findModel !== undefined) {
          return findModel;
        }
        return session;
      });
    },
  },
  extraReducers: {
    [fetchSessions.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchSessions.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.totalCount = action.payload.totalCount;
      state.sessions = action.payload.models;
      state.error = {};
    },
    [fetchSessions.rejected.type]: (state, action) => {
      state.totalCount = 0;
      state.isLoading = false;
      state.error = action.error.message;
    },

    [fetchSessionPresets.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchSessionPresets.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.presets = action.payload.presets;
      state.error = {};
    },
    [fetchSessionPresets.rejected.type]: (state, action) => {
      state.error = action.error.message;
    },

    [fetchSessionUsers.pending.type]: (state) => {
      state.isLoading = true;
    },
    [fetchSessionUsers.fulfilled.type]: (state, action) => {
      state.isLoading = false;
      state.users = action.payload.users;
      state.error = {};
    },
    [fetchSessionUsers.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    },
  },
});

export const { sessionUpdate } = sessionsSlice.actions;
export default sessionsSlice.reducer;
