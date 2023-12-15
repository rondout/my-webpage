import { Roboto } from "next/font/google";
import {
  PaletteOptions,
  TypeBackground,
  createTheme,
} from "@mui/material/styles";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      greyBg: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      greyBg?: string;
    };
  }
}

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
    // shadows:{},
    typography: {
      fontFamily: roboto.style.fontFamily,
      body2: {
        color: "#0000008c",
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: () => {
            return {
              boxShadow:
                "0px 0px 11px 0px rgb(0 0 0 / 8%), 0px 1px 0px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)",
            };
          },
        },
      },
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
    custom: {
      greyBg: "#f2f3f5",
    },
  });
};

export const defaultTheme = generateTheme();
