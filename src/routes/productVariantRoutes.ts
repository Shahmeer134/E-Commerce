import { Router } from "express";
import productVariantController from "../controller/productVariantController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productVariantController.create.bind(productVariantController),
);

router.get(
  "/product/:productId",
  productVariantController.getByproduct.bind(productVariantController),
);

router.get(
  "/:id",
  productVariantController.getById.bind(productVariantController),
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productVariantController.update.bind(productVariantController),
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  productVariantController.delete.bind(productVariantController),
);

// export default router;
export default router;
