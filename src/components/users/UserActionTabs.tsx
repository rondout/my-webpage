"use client";
import {
  BaseUserInfo,
  UserProfileColumns,
  userProfileColumnTabs,
} from "@/src/models/user.model";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import UserActions from "./UserActions";
import UserArticles from "./UserArticles";

interface UserActionTabsProps {
  userInfo: BaseUserInfo;
}

export default function UserActionTabs(props: UserActionTabsProps) {
  const [currentTab, setCurrentTab] = useState(UserProfileColumns.ACTIONS);
  console.log(222);

  const handleTabChange = useCallback((_: any, value: UserProfileColumns) => {
    setCurrentTab(value);
  }, []);

  return (
    <Box>
      <Tabs value={currentTab} onChange={handleTabChange}>
        {userProfileColumnTabs.map((tab) => (
          <Tab key={tab.value} label={tab.label}></Tab>
        ))}
      </Tabs>
      <Divider></Divider>
      {currentTab === UserProfileColumns.ACTIONS && (
        <UserActions userInfo={props.userInfo} />
      )}
      {currentTab === UserProfileColumns.ARTICLES && (
        <UserArticles userInfo={props.userInfo} />
      )}
    </Box>
  );
}
