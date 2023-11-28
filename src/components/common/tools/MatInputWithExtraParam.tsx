import { alpha, Box, FormControl, InputAdornment, SxProps, TextField, Theme, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { MatFormItemProps } from "../../../models/base.model";
import { isNull } from "../../../utils";

interface MatInputWithExtraParamProps {
  inputProps: MatFormItemProps<string>;
  startText?: string;
  endText?: string;
  sx?: SxProps;
  fullWidth?: boolean;
}

const useStyle = makeStyles((theme: Theme) => {
  return {
    start: {
      padding: "8px 8px",
      marginLeft: "-14px",
      borderRadius: "4px 0 0 4px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      borderRight: "1px solid",
      borderRightColor: theme.palette.divider,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      userSelect: "none",
    },
    end: {
      borderRight: "none",
      borderRadius: "0 4px 4px 0",
      right: 0,
      marginRight: -22,
      marginLeft: 0,
    },
  };
});

export default memo(function MatInputWithExtraParam(props: MatInputWithExtraParamProps) {
  const classes = useStyle();
  const { startText, endText, inputProps } = props;
  const { width, placeholder = "", size = "small", fullWidth = true } = inputProps;
  const { t } = useTranslation();
  const value = isNull(inputProps.value) ? "" : inputProps.value;

  return (
    <FormControl error={inputProps.error} sx={{ maxWidth: width || 1 / 1 }} fullWidth={fullWidth}>
      <TextField
        InputProps={{
          startAdornment: startText && (
            <InputAdornment position="start">
              <Box className={classes.start}>
                <Typography sx={{ lineHeight: "unset" }} variant="subtitle1">
                  {startText}
                </Typography>
              </Box>
            </InputAdornment>
          ),
          endAdornment: endText && (
            <InputAdornment position="start">
              <Box className={classes.start + " " + classes.end}>
                <Typography sx={{ lineHeight: "unset" }} variant="subtitle1">
                  {endText}
                </Typography>
              </Box>
            </InputAdornment>
          ),
          placeholder: t(placeholder),
        }}
        {...inputProps}
        size={size}
        label={inputProps.label && t(inputProps.label)}
        value={value}
      ></TextField>
    </FormControl>
  );
});
