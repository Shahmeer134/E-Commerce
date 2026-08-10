import { Router } from "express";
import wishlistController from "../controller/wishlistController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constant/enums.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  wishlistController.add.bind(wishlistController),
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  wishlistController.getAll.bind(wishlistController),
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  wishlistController.getById.bind(wishlistController),
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  wishlistController.remove.bind(wishlistController),
);

router.delete(
  "/product/:productId",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  wishlistController.removeByProduct.bind(wishlistController),
);

export default router;  