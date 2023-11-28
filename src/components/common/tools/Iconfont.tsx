import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { CSSProperties, MouseEvent } from "react";

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

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    color: theme.palette.primary.main,
  },
  greyIcon: {
    color: theme.palette.action.active,
  },
}));

export default function Iconfont(props: IconfontProps) {
  const classes = useStyles();
  const onClick = props.onClick || (() => {});
  const { icon, fontSize = 24, mr = 1, color, my = 0, style = {}, primary } = props;

  const className = primary ? classes.icon : classes.greyIcon;

  const computedClassName = props.className ? className + " " + props.className + " vantron icon-" + icon : className + " vantron icon-" + icon;
  return (
    <i
      onClick={onClick}
      className={computedClassName}
      style={{ fontSize, marginRight: mr * 8, marginTop: my * 8, marginBottom: my * 8, color, cursor: props.pointer ? "pointer" : null, height: fontSize, lineHeight: 1, ...style }}
    ></i>
  );
}
