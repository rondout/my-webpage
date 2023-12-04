import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SxProps,
  Typography,
} from "@mui/material";
import { memo, ReactNode } from "react";
import { MatFormItemProps } from "../../../models/base.model";
import { isNull } from "@/src/tools";

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 280,
      // width: 250,
    },
  },
};

export interface MatSelectOption<
  T = string | number | readonly string[] | any
> {
  value: T;
  label: string;
}

export class MatSelectOptionFactory<
  T = string | number | readonly string[] | any
> implements MatSelectOption<T>
{
  constructor(public value: MatSelectOption["value"], public label: string) {}
}

export interface MatSelectProps<T = string | number | readonly string[] | any>
  extends MatFormItemProps<MatSelectOption["value"]> {
  options: MatSelectOption<T>[];
  size?: "small" | "medium";
  customRender?(data?: T): ReactNode;
  sx?: SxProps;
  loading?: boolean;
}

const initNoneValue = "@@INIT44949449*4949*";

export default memo(function MatSelect(props: MatSelectProps) {
  // 初始化默认值  根据是否传入placeholder来判断
  const defaultValue = props.placeholder ? initNoneValue : "";

  const value = isNull(props.value) ? defaultValue : props.value;
  const optionHeight = props.size === "medium" ? 48 : 40;

  return (
    <FormControl
      size={props.size || "small"}
      fullWidth
      sx={{ maxWidth: props.width || 1 / 1, ...(props.sx || {}) }}
    >
      <InputLabel>{props.label}</InputLabel>
      <Select
        onChange={props.onChange}
        disabled={props.disabled}
        onBlur={props.onBlur}
        name={props.name}
        variant="outlined"
        error={props.error}
        MenuProps={MenuProps}
        labelId="demo-simple-select-label"
        value={value}
        label={props.label ? props.label : undefined}
      >
        {props.loading && (
          <Typography sx={{ px: 2, py: 1 }}>loading...</Typography>
        )}
        {props.placeholder && (
          <MenuItem sx={{ display: "none" }} disabled value={initNoneValue}>
            <Typography>{props.placeholder}</Typography>
          </MenuItem>
        )}
        {!(props.options?.length > 0) && props.loading !== true && (
          <Box sx={{ px: 2, py: 1 }}>暂无数据</Box>
        )}
        {props.options?.map((option, index) => (
          <MenuItem
            key={index}
            sx={{ height: optionHeight }}
            value={option.value}
          >
            {props.customRender && props.customRender(option.value)}
            {!props.customRender && option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});
