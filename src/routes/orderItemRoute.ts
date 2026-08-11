import { Router } from "express";
import orderItemController from "../controller/orderItemController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();

// Create order item
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  orderItemController.create.bind(orderItemController),
);

// Get all order items
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  orderItemController.getAll.bind(orderItemController),
);

// Get items of specific order
router.get(
  "/order/:orderId",
  authMiddleware,
  orderItemController.getByOrder.bind(orderItemController),
);

// Get order item by ID
router.get(
  "/:id",
  authMiddleware,
  orderItemController.getById.bind(orderItemController),
);

// Update order item
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  orderItemController.update.bind(orderItemController),
);

// Delete order item
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  orderItemController.delete.bind(orderItemController),
);

export default router;