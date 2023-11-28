import { Box, LinearProgress, SxProps, Typography } from "@mui/material";
import { selectGreyColor } from "../../../utils/selectors";

export interface MatProgressProps {
  progress: number;
  color?: "primary" | "success" | "warning";
  height?: number;
  label?: string;
  sx?: SxProps;
}

export default function MatProgress(props: MatProgressProps) {
  const value = (props.progress || 0).toFixed(2);
  const { height = 8, color = "primary", label, sx = {} } = props;

  const defaultLabel = value + "%";

  return (
    <Box sx={sx} className="flex-start">
      <Box sx={{ flex: 1 }}>
        <LinearProgress color={color} sx={{ height, borderRadius: "5px", mr: 1 }} variant="determinate" value={props.progress} />
      </Box>
      <Typography color={selectGreyColor}>{label || defaultLabel}</Typography>
    </Box>
  );
}
