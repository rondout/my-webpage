import { Box, SxProps, alpha, Typography } from "@mui/material";
import { CSSProperties } from "react";

interface CustomChipProps {
  color: string;
  label: string;
  sx?: SxProps;
  innerStyle?: CSSProperties;
  size?: "small" | "medium";
}

export default function CustomChip(props: CustomChipProps) {
  const { size = "medium" } = props;
  return (
    <Box
      sx={{
        userSelect: "none",
        borderRadius: 1.5,
        height: size === "small" ? 24 : 32,
        fontSize: 14,
        display: "inline-flex",
        alignItems: "center",
        lineHeight: size === "small" ? "24px" : "32px",
        whiteSpace: "nowrap",
        px: size === "small" ? 1 : 1.5,
        bgcolor: alpha(props.color, 0.1),
        ...props.sx,
      }}
    >
      <span className="custom-chip-inner" style={{ whiteSpace: "nowrap", color: props.color }}>
        <Typography className="line-clamp" style={props.innerStyle}>{props.label}</Typography>
      </span>
    </Box>
  );
}
