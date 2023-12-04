import ThemeChanger from "@/src/components/themeRegistry/ThemeChanger";
import mainController from "@/src/controllers/main.controller";
import {
  STORAGE_THEME_COLOR_KEY,
  STORAGE_TOKEN_KEY,
} from "@/src/models/config.model";
import { UserGender, userGenderLabelMap } from "@/src/models/user.model";
import { handleResponseError } from "@/src/tools";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@mui/material";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Iconfont from "@/src/components/common/tools/Iconfont";
import UserActionTabs from "@/src/components/users/UserActionTabs";

export const metaData: Metadata = {
  title: "Profile",
  description: "User profile center",
};

async function getData(token: string) {
  try {
    const userInfo = await mainController.getUserInfo(token);
    return userInfo;
  } catch (error) {
    handleResponseError(error);
  }
}

export default async function Profile(props: any) {
  const cookieStore = cookies();
  const token = cookieStore.get(STORAGE_TOKEN_KEY)?.value;
  const userInfo = await getData(token);
  const color = cookieStore.get(STORAGE_THEME_COLOR_KEY)?.value;

  console.log({ color });

  const genderInfo = userGenderLabelMap.get(userInfo?.gender);

  const avatarLabel = (() => {
    try {
      return userInfo.username[0].toUpperCase();
    } catch (error) {
      return "";
    }
  })();

  return (
    <Box className="content-item" sx={{ mt: 4 }}>
      {userInfo && (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 4, bgcolor: "#fff" }}>
              <Box className="flex-start items-start">
                <Avatar sx={{ mr: 3, height: 64, width: 64 }}>
                  {avatarLabel}
                </Avatar>
                <Box>
                  <Typography
                    variant="h4"
                    color={"primary.main"}
                    fontWeight={"bold"}
                  >
                    {userInfo.username}
                  </Typography>
                  <Typography>{userInfo.age}</Typography>
                  <Tooltip placement="top" title={genderInfo.label}>
                    <span>
                      <Iconfont
                        primary
                        // color={genderInfo.color}
                        icon={genderInfo.icon}
                      ></Iconfont>
                    </span>
                  </Tooltip>
                  <Typography>{userInfo.authority}</Typography>
                  <ThemeChanger defaultColor={color} />
                </Box>
              </Box>
            </Card>
            <Card sx={{ mt: 2 }}>
              <UserActionTabs></UserActionTabs>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box className="flex">
                  <Box sx={{ flex: 1 }}>
                    <Typography textAlign="center">关注了</Typography>
                    <Typography textAlign="center">10</Typography>
                  </Box>
                  <Divider orientation="vertical" flexItem></Divider>
                  <Box sx={{ flex: 1 }}>
                    <Typography textAlign="center">关注者</Typography>
                    <Typography textAlign="center">100</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
