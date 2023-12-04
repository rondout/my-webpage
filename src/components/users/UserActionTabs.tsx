"use client";
import {
  UserProfileColumns,
  userProfileColumnTabs,
} from "@/src/models/user.model";
import { TabPanel } from "@mui/lab";
import { Box, Divider, Tab, Tabs } from "@mui/material";
import { useCallback, useState } from "react";
import UserActions from "./UserActions";
import UserArticles from "./UserArticles";

export default function UserActionTabs() {
  const [currentTab, setCurrentTab] = useState(UserProfileColumns.ACTIONS);

  const handleTabChange = useCallback((_, value: UserProfileColumns) => {
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
      {currentTab === UserProfileColumns.ACTIONS && <UserActions />}
      {currentTab === UserProfileColumns.ARTICLES && <UserArticles />}
    </Box>
  );
}
