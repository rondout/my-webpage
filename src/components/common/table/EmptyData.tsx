"use client";
import { Box, Typography } from "@mui/material";
import Iconfont from "../tools/Iconfont";

type EmptydataType = "actions";

interface EmptyDataProps {
  emptyTitle?: string;
  type?: EmptydataType;
  height?: number;
  pt?: number;
}

const typeToImgMap = new Map<EmptydataType, string>([["actions", "empty"]]);

export default function EmptyData(props: EmptyDataProps) {
  const { height, type = "actions", emptyTitle = "暂无数据", pt = 6 } = props;

  return (
    <Box
      sx={{ height, flexDirection: "column", justifyContent: "flex-start", pt }}
      className="flex border-box"
    >
      {type && (
        <Iconfont icon={typeToImgMap.get(type)} fontSize={48}></Iconfont>
        // <img src={} width={240} height={240} alt="" />
      )}
      <Typography sx={{ my: 4 }} variant="subtitle1">
        {emptyTitle}
      </Typography>
    </Box>
  );
}
