"use client";
import {
  decrement,
  increment,
  selectCounter,
} from "@/src/store/modules/counterSlice";
import { AppDispatch } from "@/src/store/store";
import { Box, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function CounterControl() {
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeCounter = (type: "ADD" | "MINUS") => {
    dispatch(type === "ADD" ? increment() : decrement());
  };

  return (
    <Box>
      <Typography variant="h1">{counter}</Typography>
      <Box>
        <Button variant="outlined" onClick={() => handleChangeCounter("ADD")}>
          ADD
        </Button>
        <Button
          variant="outlined"
          onClick={() => handleChangeCounter("MINUS")}
          sx={{ ml: 2 }}
        >
          MINUS
        </Button>
      </Box>
    </Box>
  );
}
