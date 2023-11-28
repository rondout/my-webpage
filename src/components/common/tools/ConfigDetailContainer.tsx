import { alpha, Box, darken, SxProps, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { PropsWithChildren, ReactNode } from "react";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    boxSizing: "border-box",
    minHeight: 200,
  },
  container: {
    overflow: "hidden",
    boxShadow: "0px 1px 4px 2px rgb(44 57 127 / 12%)",
    borderRadius: 8,
  },
  header: {
    boxSizing: "border-box",
    boxShadow: "0px 2px 2px 0 " + alpha(darken(theme.palette.primary.main, 0.3), 0.08),
    marginBottom: 2,
  },
  headerChild: {
    height: "100%",
    padding: theme.custom.templateConfigCardPadding,
  },
  dot: {
    height: 18,
    width: 4,
    background: theme.palette.primary.main,
    marginRight: 8,
  },
  content: {
    maxHeight: "calc(100% - 80px)",
    overflowY: "auto",
    boxSizing: "border-box",
  },
}));

interface ConfigDetailContainerProps {
  title: string;
  headerChild?: ReactNode;
  fullHeight?: boolean;
  containerFullHeight?: boolean;
  containerMargin?: boolean;
  noPadding?: boolean;
  customHeader?: ReactNode;
  sx?: SxProps;
}

export default function ConfigDetailContainer(props: PropsWithChildren<ConfigDetailContainerProps>) {
  const classes = useStyles();
  const { t } = useTranslation();
  const { sx = {}, noPadding = false, containerFullHeight = false, containerMargin = true, customHeader } = props;

  return (
    <Box sx={{ m: containerMargin ? 1 : 0, height: containerFullHeight ? "100%" : "calc(100% - 16px)", ...sx }} className={"config-temp-container " + classes.contentContainer}>
      <Box sx={{ bgcolor: "#fff", height: 1 / 1 }} className={classes.container}>
        <Box className={classes.header} sx={{ height: 72, boxSizing: "border-box" }}>
          {customHeader}
          {!customHeader && (
            <Box className={classes.headerChild + " border-box flex-between"}>
              <Box className="flex-start">
                <div className={classes.dot}></div>
                <Typography fontSize={16}>{t(props.title)}</Typography>
              </Box>
              {props.headerChild}
            </Box>
          )}
        </Box>
        <Box sx={{ p: noPadding ? 0 : { xs: 2, md: 4 }, py: noPadding ? 0 : { xs: 1.5, md: 3 }, pb: "0 !important", height: props.fullHeight ? 1 / 1 : null }} className={classes.content}>
          {props.children}
        </Box>
      </Box>
    </Box>
  );
}
