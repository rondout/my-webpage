"use client";
import { styled } from "@mui/material";

export const StyledDiv = styled("div")(({ theme }) => {
  return {
    width: "100px",
    height: "100px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.paper,
  };
});
