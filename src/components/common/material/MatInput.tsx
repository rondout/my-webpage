import {
  FormControl,
  InputBaseProps,
  StandardTextFieldProps,
  SxProps,
  TextField,
} from "@mui/material";
import { ChangeEvent, useCallback } from "react";
import { KeyboardEvent, memo } from "react";
import { isNull } from "@/src/tools";
import { IntBool, MatFormItemProps } from "@/src/models/base.model";

interface MatInputProps
  extends MatFormItemProps<string | number, ChangeEvent<HTMLInputElement>> {
  multiline?: boolean;
  maxRows?: number;
  minRows?: number;
  inputProps?: InputBaseProps["inputProps"];
  sx?: SxProps;
  fullWidth?: boolean;
}

export default memo(function MatInput(props: MatInputProps) {
  const {
    width,
    size = "small",
    fullWidth = true,
    onKeyPress,
    sx = {},
    autofill = IntBool.TRUE,
  } = props;
  const value = isNull(props.value) ? "" : props.value;

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (onKeyPress) {
        onKeyPress(e);
      }
    },
    [onKeyPress]
  );

  return (
    <FormControl
      error={props.error}
      sx={{ maxWidth: width || 1 / 1, ...sx }}
      fullWidth={fullWidth}
    >
      {!autofill && (
        <TextField
          {...props}
          size={size}
          label={props.label}
          value={value}
          onKeyPress={(e) => handleKeyPress(e)}
          className="unused-input-password"
        ></TextField>
      )}
      <TextField
        {...props}
        size={size}
        label={props.label}
        value={value}
        onKeyPress={(e) => handleKeyPress(e)}
      ></TextField>
    </FormControl>
  );
});
