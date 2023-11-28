import { Box, Typography } from "@mui/material";
import no_template from "../../../assets/imgs/no_data_bg/no_template.svg";
import no_geofence from "../../../assets/imgs/no_data_bg/no_geofence.svg";
import no_device from "../../../assets/imgs/no_data_bg/no_device.svg";
import no_application from "../../../assets/imgs/no_data_bg/no_application.svg";
import no_file from "../../../assets/imgs/no_data_bg/no_file.svg";
import { useTranslation } from "react-i18next";

type EmptydataType = "device" | "template" | "application" | "file" | "geofence";

interface EmptyDataProps {
  emptyTitle?: string;
  type?: EmptydataType;
  height?: number;
  pt?: number;
}

const typeToImgMap = new Map<EmptydataType, string>([
  ["device", no_device],
  ["template", no_template],
  ["geofence", no_geofence],
  ["application", no_application],
  ["file", no_file],
]);

export default function EmptyData(props: EmptyDataProps) {
  const { height, type, emptyTitle = "common.noDataFound", pt = 10 } = props;

  const { t } = useTranslation();
  return (
    <Box sx={{ height, flexDirection: "column", justifyContent: "flex-start", pt }} className="flex border-box">
      {type && <img src={typeToImgMap.get(type)} width={240} height={240} alt="" />}
      <Typography sx={{ mt: 6, mb: 6 }} variant="subtitle1">
        {t(emptyTitle)}
      </Typography>
    </Box>
  );
}
