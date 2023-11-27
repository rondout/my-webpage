import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const generateTheme = (primary?: string) => {
  try {
    if (!primary) {
      // primary = localStorage.getItem("theme") || "#3f51b5";
    }
  } catch (error) {}
  return createTheme({
    palette: {
      mode: "light",
      primary: {
        main: primary || "#3f51b5",
      },
    },
    typography: {
      fontFamily: roboto.style.fontFamily,
    },
    components: {
      MuiAlert: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.severity === "info" && {
              backgroundColor: "#60a5fa",
            }),
          }),
        },
      },
    },
  });
};

export const defaultTheme = generateTheme();
