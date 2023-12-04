import { MatSelectOptionFactory } from "../components/common/material/MatSelect";
import { labelMapToSelectOptions } from "../tools";
import { BaseData } from "./base.model";
// import MaleIcon from "@mui/icons-material";
// import FemaleIcon from "@mui/icons-material/Female";

// 权限枚举
export enum Authority {
  // 管理员
  ADMIN = "ADMIN",
  // 用户
  USER = "USER",
}

export enum UserGender {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export const userGenderLabelMap = new Map([
  [UserGender.MALE, { color: "blue", label: "男", icon: "male" }],
  [UserGender.FEMALE, { color: "red", label: "女", icon: "female" }],
]);

export interface BaseUserInfo extends BaseData {
  username?: string;
  password?: string;
  age?: number;
  gender?: UserGender;
  authority?: Authority;
}

// 用户个人专栏
export enum UserProfileColumns {
  ACTIONS,
  ARTICLES,
}

export const UserProfileColumnLabelMap = new Map([
  [UserProfileColumns.ACTIONS, "动态"],
  [UserProfileColumns.ARTICLES, "文章"],
]);

export const userProfileColumnTabs = labelMapToSelectOptions(
  UserProfileColumnLabelMap
);
