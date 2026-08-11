import { Router } from "express";
import shippingController from "../controller/shippingController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();

// Admin creates shipping
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  shippingController.create.bind(shippingController),
);

// Admin can see all shipping records
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  shippingController.getAll.bind(shippingController),
);

// Get shipping for an order
router.get(
  "/order/:orderId",
  authMiddleware,
  shippingController.getByOrder.bind(shippingController),
);

// Get shipping by ID
router.get(
  "/:id",
  authMiddleware,
  shippingController.getById.bind(shippingController),
);

// Admin updates shipping
router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  shippingController.update.bind(shippingController),
);

// Admin updates shipping status
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  shippingController.updateStatus.bind(shippingController),
);

// Admin deletes shipping
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  shippingController.delete.bind(shippingController),
);

export default router;