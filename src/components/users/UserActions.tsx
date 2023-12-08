"use client";
import mainController from "@/src/controllers/main.controller";
import { PageLink, TableDataResponse } from "@/src/models/response.model";
import { BaseUserInfo } from "@/src/models/user.model";
import { UserActionInfo } from "@/src/models/userAction.model";
import { Box, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";

interface Props {
  userInfo: BaseUserInfo;
}

const pageSize = 10;

export default function UserActions(props: Props) {
  const [pageLink, setPageLink] = useState(new PageLink(1, pageSize));
  const [data, setData] = useState<TableDataResponse<UserActionInfo>>();

  const getUserActions = useCallback(async () => {
    const response = await mainController.getUserActions(pageLink);
    setData(response);
  }, [pageLink]);

  useEffect(() => {
    getUserActions();
  }, [getUserActions]);

  return (
    <Box>
      {data?.records?.map?.((item) => (
        <Typography key={item._id}>{item.action}</Typography>
      ))}
    </Box>
  );
}
