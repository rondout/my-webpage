import { BaseData } from "./base.model";

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

export interface BaseUserInfo extends BaseData {
  username?: string;
  password?: string;
  age?: number;
  gender?: UserGender;
  authority?: Authority;
}
