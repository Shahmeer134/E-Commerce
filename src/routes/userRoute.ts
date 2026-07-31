import { Router } from "express";
import { authController } from "../controller/authController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

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

    this.router.post("/login", this.controller.login.bind(this.controller));

    this.router.get(
      "/me",
      authMiddleware,
      roleMiddleware(["ADMIN", "CUSTOMER"]),
      this.controller.me.bind(this.controller),
    );

    this.router.get(
      "/admin",
      authMiddleware,
      roleMiddleware(["ADMIN"]),
      this.controller.admin.bind(this.controller),
    );

    // this.router.post(
    //   "/orders",
    //   authMiddleware,
    //   roleMiddleware(["CUSTOMER"]),
    //   orderController.create,
    // );

    this.router.get(
      "/user",
      authMiddleware,
      roleMiddleware(["CUSTOMER"]),
      this.controller.user.bind(this.controller),
    );
  }

  public getRoute(): Router {
    return this.router;
  }

  public getRouterGroup(): string {
    return "/auth";
  }
}
