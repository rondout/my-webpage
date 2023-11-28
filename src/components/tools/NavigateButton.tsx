"use client";
import { Button, ButtonProps } from "@mui/material";
import { PropsWithChildren, useCallback } from "react";
import { useRouter } from "next/navigation";

export interface NavigateButtonProps extends ButtonProps {
  destination: string;
}

// 导航按钮
export default function NavigateButton(
  props: PropsWithChildren<NavigateButtonProps>
) {
  const router = useRouter();

  const handleNaviagte = useCallback(() => {
    router.push(props.destination);
  }, []);

  return (
    <Button {...props} onClick={handleNaviagte}>
      {props.children}
    </Button>
  );
}
