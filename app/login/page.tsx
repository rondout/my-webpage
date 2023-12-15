"use client";
import MatInput from "@/src/components/common/material/MatInput";
import MatPassword from "@/src/components/common/material/MatPassword";
import mainController from "@/src/controllers/main.controller";
import { IntBool, LoginForm } from "@/src/models/base.model";
import { STORAGE_TOKEN_KEY } from "@/src/models/config.model";
import { handleResponseError, setLocalStorageItem } from "@/src/tools";
import { LoadingButton } from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { setCookie, deleteCookie } from "cookies-next";
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
        deleteCookie(STORAGE_TOKEN_KEY);
        setCookie(STORAGE_TOKEN_KEY, data.token, {
          expires: new Date("9999-12-30"),
        });
        setLocalStorageItem(STORAGE_TOKEN_KEY, data.token);
        setTimeout(() => {
          setLoginLoading(false);
          // 这里只能使用replace   不能用push  因为肯呢个profile页面在服务端是有缓存的
          router.replace("/");
        }, 1000);
        // window.location.href = window.location.origin;
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
          p: 3,
          width: 400,
          maxWidth: 0.95,
          bgcolor: (theme) => theme.palette.background.default,
        }}
      >
        <Typography variant="h4" color="primary.main">
          请先登录
        </Typography>
        <MatInput
          sx={{ my: 1 }}
          value={forms.username}
          label="用户名"
          onChange={(e) => handleChange(e.target.value, "username")}
          autofill={IntBool.FALSE}
        ></MatInput>
        <MatPassword
          autofill={IntBool.FALSE}
          sx={{ my: 1 }}
          value={forms.password}
          label="密码"
          onChange={(e) => handleChange(e.target.value, "password")}
        ></MatPassword>
        <LoadingButton
          loading={loginLoading}
          onClick={handleLogin}
          fullWidth
          variant="contained"
        >
          登录
        </LoadingButton>
      </Box>
    </Box>
  );
}
