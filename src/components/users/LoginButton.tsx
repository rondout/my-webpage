"use client";

import { Button } from "@mui/material";

export default function LoginButton() {
  const handleLogin = () => {
    Promise.resolve().then(() => {
      console.log("Login sauccessed!");
    });
  };

  return (
    <Button variant="contained" onClick={handleLogin}>
      Login
    </Button>
  );
}
