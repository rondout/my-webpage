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
  const [theme, setTheme] = React.useState(generateTheme());
  // const [mounted, setMounted] = React.useState(false);

  const changeTheme = (themeColor: string) => {
    window.localStorage.setItem("theme", themeColor);
    setTheme(generateTheme(themeColor));
  };

  React.useEffect(() => {
    // setMounted(true);
    setTheme(generateTheme(window.localStorage.getItem("theme")));
  }, []);

  // if (!mounted) {
  //   return null;
  // }

  return (
    <NextAppDirEmotionCacheProvider options={{ key: "mui" }}>
      <ThemeProvider theme={theme}>
        <Button onClick={() => changeTheme("#3f51b5")}>Change To 3F51B5</Button>
        <Button onClick={() => changeTheme("#0082c3")}>Change To 0082C3</Button>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </NextAppDirEmotionCacheProvider>
  );
}
