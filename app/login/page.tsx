"use client";
import MatInput from "@/src/components/common/material/MatInput";
import MatPassword from "@/src/components/common/material/MatPassword";
import mainController from "@/src/controllers/main.controller";
import { IntBool, LoginForm } from "@/src/models/base.model";
import { STORAGE_TOKEN_KEY } from "@/src/models/config.model";
import { handleResponseError, setLocalStorageItem } from "@/src/tools";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [forms, setForms] = useState(new LoginForm());
  const [loginLoading, setLoginLoading] = useState(false);
  const router = useRouter();

  const handleChange = (value: string, key: string) => {
    setForms({ ...forms, [key]: value });
    console.log({ key, value });
  };

  const handleValidate = () => {
    if (!forms.username || !forms.password) {
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    const isValid = handleValidate();
    if (isValid) {
      try {
        setLoginLoading(true);
        const data = await mainController.login(forms);
        setLoginLoading(false);
        setCookie(STORAGE_TOKEN_KEY, data.token);
        setLocalStorageItem(STORAGE_TOKEN_KEY, data.token);
        router.push("/");
        console.log(data);
      } catch (error) {
        setLoginLoading(false);
        handleResponseError(error);
      }
    }
  };

  return (
    <Box sx={{ height: 1 }} className="flex">
      <Box
        sx={{
          width: 400,
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h3" color="primary.main">
          Login Page
        </Typography>
        <MatInput
          sx={{ my: 1 }}
          value={forms.username}
          label="Username"
          onChange={(e) => handleChange(e.target.value, "username")}
          autofill={IntBool.FALSE}
        ></MatInput>
        <MatPassword
          autofill={IntBool.FALSE}
          sx={{ my: 1 }}
          value={forms.password}
          label="Password"
          onChange={(e) => handleChange(e.target.value, "password")}
        ></MatPassword>
        <LoadingButton
          loading={loginLoading}
          onClick={handleLogin}
          fullWidth
          variant="contained"
        >
          login
        </LoadingButton>
      </Box>
    </Box>
  );
}
