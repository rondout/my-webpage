import { BaseTimeData } from "./base.model";
import { BaseUserInfo } from "./user.model";

// 用户动态枚举
export enum UserActions {
  PUBLIC_ARTICLE = "PUBLIC_ARTICLE",
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOG_OUT = "LOG_OUT",
}
// 用户action 数据结构
export interface UserActionInfo extends BaseTimeData {
  action?: UserActions;
  user_id?: BaseUserInfo;
}

export const userActionLabelMap = new Map([
  [UserActions.PUBLIC_ARTICLE, "发布文章"],
  [UserActions.LOGIN, "登录"],
  [UserActions.LOG_OUT, "退出登录"],
  [UserActions.REGISTER, "注册"],
  [null, "-"],
]);
