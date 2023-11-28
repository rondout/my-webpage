import { alpha, Box, FormControl, FormControlLabel, Slider, styled, Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { t } from "i18next";
import { memo, ReactNode } from "react";
import { MatFormItemProps } from "../../../models/base.model";

export interface MatSliderProps {
  inputProps: MatFormItemProps<number>;
  customLabel?: ReactNode | string;
  valueLabelDisplay?: "on" | "auto" | "off";
  max?: number;
  min?: number;
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  "	.MuiFormControlLabel-label": {
    whiteSpace: "nowrap",
    display: "inline-block",
    marginRight: 16,
  },
}));

const useStyles = makeStyles((theme: Theme) => {
  return {
    valueContainer: {
      minWidth: 45,
      fontSize: 14,
      marginLeft: 8,
      height: 32,
      borderRadius: 16,
      backgroundColor: alpha(theme.palette.primary.main, 0.08),
      color: theme.palette.primary.main,
    },
  };
});

export default memo(function MatSlider(props: MatSliderProps) {
  const classes = useStyles();
  const { valueLabelDisplay = "auto", inputProps, max = 100, min = 0 } = props;
  return (
    <FormControl fullWidth sx={{ flexDirection: "row", maxWidth: inputProps.width || 1 / 1, height: 1 / 1, alignItems: "center", pl: 0 }}>
      {/* <Slider size="small" defaultValue={70} valueLabelDisplay="auto" /> */}
      <StyledFormControlLabel
        sx={{ whiteSpace: "nowrap", mr: 1, flex: 1, ml: 0 }}
        labelPlacement="start"
        label={t(inputProps.label) as string}
        control={<Slider size="small" {...inputProps} valueLabelDisplay={valueLabelDisplay} max={max} min={min} />}
      ></StyledFormControlLabel>
      <Box className={classes.valueContainer + " flex"}>{props.customLabel || inputProps.value + "%"}</Box>
    </FormControl>
  );
});
