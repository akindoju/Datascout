import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { globalSlice } from "./globalSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "./api";

const reducer = combineReducers({
  global: globalSlice.reducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefault) => getDefault().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof reducer>;
