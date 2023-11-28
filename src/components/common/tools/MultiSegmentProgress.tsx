import { Box, SxProps, Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";

export interface MultiSegmentProgressItems {
  color: string;
  ratio: number;
  title?: string;
  value?: string | number;
  sx?: SxProps;
}

interface MultiSegmentProgressProps {
  sx?: SxProps;
  items: MultiSegmentProgressItems[];
}

export default function MultiSegmentProgress(props: MultiSegmentProgressProps) {
  const { sx = {}, items = [] } = props;
  const { t } = useTranslation();

  return (
    <Box sx={{ height: 12, borderRadius: 3, width: 1, bgcolor: (theme) => theme.palette.grey[200], overflow: "hidden", ...sx }} className="flex-start">
      {items.map((item, index) => (
        <Tooltip key={index} title={item.title && t(item.title) + ": " + item.value}>
          <Box key={index} sx={{ height: 1, width: item.ratio, bgcolor: item.color, ...(item.sx || {}) }}></Box>
        </Tooltip>
      ))}
    </Box>
  );
}
