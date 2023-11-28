//store.jsx

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterSlice";
import { Provider } from "react-redux";
import { mainReducer } from "./modules/mainSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  main: mainReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export interface ReduxAction<P = any, T = string> {
  payload: P;
  type: T;
}
