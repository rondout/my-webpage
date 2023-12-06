"use client";

import { THEME_COLORS } from "@/src/models/config.model";
import { changeThemeColor } from "@/src/store/modules/mainSlice";
import { AppDispatch } from "@/src/store/store";
import { Box, Button } from "@mui/material";
import { getCookie } from "cookies-next";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Iconfont from "../common/tools/Iconfont";

export default function ThemeChanger(props: { defaultColor: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const [currentTheme, setCurrentTheme] = useState<string>(props.defaultColor);

  const changeTheme = useCallback((themeColor: string) => {
    dispatch(changeThemeColor(themeColor));
    setCurrentTheme(themeColor);
  }, []);

  return (
    <Box className="flex-start">
      {THEME_COLORS.map((color) => (
        <Box
          key={color}
          sx={{
            width: 16,
            height: 16,
            bgcolor: color,
            mr: 1,
            cursor: "pointer",
          }}
          onClick={() => changeTheme(color)}
          className="flex"
        >
          <span>
            {currentTheme === color && (
              <Iconfont
                icon="check"
                color="#fff"
                mr={0}
                fontSize={12}
              ></Iconfont>
            )}
          </span>
        </Box>
      ))}
    </Box>
  );
}
