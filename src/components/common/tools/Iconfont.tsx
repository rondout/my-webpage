"use client";
import { useTheme } from "@mui/material";
import { CSSProperties, MouseEvent, useMemo } from "react";

interface IconfontProps {
  icon: string;
  fontSize?: number;
  color?: string;
  mr?: number;
  my?: number;
  onClick?(ev: MouseEvent): any;
  pointer?: boolean;
  style?: CSSProperties;
  primary?: boolean;
  className?: string;
}

// const useStyles = makeStyles((theme: Theme) => ({
//   icon: {
//     color: theme.palette.primary.main,
//   },
//   greyIcon: {
//     color: theme.palette.action.active,
//   },
// }));

export default function Iconfont(props: IconfontProps) {
  const onClick = props.onClick || (() => {});
  const {
    icon,
    fontSize = 24,
    mr = 1,
    color,
    my = 0,
    style = {},
    primary,
  } = props;

  const computedClassName = props.className
    ? " " + props.className + " iconfont icon-" + icon
    : " iconfont icon-" + icon;
  const theme = useTheme();

  const computedColor = useMemo(() => {
    if (color) {
      return color;
    }
    if (primary) {
      return theme.palette.primary.main;
    }
    return theme.palette.action.active;
  }, [theme]);

  return (
    <i
      onClick={onClick}
      className={computedClassName}
      style={{
        fontSize,
        marginRight: mr * 8,
        marginTop: my * 8,
        marginBottom: my * 8,
        color: computedColor,
        cursor: props.pointer ? "pointer" : null,
        height: fontSize,
        lineHeight: 1,
        ...style,
      }}
    ></i>
  );
}
