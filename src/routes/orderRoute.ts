import { Router } from "express";
import orderController from "../controller/orderController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";
import { ROLES } from "../constant/enums.js";

const router = Router();

router.post(
  "/",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  orderController.create.bind(orderController),
);

router.get(
  "/my-orders",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  orderController.getMyOrders.bind(orderController),
);

router.get(
  "/:id",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  orderController.getById.bind(orderController),
);

router.patch(
  "/:id/cancel",
  authMiddleware,
  roleMiddleware([ROLES.CUSTOMER]),
  orderController.cancel.bind(orderController),
);

export default router;