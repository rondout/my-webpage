import { LoginForm } from "../models/base.model";
import { BaseUserInfo } from "../models/user.model";
import HttpController from "./http.controller";

class MainController extends HttpController {
  public login(data: LoginForm) {
    return super.post<{ token: string }>("/api/auth/login", data);
  }
  public getUserInfo() {
    return super.get<BaseUserInfo>("/api/auth/current");
  }
}

const mainController = new MainController();

export default mainController;
