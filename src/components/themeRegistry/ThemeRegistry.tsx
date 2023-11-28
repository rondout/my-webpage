"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { generateTheme } from "./theme";
import { useSelector } from "react-redux";
import { selectThemeColor } from "@/src/store/modules/mainSlice";

export default function ThemeRegistry({
  children,
  color,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  const themeColor = useSelector(selectThemeColor);

  const theme = React.useMemo(
    () => generateTheme(themeColor || color),
    [color, themeColor]
  );

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
