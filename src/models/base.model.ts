import { SxProps } from "@mui/material";
import { KeyboardEvent } from "react";

export type Id = string | number;

export interface BaseObject {
  [propName: string]: any;
}

export interface BaseData<T extends Id = string> extends BaseObject {
  _id?: T;
  [key: string]: any;
}

export interface MatFormItemProps<T = string, E = any> {
  value: T;
  name?: string;
  label?: string;
  // options: MatSelectOption[];
  required?: boolean;
  onBlur?: (e: any) => void;
  onChange?: (e: E) => void;
  onKeyPress?: (e: KeyboardEvent) => void;
  error?: boolean;
  helperText?: string;
  placeholder?: string;
  width?: number;
  disabled?: boolean;
  sx?: SxProps;
  autofill?: IntBool;
  [propsName: string]: any;
}

export enum IntBool {
  TRUE = 1,
  FALSE = 0,
}

export class LoginForm {
  constructor(public username: string = "", public password: string = "") {}
}
