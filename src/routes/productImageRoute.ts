import { Router } from "express";
import productImageController from "../controller/productImageController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productImageController.create.bind(productImageController),
);

router.get(
  "/product/:productId",
  productImageController.getAllByProduct.bind(productImageController),
);

router.get("/:id", productImageController.getById.bind(productImageController));

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productImageController.update.bind(productImageController),
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productImageController.delete.bind(productImageController),
);

export default router;
