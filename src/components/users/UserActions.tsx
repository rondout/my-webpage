"use client";
import mainController from "@/src/controllers/main.controller";
import { PageLink, TableDataResponse } from "@/src/models/response.model";
import { BaseUserInfo } from "@/src/models/user.model";
import { UserActionInfo } from "@/src/models/userAction.model";
import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import UserActionItem from "./UserActionItem";
import MatSkeleton from "../common/material/MatSkeleton";
import EmptyData from "../common/table/EmptyData";

interface Props {
  userInfo: BaseUserInfo;
}

const pageSize = 10;

export default function UserActions(props: Props) {
  const [pageLink, setPageLink] = useState(new PageLink(1, pageSize));
  const [data, setData] = useState<TableDataResponse<UserActionInfo>>();
  const [initialLoading, setInitialLoading] = useState(true);

  const getUserActions = useCallback(async () => {
    const response = await mainController.getUserActions(pageLink);
    setInitialLoading(false);
    setData(response);
  }, [pageLink]);

  useEffect(() => {
    getUserActions();
  }, [getUserActions]);

  return (
    <Box sx={{ bgcolor: (t) => t.custom.greyBg }}>
      <MatSkeleton loading={initialLoading}>
        {data?.records?.map?.((item) => (
          <UserActionItem key={item._id} detail={item}></UserActionItem>
        ))}
        {!data?.records.length && <EmptyData></EmptyData>}
      </MatSkeleton>
    </Box>
  );
}
