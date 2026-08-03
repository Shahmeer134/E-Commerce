import { Router } from "express";
import categoryController from "../controller/categoryController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

class CategoryRoutes {
  public readonly router: Router;

  constructor() {
    this.router = Router();
    this.setUpRoutes();
  }

  private setUpRoutes(): void {
    this.router.post(
      "/",
      authMiddleware,
      roleMiddleware(["ADMIN"]),
      categoryController.create.bind(categoryController),
    );

    this.router.get("/", categoryController.getAll.bind(categoryController));

    this.router.get(
      "/:id",
      categoryController.getById.bind(categoryController),
    );

    this.router.patch(
      "/:id",
      authMiddleware,
      roleMiddleware(["ADMIN"]),
      categoryController.update.bind(categoryController),
    );

    this.router.delete(
      "/:id",
      authMiddleware,
      roleMiddleware(["ADMIN"]),
      categoryController.delete.bind(categoryController),
    );
  }

  public getRoute(): Router {
    return this.router;
  }
}

export default new CategoryRoutes();
