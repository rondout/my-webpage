import { BaseData } from "./base.model";
import { BaseUserInfo } from "./user.model";

// 用户动态枚举
export enum UserActions {
  PUBLIC_ARTICLE = "PUBLIC_ARTICLE",
  REGISTER = "REGISTER",
}
// 用户action 数据结构
export interface UserActionInfo extends BaseData {
  action?: UserActions;
  user_id?: BaseUserInfo;
}
