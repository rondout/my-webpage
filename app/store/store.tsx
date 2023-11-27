//store.jsx

"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./modules/counterSlice";
import { Provider } from "react-redux";
import { useEffect } from "react";

const rootReducer = combineReducers({
  counter: counterReducer,
  //add all your reducers here
});

export const store = configureStore({
  reducer: rootReducer,
});

export function ReduxProvider({ children }) {
  useEffect(() => {
    console.log("mounted");
  }, []);
  return <Provider store={store}>{children}</Provider>;
}

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
