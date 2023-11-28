import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import { memo, PropsWithChildren, useState } from "react";
import { IntBool, MatFormItemProps } from "@/src/models/base.model";

export default memo(function MatPassword(
  props: PropsWithChildren<MatFormItemProps>
) {
  const [showPassword, setShowPwd] = useState<boolean>(false);
  const {
    onChange = () => {},
    onBlur = () => {},
    onKeyPress = () => {},
    value = "",
    sx = {},
    autofill = IntBool.TRUE,
  } = props;

  const handleClickShowPassword = () => {
    setShowPwd(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl
      size={props.size || "small"}
      sx={{ maxWidth: props.width || 1 / 1, ...sx }}
      fullWidth
    >
      <p>{props.error}</p>
      <InputLabel error={props.error}>{props.label}</InputLabel>
      {!autofill && (
        <input
          type="password"
          className="unused-input-password"
          name=""
          id=""
        />
      )}
      <OutlinedInput
        disabled={props.disabled}
        value={value}
        error={props.error}
        name={props.name}
        onChange={onChange}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.label}
      />
      {props.helperText && (
        <FormHelperText error={props.error}>
          <span>{props.helperText}</span>
        </FormHelperText>
      )}
    </FormControl>
  );
});
