import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import usersReducer from "./users/UsersSlice";
import authReducer from "./auth/AuthSlice";
import sessionsReducer from "./sessions/SessionsSlice";
import presetReducer from "./preset/PresetSlice";

const rootReducer = combineReducers({
  usersReducer,
  authReducer,
  presetReducer,
  sessionsReducer,
});

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: customizedMiddleware,
  });
};
export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
