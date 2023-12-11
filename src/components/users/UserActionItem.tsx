"use client";
import {
  UserActionInfo,
  userActionLabelMap,
} from "@/src/models/userAction.model";
import { timeFormat } from "@/src/tools";
import { Avatar, Box, Typography } from "@mui/material";

interface UserActionItemProps {
  detail: UserActionInfo;
}

export default function UserActionItem(props: UserActionItemProps) {
  const { detail } = props;

  const avatarLabel = (() => {
    try {
      return props.detail.user_id.username[0].toUpperCase();
    } catch (error) {
      return "";
    }
  })();

  return (
    <Box
      sx={{ p: 2, mb: 2, bgcolor: (t) => t.palette.background.default }}
      className="flex-start items-start"
    >
      <Avatar sx={{ mr: 3, height: 32, width: 32 }}>{avatarLabel}</Avatar>
      <Box>
        <Typography>{userActionLabelMap.get(detail?.action)}</Typography>
        <Typography variant="body2">{timeFormat(detail.createdAt)}</Typography>
      </Box>
    </Box>
  );
}
