import { Router } from "express";
import orderTrackingController from "../controller/orderTrackingController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();

// Admin creates tracking update
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  orderTrackingController.create.bind(orderTrackingController),
);

// Admin sees all tracking records
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  orderTrackingController.getAll.bind(orderTrackingController),
);

// Customer/Admin can see tracking history for an order
router.get(
  "/order/:orderId",
  authMiddleware,
  orderTrackingController.getByOrder.bind(orderTrackingController),
);

// Get tracking record by ID
router.get(
  "/:id",
  authMiddleware,
  orderTrackingController.getById.bind(orderTrackingController),
);

// Admin updates tracking record
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  orderTrackingController.update.bind(orderTrackingController),
);

// Admin deletes tracking record
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  orderTrackingController.delete.bind(orderTrackingController),
);

export default router;