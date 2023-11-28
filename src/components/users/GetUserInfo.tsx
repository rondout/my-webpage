"use client";
import mainController from "@/src/controllers/main.controller";
import { setUserInfo } from "@/src/store/modules/mainSlice";
import React from "react";
import { useDispatch } from "react-redux";

export default function GetUserInfo() {
  const dispatch = useDispatch();

  const getUserInfo = React.useCallback(async () => {
    try {
      const userInfo = await mainController.getUserInfo();
      dispatch(setUserInfo(userInfo));
    } catch (error) {}
  }, []);

  React.useEffect(() => {
    getUserInfo();
  }, []);

  return null;
}
