import { Router } from "express";
import productController from "../controller/productController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productController.create.bind(productController),
);

router.get("/", productController.getAll.bind(productController));

router.get(
  "/my-products",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productController.getMyProducts.bind(productController),
);

router.get("/:id", productController.getById.bind(productController));

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productController.update.bind(productController),
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productController.delete.bind(productController),
);

export default router;
