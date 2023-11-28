"use client";

import { changeThemeColor } from "@/src/store/modules/mainSlice";
import { AppDispatch } from "@/src/store/store";
import { Box, Button } from "@mui/material";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function ThemeChanger() {
  const dispatch = useDispatch<AppDispatch>();
  const changeTheme = useCallback((themeColor: string) => {
    dispatch(changeThemeColor(themeColor));
  }, []);

  return (
    <Box className="flex-center">
      <Button
        sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#fff" }, mx: 2 }}
        onClick={() => changeTheme("#3f51b5")}
      >
        Change To 3F51B5
      </Button>
      <Button
        sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#fff" } }}
        onClick={() => changeTheme("#0082c3")}
      >
        Change To 0082C3
      </Button>
    </Box>
  );
}
