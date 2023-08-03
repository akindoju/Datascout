import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./slices/globalSlice";

const reducer = combineReducers({
  global: globalSlice.reducer,
});

export const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
