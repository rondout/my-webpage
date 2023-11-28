import { alpha, Icon, InputBaseProps, styled, TextField, SxProps } from "@mui/material";
import { t } from "i18next";
import debounce from "debounce";
import { ChangeEvent, Fragment, memo, useMemo, useState } from "react";
import Iconfont from "../tools/Iconfont";

const SytledInput = styled(TextField)(({ theme }) => {
  return {
    "& .MuiOutlinedInput-root": {
      paddingRight: 4,
      width: "100%",
    },
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
    "&:hover fieldset": {
      borderColor: theme.palette.primary.main + " !important",
    },
  };
});

interface MatSearchInputProps {
  value: string;
  onChange(text: string): void;
  placeholder?: string;
  width?: number;
  fullWidth?: boolean;
  inputProps?: InputBaseProps["inputProps"];
  sx?: SxProps;
}

export default memo(function MatSearchInput(props: MatSearchInputProps) {
  const [value, setValue] = useState(props.value || "");
  const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    emitChangeByProps(event);
  };

  const { onChange, width = 250, sx = {} } = props;

  // 这里用debounce做防抖  做性能优化
  const emitChangeByProps = useMemo(() => {
    return debounce(function (event: ChangeEvent<HTMLInputElement>) {
      onChange && onChange(event.target.value);
    }, 300);
  }, [onChange]);

  const clearContent = () => {
    setValue("");
    props.onChange("");
  };

  return (
    <Fragment>
      <SytledInput
        {...props}
        sx={{ ...sx, width: props.fullWidth ? "100%" : width }}
        InputProps={{
          startAdornment: <Icon sx={{ mr: 1, color: (theme) => theme.palette.action.active }}>search</Icon>,
          endAdornment: !!value && <Iconfont onClick={clearContent} icon="ic_chip_close" mr={0.5} fontSize={16} style={{ cursor: "pointer" }}></Iconfont>,
        }}
        placeholder={props.placeholder ? t(props.placeholder) : "Search..."}
        color="primary"
        size="small"
        value={value}
        onChange={onValueChange}
      ></SytledInput>
      <input type="text" className="not-to-show" />
    </Fragment>
  );
});
