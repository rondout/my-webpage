"use client";
import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextAppDirEmotionCacheProvider from "./EmotionCache";
import { defaultTheme, generateTheme } from "./theme";
import { Button } from "@mui/material";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = React.useState(defaultTheme);

  const changeTheme = () => {
    setTheme(generateTheme("#0082c3"));
  };

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <Button onClick={changeTheme}>ChangeTheme</Button>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
