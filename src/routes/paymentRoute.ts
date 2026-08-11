import { Router } from "express";
import paymentController from "../controller/paymentController.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { roleMiddleware } from "../middleware/roles.middleware.js";

const router = Router();

// Customer creates payment
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["CUSTOMER"]),
  paymentController.create.bind(paymentController),
);

// Admin can see all payments
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  paymentController.getAll.bind(paymentController),
);

// Get payment by order
router.get(
  "/order/:orderId",
  authMiddleware,
  paymentController.getByOrder.bind(paymentController),
);

// Get payment by ID
router.get(
  "/:id",
  authMiddleware,
  paymentController.getById.bind(paymentController),
);

// Admin updates payment status
router.patch(
  "/:id/status",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  paymentController.updateStatus.bind(paymentController),
);

// Admin deletes payment
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  paymentController.delete.bind(paymentController),
);

export default router;