import { createSlice } from "@reduxjs/toolkit";
import { ReduxAction, RootState } from "../store";
// import { setLocalStorageItem } from "@/src/tools";
import { STORAGE_THEME_COLOR_KEY } from "@/src/models/config.model";
import { setCookie } from "cookies-next";
import { BaseUserInfo } from "@/src/models/user.model";

export const mainSlice = createSlice({
  name: "main",
  initialState: {
    themeColor: null as string,
    userInfo: {} as BaseUserInfo,
  },
  reducers: {
    changeThemeColor(state, action: ReduxAction<string>) {
      state.themeColor = action.payload;
      // setLocalStorageItem(STORAGE_THEME_COLOR_KEY, action.payload);
      setCookie(STORAGE_THEME_COLOR_KEY, action.payload, {
        expires: new Date("9999-12-30"),
      });
    },
    setUserInfo(state, action: ReduxAction<BaseUserInfo>) {
      state.userInfo = action.payload;
    },
  },
});

export const { changeThemeColor, setUserInfo } = mainSlice.actions;

export const selectThemeColor = (state: RootState) => state.main.themeColor;
export const selectUserInfo = (state: RootState) => state.main.userInfo;
export const isLoginSelector = (state: RootState) => !!state.main.userInfo._id;

export const mainReducer = mainSlice.reducer;
