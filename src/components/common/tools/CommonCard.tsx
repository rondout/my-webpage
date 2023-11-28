import { Box, SxProps, Typography } from "@mui/material";
import { PropsWithChildren, ReactNode, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { commonBoxShadow, themeColorSelector } from "../../../utils";

interface CommonCardProps {
  title?: string | ReactNode;
  sx?: SxProps;
}

export default function CommonCard(props: PropsWithChildren<CommonCardProps>) {
  const { t } = useTranslation();

  const { title, sx = {}, children } = props;

  const height = useMemo(() => {
    if (props.title) {
      return "calc(100% - 56px)";
    }
    return "100%";
  }, [props]);

  return (
    <Box className="border-box" sx={{ boxShadow: commonBoxShadow, borderRadius: 1, height: 1, ...sx }}>
      {title && (
        <Box sx={{ height: 56, px: 4 }} className="flex-start">
          <Box sx={{ mr: 1, width: 3, height: 12, bgcolor: themeColorSelector }}></Box>
          {typeof title === "string" && <Typography>{t(title)}</Typography>}
          {typeof title === "object" && title}
        </Box>
      )}
      <Box sx={{ height }}>{children}</Box>
    </Box>
  );
}
