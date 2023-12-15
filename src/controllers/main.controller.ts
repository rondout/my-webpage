import { LoginForm } from "../models/base.model";
import { PageLinkInterface, TableDataResponse } from "../models/response.model";
import { BaseUserInfo } from "../models/user.model";
import { UserActionInfo } from "../models/userAction.model";
import { HttpController } from "./http.controller";

class MainController extends HttpController {
  public login(data: LoginForm) {
    return super.post<{ token: string }>("/api/auth/login", data);
  }
  public logout() {
    return super.get<boolean>("/api/auth/logout");
  }
  public getUserInfo(token?: string) {
    return super.get<BaseUserInfo>("/api/auth/current", null, { token });
  }
  public getUserActions(pageLink: PageLinkInterface, token?: string) {
    return super.get<TableDataResponse<UserActionInfo>>(
      "/api/user-actions/page",
      pageLink,
      { token }
    );
  }
}

const mainController = new MainController();

export default mainController;
