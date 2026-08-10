import { Router } from "express";
import cartController from "../controller/cartController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constant/enums.js";

const router = Router();

router.get(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  cartController.getCart.bind(cartController),
);

router.post(
  "/items",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  cartController.addItem.bind(cartController),
);

router.patch(
  "/items/:id",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  cartController.updateItem.bind(cartController),
);

router.delete(
  "/items/:id",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  cartController.removeItem.bind(cartController),
);

router.delete(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  cartController.clearCart.bind(cartController),
);

export default router;
