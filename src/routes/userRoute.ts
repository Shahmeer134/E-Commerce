import { Router } from "express";
import { authController } from "../controller/authController.js";


export default class AuthRoutes {
  public readonly router: Router;
  private readonly controller = new authController();

  constructor() {
    this.router = Router();
    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.post(
      "/register",
      this.controller.register.bind(this.controller),
    );

    this.router.post(
      "/login",
      this.controller.login.bind(this.controller)
    )
  }

  public getRoute(): Router{
    return this.router;
  }

  public getRouterGroup():string{
    return "/auth"
  }
}
